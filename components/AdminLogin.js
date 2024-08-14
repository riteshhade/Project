import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/AdminRegister');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/AdminLoginServer', {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response);
      console.warn("email", email, "password", password);
      setEmail("");
      setPassword("");
      navigate('/AdminProcess');
    })
    .catch(error => {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert("Login Failed");
    });
  };

  return (
    <>  
      <div>
        <h1 className='login-heading'>ADMIN LOGIN</h1>
      </div>
      <div className='home-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='button' className='btn btn-primary' onClick={handleSubmit}>Login</button>
          <button type='button' className='btn btn-primary' onClick={handleRegisterClick}>Register</button>
        </form>
      </div>
    </>
  );
}
