import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


export default function EmployeeLogin() {
  const navigate = useNavigate();

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/EmployeeLoginServer', {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response);
      setEmail("");
      setPassword("");
      navigate('/EmployeeServerDetail');
    })
    .catch(error => {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert("Login Failed");
    });
  }

  return (
    <>
    <div>
      <h1 className='login-heading'>Employee Login</h1>
    </div>
    <div className='home-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-control' id='email' placeholder='Enter email' 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' id='password' placeholder='Enter password' 
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
      {/* <div className='mt-3'>
        <a href='/forgot-password'>Forgot Password?</a>
      </div> */}
    </div>
    </>
  )
}
