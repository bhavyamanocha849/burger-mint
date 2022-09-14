require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
const dotenv = require('dotenv')
dotenv.config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  "defaultNetwork":"mumbai",
  networks:{
    mumbai:{
      url:process.env.REACT_APP_POLYGON_MUMBAI_RPC_URL,
      accounts:[`0x${process.env.REACT_APP_PRIVATE_KEY}`]
    }
  },
  etherscan:{
    apiKey:{
      polygonMumbai:process.env.REACT_APP_POLYSCAN_KEY
    }
  }
};
