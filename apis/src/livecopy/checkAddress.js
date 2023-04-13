const { usersContractInstance } = require('./utils/contractInstances');

//function for fetching email corresponding to a wallet
async function checkForAddress({ address }) {
  try {
    const AddressEmail = await usersContractInstance.methods
      .walletEmails(address)
      .call();
    return AddressEmail;
  } catch (error) {
    console.error(error);
  }
}

module.exports = checkForAddress;
