const { ENV } = require('../../utils/constants');
const { minimalForwarderInstance } = require('./contractInstances');
const chainId = ENV.chainId;

const minimalForwarderAddress = ENV.minimalForwarderContractAddress;

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

const ForwardRequest = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

function getMetaTxTypeData(verifyingContract) {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    domain: {
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId,
      verifyingContract,
    },
    primaryType: 'ForwardRequest',
  };
}

async function buildRequest(publicKey, targetAddress, nonce, data, gas) {
  return {
    from: publicKey,
    to: targetAddress,
    value: 0,
    gas: gas ? gas : 1e6,
    nonce: nonce,
    data: data,
  };
}

async function buildTypedData(request, chainId, forwarder) {
  const typeData = getMetaTxTypeData(forwarder);
  return { ...typeData, message: request };
}

//function which creates the TypedV4 data for admin to sign
async function helperMFDataToSign(from, targetAddress, data, gas) {
  const nonce = await minimalForwarderInstance.methods.getNonce(from).call();
  let request = await buildRequest(from, targetAddress, nonce, data, gas);
  let toSign = await buildTypedData(request, chainId, minimalForwarderAddress);
  return { nonce, toSign };
}

module.exports = {
  helperMFDataToSign,
};
