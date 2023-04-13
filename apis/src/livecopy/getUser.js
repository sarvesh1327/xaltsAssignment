const { usersContractInstance } = require('./utils/contractInstances');

//function to fetch user Details
async function getUser({ email }) {
  const userData = await usersContractInstance.methods.getUser(email).call();
  return userData;
}

module.exports = getUser;
