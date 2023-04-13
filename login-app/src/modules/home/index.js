import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const clickLogin = ()=> {
    navigate('/login');
  }
  const clickSignUp = ()=> {
    navigate('/signup');
  }
  return (
    <div className="home-container">
      <button onClick={clickLogin} className="login-button">Log in</button>
      <button onClick={clickSignUp} className="signup-button">Sign up</button>
    </div>
  );
}

export default Home;
