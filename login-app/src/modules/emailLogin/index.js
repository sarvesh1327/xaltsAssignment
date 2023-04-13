import React, { useState } from 'react';
import axios from 'axios';
import './emailLogin.css';

function EmailLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [wallet, setWallet] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = null;
    try {
      response = await axios.post('http://localhost:4000/emailLogin', {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
      return;
    }

    const emailLoginResponse = response.data;
    if (!emailLoginResponse.success) {
      alert(emailLoginResponse.message);
      return;
    }
    const { data: loginData } = emailLoginResponse || {};
    const { idToken, wallet: userWallet } = loginData || {};
    localStorage.setItem('token', idToken);
    setWallet(userWallet);
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Logged in with to This Account:</p>
          <p>{`${wallet}-${email}`}</p>
        </div>
      ) : (
        <div className="login-form-container">
          <div className="login-form-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />

              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailLoginForm;
