/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, META_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "polygon_mumbai",
  networks: {
     hardhat: {},
     polygon_mumbai: {
        url: API_URL,
        accounts: [`0x${META_PRIVATE_KEY}`]
     }
  },
};
