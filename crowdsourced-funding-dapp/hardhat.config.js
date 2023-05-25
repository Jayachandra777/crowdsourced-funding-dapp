require("@nomiclabs/hardhat-waffle");
const { privateKey, celoNetwork } = require("./secrets.json");

module.exports = {
  networks: {
    celo: {
      url: celoNetwork,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
