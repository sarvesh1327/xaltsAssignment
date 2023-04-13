var Web3 = require('web3');
const { ENV } = require('../../utils/constants');

const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');

let web3Instance = null;
const relayerAddress = ENV.RELAYER_ADDRESS;

try {
  const credentials = {
    apiKey: ENV.RELAYER_API_KEY,
    apiSecret: ENV.RELAYER_SECRET_KEY,
  };
  const provider = new DefenderRelayProvider(credentials, { speed: 'fast' });
  web3Instance = new Web3(provider);
} catch (err) {
  console.error(err);
}

module.exports = {
  web3Instance,
  relayerAddress,
};
