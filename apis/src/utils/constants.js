const ENV = {
  RELAYER_ADDRESS: process.env.RELAYER_ADDRESS,
  RELAYER_API_KEY: process.env.RELAYER_API_KEY,
  RELAYER_SECRET_KEY: process.env.RELAYER_SECRET_KEY,
  chainId: process.env.chainId,
  ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY,
  ADMIN_PUBLIC_KEY: process.env.ADMIN_PUBLIC_KEY,
  minimalForwarderContractAddress: process.env.minimalForwarderContractAddress,
  usersContractAddress: process.env.usersContractAddress,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

module.exports = {
  ENV,
};
