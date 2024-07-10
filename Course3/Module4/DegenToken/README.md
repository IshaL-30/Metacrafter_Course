# DegenToken Project

This project is a simple implementation of a DegenToken smart contract on the Avalanche blockchain. It allows users to purchase tokens, transfer tokens, redeem tokens for in-game items, and more.

## Description

The DegenToken contract is an ERC20 token with additional functionalities tailored for an in-game economy. It includes features for purchasing tokens with AVAX, transferring tokens between players, redeeming tokens for in-game items like seeds and animals, and collecting rewards like eggs and milk.

## Getting Started

### Installing

1. Clone the repository:
```
git clone https://github.com/your-repo/DegenToken.git
cd DegenToken
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory and add the following content:
```
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
FORK_FUJI=false
FORK_MAINNET=false
```

### Executing program

1. Compile the smart contract:
```
npx hardhat compile
```

2. Deploy the smart contract to the Avalanche Fuji Testnet:
```
npx hardhat run scripts/deploy.js --network fuji
```

3. Interact with the smart contract:
- Purchase tokens with AVAX:
  ```javascript
  await degenToken.purchaseTokens({ value: ethers.utils.parseEther("0.001") });
  ```
- Transfer tokens:
  ```javascript
  await degenToken.transferTokens(receiverAddress, amount);
  ```
- Redeem tokens for in-game items (seeds, animals, etc.):
  ```javascript
  await degenToken.purchase_seeds(amount);
  await degenToken.feed_grass_to_animals(amount);
  ```

## Help

For common issues, ensure that:
- Your `.env` file is correctly configured.
- Your private key has sufficient AVAX for transactions.
- You are connected to the correct Avalanche network.

If you need further assistance, you can find more detailed information in the Hardhat documentation:
```
npx hardhat help
```

markdown
Copy code

## Authors

Contributor name

- Isha

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.