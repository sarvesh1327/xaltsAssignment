const Web3 = require('web3');
const web3 = new Web3();

function createWallet() {
  //creating new wallet using web3 library
  return web3.eth.accounts.create(web3.utils.randomHex(32));
}

module.exports = { web3, createWallet };
