import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../css/OrganizationDetail.css';
import axios from 'axios';

export default function OrganizationDetail() {
  const [orgId, setOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPhone, setOrgPhone] = useState('');
  const [orgStatus, setOrgStatus] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [showOrgs, setShowOrgs] = useState(false);

  // Fetch organizations when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/viewAllOrgs');
        setOrgs(response.data);
      } catch (err) {
        console.log(err);
        alert('Failed to retrieve organizations');
      }
    };

    fetchOrganizations();
  }, []); 

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getOrgById/${searchId}`);
        if (response.data) {
          const org = response.data;
          setOrgId(org.orgId);
          setOrgName(org.orgName);
          setOrgAddress(org.orgAddress);
          setOrgEmail(org.orgEmail);
          setOrgPhone(org.orgPhone);
          setOrgStatus(org.orgStatus);
        } else {
          alert('Organization not found');
        }
      } catch (err) {
        console.log(err);
        alert('Failed to retrieve organization');
      }
    };
    })

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3000/addOrgDetails', {
        orgId, orgName, orgAddress, orgEmail, orgPhone, orgStatus
      });
      alert('Organization added successfully');
      console.log(response);
      setOrgId('');
      setOrgName('');
      setOrgAddress('');
      setOrgEmail('');
      setOrgPhone('');
      setOrgStatus('');
      // Refresh the list after adding
      await fetchOrganizations();
    } catch (err) {
      console.log(err);
      alert('Failed to add organization');
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put('http://localhost:3000/updateOrgDetails', {
        orgId, orgName, orgAddress, orgEmail, orgPhone, orgStatus
      });
      alert('Organization updated successfully');
      console.log(response);
      // Refresh the list after editing
      await fetchOrganizations();
    } catch (err) {
      console.log(err);
      alert('Failed to update organization');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getOrgById/${searchId}`);
      if (response.data) {
        const org = response.data;
        setOrgId(org.orgId);
        setOrgName(org.orgName);
        setOrgAddress(org.orgAddress);
        setOrgEmail(org.orgEmail);
        setOrgPhone(org.orgPhone);
        setOrgStatus(org.orgStatus);
      } else {
        alert('Organization not found');
      }
    } catch (err) {
      console.log(err);
      alert('Failed to retrieve organization');
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/viewAllOrgs');
      setOrgs(response.data);
      setShowOrgs(true);
    } catch (err) {
      console.log(err);
      alert('Failed to retrieve organizations');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container-wrapper'>
        <div className='home-container'>
          <h1 className='container-heading'>ORGANIZATION DETAILS</h1>
          <form>
            <div className='form-group'>
              <label>ORG ID </label>
              <input type='text' className='form-control' placeholder='Enter Org Id' 
                value={orgId} onChange={(e) => setOrgId(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>ORG NAME </label>
              <input type='text' className='form-control' placeholder='Enter Org Name' 
                value={orgName} onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>ORG ADDRESS </label>
              <input type='text' className='form-control' placeholder='Enter Org Address' 
                value={orgAddress} onChange={(e) => setOrgAddress(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>ORG EMAIL </label>
              <input type='text' className='form-control' placeholder='Enter Org Email' 
                value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>ORG PHONE </label>
              <input type='text' className='form-control' placeholder='Enter Org Phone' 
                value={orgPhone} onChange={(e) => setOrgPhone(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>ORG STATUS </label>
              <div>
                <input type='radio' name='status' value='active' 
                  checked={orgStatus === 'active'} onChange={(e) => setOrgStatus(e.target.value)}
                /> Active
                <input type='radio' name='status' value='inactive' 
                  checked={orgStatus === 'inactive'} onChange={(e) => setOrgStatus(e.target.value)}
                /> Inactive
              </div>
            </div>
            <div className='form-group'>
              <button type='button' className='btn btn-primary' onClick={handleAdd}>Add</button>
              <button type='button' className='btn btn-primary' onClick={handleEdit}>Edit</button>
              <button type='button' className='btn btn-primary' onClick={fetchOrganizations}>View</button>
            </div>
          </form>
        </div>
        {showOrgs && (
          <div className='container'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>ORG ID</th>
                  <th>ORG NAME</th>
                  <th>ORG ADDRESS</th>
                  <th>ORG EMAIL</th>
                  <th>ORG PHONE</th>
                  <th>ORG STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orgs.map((org) => (
                  <tr key={org.orgId}>
                    <td>{org.orgId}</td>
                    <td>{org.orgName}</td>
                    <td>{org.orgAddress}</td>
                    <td>{org.orgEmail}</td>
                    <td>{org.orgPhone}</td>
                    <td>{org.orgStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
