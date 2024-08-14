import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Notification() {
    const [id, setId] = useState('');
    const [notificationid, setNotificationId] = useState('');
    const [reqdate, setDate] = useState('');
    const [specialistid, setSpecialistId] = useState('');
    const [completiondate, setCompletionDate] = useState('');
    const [failedServer, setFailedServer] = useState([]);
    const [showFailedServers, setShowFailedServers] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [showNotificationList, setShowNotificationList] = useState(false);

    useEffect(() => {
        const fetchFailedServer = async () => {
            try {
                const response = await axios.get('http://localhost:3000/failedServer');
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        // fetchFailedServer();
    }, []);

    const fetchFailedServer = async() => {
        try {
            const response = await axios.get('http://localhost:3000/failedServer');
            setFailedServer(response.data);
            setShowFailedServers(true);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(()=>{
        const fetchNotificationList = async() => {
            try {
                const response = await axios.get('http://localhost:3000/showNotificationList');
                setFailedServer(response.data);
                setShowFailedServers(true);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const fetchNotificationList = async() =>{
        try {
            const response = await axios.get('http://localhost:3000/showNotificationList');
            setNotificationList(response.data);
            setShowNotificationList(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/sendNotification', {
                id: id,
                notificationid: notificationid,
                reqdate: reqdate,
                specialistid: specialistid,
                completiondate: completiondate
            });
            console.log(response);
            alert('SMS sent successfully');
            setId('');
            setNotificationId('');
            setDate('');
            setSpecialistId('');
            setCompletionDate('');
        } catch (err) {
            console.error(err);
            alert('Failed to send notification');
        }
    }

    return (
        <>
            <Navbar />
            <div className='container-wrapper3'>
                <div className='container'>
                    <h1 className='container-heading'>NOTIFICATION DETAILS</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>ENTER SERVER ID</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter SERVER Id' 
                                value={id} 
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>NOTIFICATION ID</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Notification Id' 
                                value={notificationid} 
                                onChange={(e) => setNotificationId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Date</label>
                            <input 
                                type='date' 
                                className='form-control' 
                                placeholder='DD/MM/YYYY'
                                value={reqdate} 
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>EMPLOYEE ID</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Employee ID' 
                                value={specialistid} 
                                onChange={(e) => setSpecialistId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>COMPLETION DATE</label>
                            <input 
                                type='date' 
                                className='form-control' 
                                placeholder='DD/MM/YYYY' 
                                value={completiondate} 
                                onChange={(e) => setCompletionDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-primary'>SEND MESSAGE</button>
                        </div>
                    </form>
                </div>
                <div className='searchOrg'>
                    <button type='button' className='btn btn-primary' onClick={fetchFailedServer}>VIEW FAILED SERVER</button>
                    <button type='button' className='btn btn-primary' onClick={fetchNotificationList}>VIEW NOTIFICATION LIST</button>
                </div>
            {showFailedServers && (
                <div className='container'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>SERVER ID</th>
                                <th>SERVER NAME</th>
                                <th>SERVER IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {failedServer.map((server) => (
                                <tr>
                                    <td>{server.server_id}</td>
                                    <td>{server.server_name}</td>
                                    <td>{server.ip_address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )}
            {showNotificationList && (
                <div className='container'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>NOTIFICATION ID</th>
                                <th>REQUEST DATE</th>
                                <th>EMPLOYEE ID</th>
                                <th>COMPLETION DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationList.map((notification) => (
                                <tr>
                                    <td>{notification.notificationid}</td>
                                    <td>{notification.reqdate}</td>
                                    <td>{notification.specialistid}</td>
                                    <td>{notification.completiondate}</td>
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
