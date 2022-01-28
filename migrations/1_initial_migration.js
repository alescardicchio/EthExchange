// File js per il deployment degli smart contracts in blockchain.

const EthereumSwap_Migration = artifacts.require("EthereumSwap");

const Token_Migration = artifacts.require("Token");

module.exports = function(deployer) {
  deployer.deploy(EthereumSwap_Migration);
  deployer.deploy(Token_Migration);
};
