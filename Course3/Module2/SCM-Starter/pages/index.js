import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import { IoIosLogOut } from "react-icons/io";
// import "./pages/global.css";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [used_gas, setUsedGas] = useState(0);
  const [total_gas, setTotalGas] = useState(0);
  // const [close,setclose] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const logout = async() => {
    setAccount(undefined);
    setBalance(0);
    setATM(undefined);
    setUsedGas(0);
    setTotalGas(0);
  };

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
      setAccount(undefined);
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      let receipt = await tx.wait();
      let used_gas = receipt.gasUsed.toNumber();
      setUsedGas(used_gas);
      setTotalGas(total_gas => total_gas + used_gas);
      console.log("Gas used in deposit:", used_gas);
      getBalance();
    }
  }; 

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      let receipt = await tx.wait();
      let used_gas = receipt.gasUsed.toNumber(); 
      setUsedGas(used_gas);
      setTotalGas(total_gas => total_gas + used_gas); 
      console.log("Gas used in withdrawal:", used_gas);
      getBalance();
    }
  };
  

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div style={styles.account_functions}>
        <div style={styles.para}>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance} ETH</p>
          {used_gas && <p>Gas Used: {used_gas}</p>}
          <div style={styles.totalgas}>
          <p>Total gas Used: {total_gas}</p>
        </div>
        </div>
        <div style={styles.items}>
          <button onClick={deposit} style={styles.btn}>Deposit 1 ETH</button>
          <button onClick={withdraw} style={styles.btn}>Withdraw 1 ETH</button>
          <button onClick={logout} style={styles.btn}>
            Logout <span style={styles.icon}><IoIosLogOut /></span>
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {getWallet();}, []);

  const styles = {
    container: {
      backgroundColor: "#19005f",
      color: "rgb(247, 215, 4)",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      margin: "auto",
      borderRadius: "10px",
      width: "65%",
      height: "80vh",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    header: {
      margin: "40px 10px",
      fontSize: "28px",
      textDecoration: "double",
    },
    init: {
      border: "2px solid black",
      borderRadius: "10px",
      margin: "7% 15%",
      height: "45vh",
      backgroundColor: "rgb(247, 215, 4)",
      color: "#19005f",
      fontWeight: "bold",
      fontSize: "20px",
      padding: "2%",
    },
    para: {
      fontSize: "20px",
    },
    items: {
      margin: "10px",
      padding: "3px",
      fontSize: "30px",
    },
    btn: {
      width: "150px",
      height: "40px",
      backgroundColor: "#120097",
      color: "rgb(252, 255, 239)",
      borderRadius: "5px",
      cursor: "pointer",
      alignItems: "center",
      textAlign: "center",
      border: "none",
      margin: "10px",
    }
  };

  return (
    <main style={styles.container}>
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      <div style={styles.init}>
        {initUser()}
      </div>
    </main>
  );
}
