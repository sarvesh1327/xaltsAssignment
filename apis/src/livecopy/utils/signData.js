const ethSigUtil = require('eth-sig-util');

//function for signing the Typed Data
async function signTypedData(privateKey, data) {
  // If signer is a private key, use it to sign
  const _privateKey = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');
  return ethSigUtil.signTypedMessage(_privateKey, { data });
}

module.exports = signTypedData;
