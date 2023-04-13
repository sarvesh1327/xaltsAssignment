const {
  usersContractInstance,
  minimalForwarderInstance,
} = require('./utils/contractInstances');
const { helperMFDataToSign } = require('./utils/minimalForwarderSignature');
const signTypedData = require('./utils/signData');
const { ENV } = require('../utils/constants');
const usersContractAddress = ENV.usersContractAddress;

//function to create new user
async function createUser({ email, password, wallet }) {
  try {
    let account = ENV.ADMIN_PUBLIC_KEY;
    const encodedAbi = usersContractInstance.methods
      .createUser(email, password, wallet)
      .encodeABI();
    const { nonce, toSign } = await helperMFDataToSign(
      account,
      usersContractAddress,
      encodedAbi,
      1e7,
    );
    //signing the Typed data
    const signature = await signTypedData(ENV.ADMIN_PRIVATE_KEY, toSign);

    const request = {
      from: account,
      to: usersContractAddress,
      value: 0,
      gas: 1e7,
      nonce,
      data: encodedAbi,
    };
    //validating the signature
    const valid = await minimalForwarderInstance.methods
      .verify(request, signature)
      .call();
    console.log('signature is valid?', valid);
    if (valid) {
      //initiating the transaction
      const result = await minimalForwarderInstance.methods
        .execute(request, signature)
        .send();
      console.log(
        `Transaction for createUser completed with Transaction Hash ${result.transactionHash}`,
      );
    } else {
      throw new Error('Invalid Signature');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = createUser;
