import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const clickwalletLogin = ()=> {
    navigate('/walletlogin');
  }
  const clickemailLogin = ()=> {
    navigate('/emailLogin');
  }
  return (
    <div className="login-container">
      <button onClick={clickemailLogin} className="email-login-button">Log in Via Email/Password</button>
      <button onClick={clickwalletLogin} className="wallet-login-button">Log in Via Wallet</button>
    </div>
  );
}

export default Login;
