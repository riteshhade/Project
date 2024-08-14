import React,{ useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminRegister() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:3000/AdminRegisterationServer',{
            email: email,
            password: password
    });
    console.log(response);
    alert('Admin registered successfully');
    setEmail("");
    setPassword("");
    }
    catch(err){
        console.log(err);
        alert('Registration Failed');
    }
}

  return (
    <>
    <h1>Admin Registration</h1>
    <div className='home-container'>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' placeholder='Enter email' 
                value={email} onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='password' className='form-control' placeholder='Enter password' 
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type='button' className='btn btn-primary' onClick={handleSubmit}>Register</button>
            <button type='button' className='btn btn-primary' onClick={() => navigate('/adminlogin')}>Login</button>
        </form>
    </div>
    </>
  )
}
