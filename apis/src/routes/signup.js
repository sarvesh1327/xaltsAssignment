const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createWallet } = require('../utils/createNewWallet');
const checkForExistingUser = require('../livecopy/checkEmail');
const createUser = require('../livecopy/createUser');

async function signup(req, res) {
  try {
    const { email, password } = req.body || {};
    //checking if there is already an existing user with email
    const userByEmail = await checkForExistingUser({ email });
    if (userByEmail) {
      console.log(
        'Invalid request. User already exist by this email %s',
        email,
      );
      res.status(403).send({
        success: false,
        message: 'Invalid request, User already exist',
      });
      return;
    }
    // creating an hash of the password.
    const hashedPass = await bcrypt.hash(password, 12);
    // creating new wallet
    const newWallet = createWallet();
    //creating new user on contract
    await createUser({
      email,
      password: hashedPass,
      wallet: newWallet.address,
    });
    res.status(201).send({
      success: true,
      message: 'SignedUp',
      data: {
        publicKey: newWallet.address,
        privateKey: newWallet.privateKey,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}

router.post('/signup', signup);

module.exports = router;
