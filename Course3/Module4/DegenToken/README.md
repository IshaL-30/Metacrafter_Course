# DegenToken Smart Contract

Welcome to the DegenToken project! This repository contains the implementation of the `DegenToken` ERC-20 smart contract designed for the Degen Gaming ecosystem. Built on the Avalanche network, this contract facilitates various in-game transactions, including token minting, burning, and purchasing in-game assets.

## Project Overview

The DegenToken contract is an ERC20 token with additional functionalities tailored for an in-game economy. It includes features for purchasing tokens with AVAX, transferring tokens between players, redeeming tokens for in-game items like seeds and animals, and collecting rewards like eggs and milk.

## Features

- **ERC-20 Compliance:** Standard ERC-20 token functionality for interoperability with wallets and exchanges.
- **Token Minting and Burning:** The owner can mint new tokens and players can burn their tokens.
- **Token Purchase with AVAX:** Players can buy tokens using AVAX, enabling them to acquire in-game assets.
- **In-Game Purchases:** Tokens can be spent to buy seeds and animals.
- **Resource Management:** Harvesting seeds yields fruits and grass; feeding animals with grass results in milk and eggs.
- **Rewards System:** Selling fruits, eggs, milk, and animals grants players additional tokens.

## Contract Details

### Constructor

```solidity
constructor() ERC20("Degen", "DGN") {
    // Mint initial supply to the owner
    _mint(msg.sender, 10 ** 2);

    // Initialize total resources
    totalFruits = 0;
    totalGrass = 10;
    totalEggs = 0;
    totalMilk = 0;
    totalAnimals = 2;
    totalSeeds = 10;
}
```

### Functions

- **purchaseTokens()**: Allows players to buy tokens using AVAX.
- **withdrawETH()**: Enables the owner to withdraw AVAX from the contract.
- **transferTokens(address _receiver, uint256 value)**: Transfers tokens from the sender to another player.
- **purchase_seeds(uint256 value)**: Allows players to buy seeds using tokens.
- **feed_grass_to_animals(uint256 value)**: Feeds grass to animals, producing eggs and milk.
- **purchase_animals(uint256 value)**: Purchases animals with tokens.
- **harvest_fruits(uint256 value)**: Converts seeds into fruits.
- **harvest_grass(uint256 value)**: Harvests grass from the player's balance.
- **sell_fruits(uint256 value)**: Sells fruits for tokens.
- **sell_Eggs(uint256 value)**: Sells eggs for tokens.
- **sell_milk(uint256 value)**: Sells milk for tokens.
- **sell_animals(uint256 value)**: Sells animals for tokens.

## Tools Used

- **NodeJS**
- **Hardhat**
- **Solidity**

## Setup and Deployment

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/IshaL-30/Degen-Token-ETH-Intermediate-Module4.git
    ```

2. **Install Dependencies:**
    ```bash
    cd Degen-Token-ETH-Intermediate-Module4
    npm install
    ```

3. **Configure Environment:**
   - Create a `.env` file and add your private key and API key.
   - For Example:
     ```bash
     PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
     ETHERSCAN_API_KEY=2CHWYYKTMKRE4JT7W3VF8VSK111QA93W8P
     FORK_FUJI=false
     FORK_MAINNET=false
     ```
     
4. **Go Through Guide**
   ```bash
   cd GUIDE.md
   ```

5. **Compile the Contract:**
    ```bash
    npx hardhat compile
    ```

6. **Deploy the Contract:**
    ```bash
    npx hardhat run scripts/deploy.js --network fuji
    ```

7. **Verify the Contract:**
   - Verify the contract on Snowtrace.
  
## Help

If you encounter any issues or need assistance with the project, please refer to the following resources:

- **[Hardhat Documentation](https://hardhat.org/getting-started/)**: For setting up and working with Hardhat.
- **[OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)**: For understanding and using OpenZeppelin contracts.
- **[Avalanche Documentation](https://docs.avax.network/)**: For information about deploying on the Avalanche network.
- **[Solidity Documentation](https://docs.soliditylang.org/)**: For Solidity language specifics and syntax.
- **[Stack Overflow](https://stackoverflow.com/)**: For general development and blockchain questions.
  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
