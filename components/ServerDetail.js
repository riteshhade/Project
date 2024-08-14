import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'


 function ServerDetail() {
    const [org_id, setOrg_id]=useState("");
    const [user_id, setUser_id]=useState("");
    const [server_id, setServer_id]=useState("");
    const [server_name, setServer_name]=useState("");
    const [ip_address, setIp_address]=useState("");
    const [server_room_name, setServer_room_name]=useState("");
    const [location, setLocation]=useState("");
    const [status, setStatus]=useState("");
    const [reason, setReason]=useState("");
    const [servers, setServers]=useState([]);
    const [showServer, setShowServer]=useState(false);

    useEffect(()=>{
        const fetchServer = async()=>{
            try {
                const response = await axios.get("http://localhost:3000/ViewDetail");
                setServers(response.data);
            } catch (err) {
                console.log(err);
                alert('Error fetching servers:', err);
        }
    };
    },[]);

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/ServerDetail",{
                org_id:org_id,
                user_id:user_id,
                server_id:server_id,
                server_name:server_name,
                ip_address:ip_address,
                server_room_name:server_room_name,
                location:location,
                status:status,
                reason:reason

            });
            setOrg_id("");
            setUser_id("");
            setServer_id("");
            setIp_address("");
            setServer_room_name("");
            setLocation("");
            setStatus("");
            setReason("");
        } catch (err) {
            alert('Error adding server:', err)
        }
        
    };

    const handleEdit = async(e)=> {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/UpdateServerDetail`,{
                org_id:org_id,
                user_id:user_id,
                server_id:server_id,
                server_name:server_name,
                ip_address:ip_address,
                server_room_name:server_room_name,
                location:location,
                status:status,
                reason:reason

            });
            alert("Server Updated");
            setOrg_id("");
            setUser_id("");
            setServer_id("");
            setIp_address("");
            setServer_room_name("");
            setLocation("");
            setStatus("");
            setReason("");

        } catch (err) {
            alert('Error updating server', err)
        }

    }
    const fetchServer = async()=>{
        try {
            const response = await axios.get("http://localhost:3000/ViewDetail");
            setServers(response.data);
            setShowServer(true);    
        } catch (err) {
            console.log(err);
            alert('Error fetching servers:', err);
    }
};

  return (
    <>
    <Navbar />
    <div className='container-wrapper1'>
        <div className='home-container'>
            <h1 className='container-heading'>SERVER DETAIL</h1>
            <form> 
                <div className='form-group'>
                    <label>ORG ID</label>
                    <input type='text' className='form-control' placeholder='Enter Org Id' onChange={(e)=>setOrg_id(e.target.value)} 
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>USER ID </label>
                    <input type='text' className='form-control' placeholder='Enter User Id' onChange={(e)=>setUser_id(e.target.value)} 
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER ID</label>
                    <input type='text' className='form-control' placeholder='Enter Server Id' onChange={(e)=>setServer_id(e.target.value)} 
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER NAME </label>
                    <input type='text' className='form-control' placeholder='Enter Server Name' onChange={(e)=>setServer_name(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>IP ADDRESS</label>
                    <input type='text' className='form-control' placeholder='Enter IP Address' onChange={(e)=>setIp_address(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>SERVER ROOM NAME</label>
                    <input type='text' className='form-control' placeholder='Enter Server Room Name' onChange={(e)=>setServer_room_name(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>LOCATION</label>
                    <input type='text' className='form-control' placeholder='Enter Room Location' onChange={(e)=>setLocation(e.target.value)}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label>STATUS</label>
                    <input type='radio' name='status' value='Failed' checked={status==='Failed'} onChange={(e)=>setStatus(e.target.value)}/>Failed
                    <input type='radio' name='status' value='Running' checked={status==='Running'} onChange={(e)=>setStatus(e.target.value)}/>Running
                    <input type='radio' name='status' value='Active' checked={status==='Active'} onChange={(e)=>setStatus(e.target.value)}/>Active
                    <input type='radio' name='status' value='Inactive' checked={status==='Inactive'} onChange={(e)=>setStatus(e.target.value)}/>Inactive
                </div>
                <div className='form-group'>
                    <label>REASON</label>
                    <textarea className='form-control' placeholder='Enter Reason' onChange={(e)=>setReason(e.target.value)}></textarea>
                </div>
                <div className='form-group'>
                    <button type='button' className='btn btn-primary'onClick={handleEdit}>EDIT</button>
                    <button type='button' className='btn btn-primary' onClick={handleSubmit}>ADD</button>
                    <button type='button' className='btn btn-primary' onClick={fetchServer}>VIEW</button>
                </div>
            </form>
        </div>
        {showServer && (
          <div className='container'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>ORG ID</th>
                  <th>USER ID</th>
                  <th>SERVER ID</th>
                  <th>SERVER NAME</th>
                  <th>IP ADDRESS</th>
                  <th>SERVER ROOM NAME</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>REASON</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((server) => (
                  <tr key={server.server_id}>
                    <td>{server.org_id}</td>
                    <td>{server.user_id}</td>
                    <td>{server.server_id}</td>
                    <td>{server.server_name}</td>
                    <td>{server.ip_address}</td>
                    <td>{server.server_room_name}</td>
                    <td>{server.location}</td>
                    <td>{server.status}</td>
                    <td>{server.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>

    </>
  )
}

export default ServerDetail;
