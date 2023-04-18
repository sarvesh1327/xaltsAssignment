import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

const WalletLogin = () => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      console.log(web3);
      const accounts = await window.ethereum.enable();
      setAccount(accounts[0]);
      console.log(account);
      let initiateLoginResponse = null;
      try {
        initiateLoginResponse = await axios.post(
          'http://localhost:4000/walletLogin',
          {
            publicKey: accounts[0],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
        return;
      }
      const initiateLoginResponseData = initiateLoginResponse.data;
      console.log(initiateLoginResponseData);
      const { publicKey, toSign } = initiateLoginResponseData.data || {};
      const signature = await web3.eth.personal.sign(toSign, accounts[0], '');
      let verifyResponse = null;
      try {
        verifyResponse = await axios.patch(
          'http://localhost:4000/walletLogin',
          {
            publicKey,
            signature: signature.startsWith('0x')
              ? signature
              : `0x${signature}`,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
        return;
      }

      const verifyResponseData = verifyResponse.data;
      console.log(verifyResponseData.success);
      if (verifyResponseData.success === true) {
        const { data } = verifyResponseData || {};
        const { idToken, email } = data || {};
        localStorage.setItem('token', idToken);
        setEmail(email);
        setLoggedIn(true);
      } else {
        console.error('Invalid Signature');
      }
    } else {
      console.error('Metamask not found');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Logged in with to This Account:</p>
          <p>{`${account}-${email}`}</p>
        </div>
      ) : (
        <div>
          <p>Connect to Metamask to log in</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default WalletLogin;
