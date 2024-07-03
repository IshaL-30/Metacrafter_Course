import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import { IoIosLogOut } from "react-icons/io";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(undefined);
  const [withdrawAmount, setWithdrawAmount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [totalGas, setTotalGas] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account[0]);
      getATMContract();
    }
    else {
      console.log("No account found");
      setAccount(undefined);
    }
  };

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    
    // // once wallet is set we can get a reference to our deployed contract
    // getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  };

  const getBalance = async() => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const getclearHistory = async() => {
    if (atm) {
      setTransactionHistory([]);
    }
  };
  
  const logout = async() => {
    setAccount(undefined);
    setATM(undefined);
    setDepositAmount(0);
    setWithdrawAmount(0);
    setBalance(undefined);
    setTotalGas(0);
    setTransactionHistory([]);
  };

  const deposit = async () => {
    if (atm) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      let tx = await atm.deposit(depositAmount, { gasLimit: 200000 });
      let receipt = await tx.wait();
      let used_gas = receipt.gasUsed.toNumber();
      setTotalGas(total_gas => total_gas + used_gas);
      getBalance();
      const block = await provider.getBlock(receipt.blockNumber);
      const timestamp = new Date(block.timestamp * 1000).toLocaleString();
      setTransactionHistory(prevHistory => [
        ...prevHistory,
        { transType: "Deposit", amount: depositAmount, usedGas: used_gas, timestamp }
      ]);
    }
  }; 

  const withdraw = async () => {
    if (atm) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      let tx = await atm.withdraw(withdrawAmount, { gasLimit: 200000 });
      let receipt = await tx.wait();
      let used_gas = receipt.gasUsed.toNumber(); 
      setTotalGas(total_gas => total_gas + used_gas);
      getBalance();
      const block = await provider.getBlock(receipt.blockNumber);
      const timestamp = new Date(block.timestamp * 1000).toLocaleString();
      setTransactionHistory(prevHistory => [
        ...prevHistory,
        { transType: "Withdraw", amount: withdrawAmount, usedGas: used_gas, timestamp }
      ]);
    }
  };
  
  useEffect(() => {
    getWallet();
  }, []);

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
          {/* {<p>Gas Used: {usedGas}</p>} */}
          <div style={styles.totalgas}>
            <p>Total gas Used: {totalGas}</p>
          </div>
        </div>
        <div style={styles.his}>
          <p style={styles.trans}>Transaction History:</p>
          <div style={styles.table_data}>
            <table style={styles.table}>
              <thead style={styles.thead}>
              <tr>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Gas Used</th>
                <th>Timestamp</th>
              </tr>
              </thead>
              <tbody style={styles.tbody}>
                {transactionHistory.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.transType}</td>
                    <td>{tx.amount} ETH</td>
                    <td>{tx.usedGas}</td>
                    <td>{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
        <div style={styles.items}>
              <div style={styles.btn_text}><input
                type="number"
                value={depositAmount}
                placeholder="0"
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                style={styles.input}
              />{" "}<button onClick={deposit} style={styles.bt}>Deposit</button></div>
              <div style={styles.btn_text}><input
                type="number"
                value={withdrawAmount}
                placeholder="0"
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                style={styles.input}
              /><button onClick={withdraw} style={styles.bt}>Withdraw</button>
              </div>
              <button onClick={getclearHistory} style={styles.btn}>Clear History</button>
              <button onClick={logout} style={styles.btn}>Logout <span style={styles.icon}><IoIosLogOut /></span></button>
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      backgroundColor: "#19005f",
      color: "rgb(247, 215, 4)",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      padding: "1%",
      margin: "auto",
      borderRadius: "10px",
      width: "65%",
      height: "85%",
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
    table_data: {
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      marginRight: "6%",
    },
    table: {
      width: "95%",
      alignItems: "Left",
      border: "1px solid black",
    },
    tbody: {
      fontSize: "16px",
      fontWeight: "16px",
      color : "rgb(151 0 121)",
    },
    thead: {
      color: "rgb(0 32 131)",
      fontWeight: "bold",
      fontSize: "20px",
    },
    init: {
      border: "2px solid black",
      borderRadius: "10px",
      margin: "2% 10%",
      height: "75%",
      backgroundColor: "rgb(247, 215, 4)",
      color: "#19005f",
      fontWeight: "bold",
      fontSize: "20px",
      padding: "2%",
    },
    account_functions: {
      height: "100%",
      textAlign: "left",
    },
    para: {
      fontSize: "18px",
      marginLeft: "4%",
    },
    
    items: {
      position: "float",
      margin: "0% 4%",
      padding: "3px",
      fontSize: "30px",
      textAlign: "center",
      justifyContent: "center",

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
      justifyContent:"center",
      border: "none",
      margin: "0 1%",
      fontSize: "16px",
    },
    btn_text: {
      width: "150px",
      height: "40px",
      backgroundColor: "#120097",
      color: "rgb(252, 255, 239)",
      borderRadius: "5px",
      alignItems: "center",
      textAlign: "center",
      justifyContent:"center",
      border: "none",
      margin: "1% 1%",
      fontSize: "16px",
      display: "inline-flex",
    },
    his: {
      fontSize: "20px",
      height: "50%",
      marginLeft: "4%",
      padding: "0",
    },
    bt: {
      width: "40px",
      height: "15px",
      backgroundColor: "#120097",
      color: "rgb(252, 255, 239)",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      fontSize: "16px",
      margin: "0 9px",
      display: "inline-flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent:"center",
    },
    input: {
      width: "30px",
      height: "18px",
      marginRight: "10px",
      borderRadius: "5px",
      border: "1px solid #120097",
      // padding: "5px",
      display: "inline-flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent:"center",
    },
  };

  return (
    <main>
      <div style={styles.container}>
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      <div style={styles.init}>
        {initUser()}
      </div>
      </div>
    </main>
  );
}
