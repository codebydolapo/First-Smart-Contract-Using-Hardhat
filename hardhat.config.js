require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");
require('hardhat-gas-reporter')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
      chainId: 4
    }
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  localhost:{
    url: '127.0.0.1:8545',
    chainId: 31337
  },
  gasReporter:{
    enabled: false,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
