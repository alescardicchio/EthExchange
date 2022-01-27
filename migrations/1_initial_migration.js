// File js per il deployment degli smart contracts in blockchain.

const Migrations = artifacts.require("EthereumSwap");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
