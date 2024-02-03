/* eslint-env node */
require("@nomicfoundation/hardhat-toolbox")
// require("dotenv").config()

// const {
// 	VITE_ALCHEMY_API_URL,
// 	VITE_PRIVATE_KEY,
// 	VITE_PRIVATE_KEY2,
// 	VITE_ETHERSCAN_API_KEY
// } = process.env
const ALCHEMY_API_KEY = "7bqUzMELUHKBbgov7Py9BYQyzvXo2i5j";
const  SEPOLIA_PRIVATE_KEY ="6437a043d285d590b5deba30cd1376b9f208070845809215a2eeba0475fe7a97";
module.exports = {

	networks:{
		sepolia:{
		  url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
		  accounts:[`${SEPOLIA_PRIVATE_KEY}`],
		}
	},
	solidity: {
		version: "0.8.19",
		settings: {
			optimizer: { enabled: true, runs: 200 }
		}
	},
	etherscan: {
		apiKey: "BM36J1BNXAER8B6RCYXWGB8JWECIZ4XJMY"
	}
}

// npx hardhat run scripts/deploy.js --network sepolia                        
// myNFT deployed to: 0x514424f573F84E40dC953490D0A305b33267d005