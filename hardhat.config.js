require("@nomicfoundation/hardhat-toolbox");
// const ALCHEMY_API_KEY = "taSndwkLIo0OXZv-LjdhAHzi4dAlwMIX";
// const  SEPOLIA_PRIVATE_KEY ="6437a043d285d590b5deba30cd1376b9f208070845809215a2eeba0475fe7a97";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks:{
    mumbai: {
      url: "https://polygon-mumbai-bor.publicnode.com/", 
      chainId: 80001,
      accounts: ['6437a043d285d590b5deba30cd1376b9f208070845809215a2eeba0475fe7a97']
    }
  },
  paths:{
    artifacts:"./token_mint/src/artifacts"
  }   
};
