import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './modules/home';
import SignupForm from './modules/signup';
import Login from './modules/login';
import EmailLoginForm from './modules/emailLogin';
import WalletLogin from './modules/walletLogin';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element = {<SignupForm/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/emailLogin" element = {<EmailLoginForm/>}/>
        <Route path="/walletLogin" element = {<WalletLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
