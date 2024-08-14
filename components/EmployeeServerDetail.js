import React,{ useState,useEffect } from 'react'
import NavbarEmp from '../components/NavbarEmp';
import axios from 'axios';

export default function EmployeeServerDetail() {
    const [notifications, setNotifications] = useState([]);
    // const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false); 
    const [userid,setUserid] = useState('');
    const [serverid,setServerid] = useState('');
    const [servername,setServername] = useState('');
    const [ipaddress,setIpaddress] = useState('');
    const [status,setStatus] = useState('');   

    useEffect(() => {
        // Fetch data from the server when the component mounts
        const fetchNotifications = async () => {
          try {
            const response = await axios.get('http://localhost:3000/empNotifications');
            setNotifications(response.data);
            
          } catch (err) {
            setError('Failed to fetch data');
            
          }
        };
    
        fetchNotifications();
      }, []);

      // if (loading) return <p>Loading...</p>;

  // if (error) return <p>{error}</p>;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/empNotifications');
      setNotifications(response.data);
      setShowNotification(true);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async(e) =>{
    e.preventDefault();
    try{
    await axios.put('http://localhost:3000/updateServerStatus',{
        userid:userid,
        serverid:serverid,
        servername:servername,
        ipaddress:ipaddress,
        status:status
    });
    alert("Server Status Updated");
    setUserid('');
    setServerid('');
    setServername('');
    setIpaddress('');
    setStatus('');
  }
catch(err){
    console.error(err);
    alert("Failed to update Server Status");
  }
  }

  return (
    <>
    <NavbarEmp />
    <div className='container-wrapper2'>
        <div className='home-container'>
            <h1 className='container-heading'>EMPLOYEE SERVER DETAILS</h1>

            <form>
                <div className='form-group'>
                    <label>USER ID </label>
                    <input type='text' className='form-control' placeholder='Enter Employee Id' 
                    value={userid} onChange={(e)=>setUserid(e.target.value)} required
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER ID </label>
                    <input type='text' className='form-control' placeholder='Enter Server Id' 
                    value={serverid} onChange={(e)=>setServerid(e.target.value)} required
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER NAME </label>
                    <input type='text' className='form-control' placeholder='Enter Server Name' 
                    value={servername} onChange={(e)=>setServername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER IP ADDRESS </label>
                    <input type='text' className='form-control' placeholder='Enter Server IP Address' 
                    value={ipaddress} onChange={(e)=>setIpaddress(e.target.value)} required
                    />
                </div>
                <div className='form-group'>
                  <label>Turn Server Status</label>
                  <input type='radio' name='status' value='Inactive' checked={status==='Failed'} onChange={(e)=>setStatus(e.target.value)}/>Failed
                  <input type='radio' name='status' value='Active' checked={status==='Active'} onChange={(e)=>setStatus(e.target.value)}/>Active
                </div>
                <button type='button' className='btn btn-primary' onClick={fetchNotifications}>VIEW</button>
                <button type='button' className='btn btn-primary' onClick={updateStatus}>EDIT</button>
            </form>
        </div>
        {showNotification && (
        <div className='container'>
        <table className='table table-striped'>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Server ID</th>
            <th>Server Name</th>
            <th>IP Address</th>
            <th>Notification ID</th>
            <th>Reason</th>
            <th>Request Date</th>
            <th>Specialist ID</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.notificationid}>
              <td>{notification.user_id}</td>
              <td>{notification.server_id}</td>
              <td>{notification.server_name}</td>
              <td>{notification.ip_address}</td>
              <td>{notification.notificationid}</td>
              <td>{notification.reason}</td>
              <td>{notification.reqdate}</td>
              <td>{notification.specialistid}</td>
              <td>{notification.completiondate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        )};
    </div>
    </>
  )
}
