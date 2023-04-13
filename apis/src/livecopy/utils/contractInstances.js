const { ENV } = require('../../utils/constants');
const { web3Instance, relayerAddress } = require('./relayerProvider');
const minimalForwarderAbi = require('../abis/MinimalForwarder_ABI.json');
const usersAbi = require('../abis/Users_ABI.json');

const minimalForwarderAddress = ENV.minimalForwarderContractAddress;
const usersContractAddress = ENV.usersContractAddress;

//minimalForwarder instance with web3
const minimalForwarderInstance = new web3Instance.eth.Contract(
  minimalForwarderAbi,
  minimalForwarderAddress,
  { from: relayerAddress },
);

//users instance with web3
const usersContractInstance = new web3Instance.eth.Contract(
  usersAbi,
  usersContractAddress,
  { from: relayerAddress },
);

module.exports = { minimalForwarderInstance, usersContractInstance };
