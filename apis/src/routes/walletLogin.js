const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkForAddress = require('../livecopy/checkAddress');
const { web3 } = require('../utils/createNewWallet');
const { ENV } = require('../utils/constants');

async function initiate(req, res) {
  try {
    const { publicKey } = req.body || {};
    //checking if there is a user with this wallet
    const walletEmail = await checkForAddress({ address: publicKey });
    if (walletEmail.length === 0) {
      console.log(
        `Invalid request. User doesn't exist by this address %s`,
        publicKey,
      );
      res.status(401).send({ success: false, message: 'Unauthorized Access' });
      return;
    }
    //creating a message for user to sign
    const toSign = `I verify that ${walletEmail} is my account`;
    res.send({
      success: true,
      message: 'Initiate Login',
      data: { publicKey, toSign },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}

async function verify(req, res) {
  try {
    const { publicKey, signature } = req.body || {};
    //checking if there is a user with this wallet
    const walletEmail = await checkForAddress({ address: publicKey });
    if (walletEmail.length === 0) {
      console.log(
        `Invalid request. User doesn't exist by this address %s`,
        publicKey,
      );
      res.status(401).send({ success: false, message: 'Unauthorized Access' });
      return;
    }
    const toSign = `I verify that ${walletEmail} is my account`;
    //confirming the validity of the signature
    const address = await web3.eth.accounts.recover(toSign, signature);
    if (address.toLowerCase() !== publicKey.toLowerCase()) {
      console.log(`Invalid signature by publicKey %s`, publicKey);
      res.status(401).send({ success: false, message: 'Invalid signature' });
      return;
    }
    //creating new jwt token
    const idToken = jwt.sign(
      { email: walletEmail, wallet: address },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.JWT_EXPIRES_IN,
      },
    );
    res.status(201).send({
      success: true,
      message: 'loggedIn',
      data: { idToken, email: walletEmail, wallet: address },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}

router.route('/walletLogin').post(initiate).patch(verify);

module.exports = router;
