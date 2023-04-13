const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const bearerToken = require('express-bearer-token');
const signupRoute = require('./src/routes/signup');
const emailLoginRoute = require('./src/routes/emaillogin');
const walletLoginRoute = require('./src/routes/walletLogin');

dotenvExpand(dotenv.config());

const port = process.env.PORT || 4003;
const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());

app.use(signupRoute);
app.use(emailLoginRoute);
app.use(walletLoginRoute);

app.use('*', (req, res) => {
  res.status(404).send({ success: false, message: 'Not Found' });
});

app.listen(port, () => {
  console.log('Server listening on PORT: %s', port); //eslint-disable-line
});
