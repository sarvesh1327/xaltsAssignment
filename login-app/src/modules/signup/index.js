import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password === passwordConfirm) {
        let response = null;
        try {
          response = await axios.post('http://localhost:4000/signup', {
            email,
            password,
          });
        } catch (error) {
          console.error(error);
          alert(error.response.data.message);
          return;
        }
        console.log(`Submitted email: ${email}, password: ${password}`);
        const signupResponse = response.data;
        if (!signupResponse.success) {
          alert(signupResponse.message);
          return;
        }
        const { data: walletCreds } = signupResponse || {};

        const json = JSON.stringify(walletCreds);

        // Create a new blob with the JSON data
        const blob = new Blob([json], { type: 'application/json' });

        // Create a new URL object from the blob
        const url = URL.createObjectURL(blob);

        // Create a new anchor element
        const a = document.createElement('a');

        // Set the href and download attributes of the anchor element
        a.href = url;
        a.download = 'walletcreds.json';

        // Append the anchor element to the document body
        document.body.appendChild(a);

        // Click the anchor element to trigger the download
        a.click();

        // Remove the anchor element from the document body
        document.body.removeChild(a);

        // Revoke the URL object to free up memory
        URL.revokeObjectURL(url);
      } else {
        console.log("Passwords don't match!");
        alert('Password doesnt match');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-box">
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

          <label htmlFor="password-confirm">Confirm Password:</label>
          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
