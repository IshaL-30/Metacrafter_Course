# DegenToken Smart Contract

Welcome to the DegenToken project! This repository contains the implementation of the `DegenToken` ERC-20 smart contract designed for the Degen Gaming ecosystem. Built on the Avalanche network, this contract facilitates various in-game transactions, including token minting, burning, and purchasing in-game assets.

## Project Overview

**Degen Gaming** aims to enhance player engagement by integrating a custom token into their game. Players can earn and spend tokens for various in-game activities, creating a rewarding and interactive gaming experience.

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
    git clone https://github.com/your-repo/degen-token.git
    ```

2. **Install Dependencies:**
    ```bash
    cd degen-token
    npm install
    ```

3. **Configure Environment:**
   - Create a `.env` file and add your private key and API key.

4. **Compile the Contract:**
    ```bash
    npx hardhat compile
    ```

5. **Deploy the Contract:**
    ```bash
    npx hardhat run scripts/deploy.js --network fuji
    ```

6. **Verify the Contract:**
   - Verify the contract on Snowtrace.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).

---

Feel free to modify this `README.md` to fit any additional details or specific instructions for your project.
```

Adjust the sections as necessary, such as adding your repository URL, adjusting the email address, or including additional setup steps specific to your deployment.
