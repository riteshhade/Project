import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomeePage.css'; // Import your CSS file

const HomePage = () => {
  const navigate = useNavigate();
  
  const redirectToAdminLogin = () => {
    navigate('/AdminLogin');
  };
  
  const redirectToEmployeeLogin = () => {
    navigate('/EmployeeLogin');
  };
  
  return (
<>
  
    <div className='home-container'>
      <h3>SMS BASED REMOTE SERVER MONITORING</h3>
      <div className='row'>
        <div className='col-sm-6'>
          <button onClick={redirectToAdminLogin}>Admin</button>
        </div>
        <div className='col-sm-6'>
          <button onClick={redirectToEmployeeLogin}>Employee</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
