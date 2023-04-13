const { usersContractInstance } = require('./utils/contractInstances');

//checking if a user exist for the given email
async function checkForExistingUser({ email }) {
  try {
    const DoesUserExist = await usersContractInstance.methods
      .isUserExist(email)
      .call();
    return DoesUserExist;
  } catch (error) {
    console.error(error);
  }
}

module.exports = checkForExistingUser;
