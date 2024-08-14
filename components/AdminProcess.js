import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import '../css/AdminProcess.css'

export default function AdminProcess() {
  return (
    <>
        
        <Navbar />
        <div className="container-heading">
            <h1>SMS BASED REMOTE SERVER MONITORING SYSTEM</h1>
        </div>
        <div className="container">
            <h1 className='container-heading'>ADMIN PROCESS</h1>
            
            <Link to="/OrganizationDetail">
            <button className='btn btn-primary'>Organization Details</button>
            </Link>

            <Link to="/EmployeeDetail">
            <button className='btn btn-primary'>Employee Details</button>
            </Link>

            <Link to="/ServerDetail">
            <button className='btn btn-primary'>Server Details</button>
            </Link>
            
            <Link to="/Notification">
            <button className='btn btn-primary'>Notification Details</button>
            </Link>
        </div>

    </>
  )
}
