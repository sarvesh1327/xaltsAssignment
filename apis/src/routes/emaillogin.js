const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkForExistingUser = require('../livecopy/checkEmail');
const getUser = require('../livecopy/getUser');
const { ENV } = require('../utils/constants');

async function emailLogin(req, res) {
  try {
    const { email, password } = req.body || {};
    //checking if user exist for this email or not
    const userByEmail = await checkForExistingUser({ email });
    if (!userByEmail) {
      console.log(
        `Invalid request. User doesn't exist by this email %s`,
        email,
      );
      res.status(401).send({ success: false, message: 'Unauthorized Access' });
      return;
    }

    //fetching user details from contract
    const userData = await getUser({
      email,
    });
    const { password: userPassword, wallet } = userData || {};
    //confirming the password
    const isPasswordCorrect = await bcrypt.compare(password, userPassword);
    if (!isPasswordCorrect) {
      console.log('Invalid Password');
      res.status(401).send({ success: false, message: 'Invalid Password' });
      return;
    }
    //generating new jwt token;
    const idToken = jwt.sign({ email, wallet }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN,
    });

    res.status(201).send({
      success: true,
      message: 'loggedIn',
      data: { idToken, email, wallet },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}

router.post('/emailLogin', emailLogin);

module.exports = router;
