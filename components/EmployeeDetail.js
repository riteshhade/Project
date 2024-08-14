import React,{ useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../css/OrganizationDetail.css';
import axios from 'axios';

export default function EmployeeDetail() {
  const[orgid, setOrgId] = useState('');
  const[empid, setEmpId] = useState('');
  const[empname, setEmpName] = useState('');
  const[empmobile, setEmpMobile] = useState('');
  const[empaddress, setEmpAddress] = useState('');
  const[empemail, setEmpEmail] = useState('');
  const[emp, setEmp] = useState([]);
  const[showEmp, setShowEmp] = useState(false);
  const[password,setPassword] = useState('');


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/viewEmployeeDetail');
        setEmp(response.data);
      } catch (err) {
        console.log(err);
        alert('Failed to retrieve employees');
      }
    };
  }, []);

  const fetchEmployee = async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/viewEmployeeDetail`); 
      setEmp(response.data);
      setShowEmp(true);
    }
    catch(error){
      console.error(error);
      alert('Failed to fetch Employee');
    }
  }

  const handleEdit = async(e) =>{
    e.preventDefault();
    try{
      await axios.put(`http://localhost:3000/editEmployee`,{
        orgid: orgid,
        empid: empid,
        empname: empname,
        empmobile: empmobile,
        empaddress: empaddress,
        empemail: empemail,
        password: password
      });
      alert('Employee updated successfully');
      setOrgId('');
      setEmpId('');
      setEmpName('');
      setEmpMobile('');
      setEmpEmail('');
      setEmpAddress('');
      setPassword('');
    }
    catch(error){
      console.error(error);
      alert('Failed to update Employee');
    }
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/employeeDetails',{
        orgid: orgid,
        empid: empid,
        empname: empname,
        empmobile: empmobile,
        empaddress: empaddress,
        empemail: empemail,
        password: password
      });
      console.log(response);
      alert('Employee registered successfully');
      setOrgId('');
      setEmpId('');
      setEmpName('');
      setEmpMobile('');
      setEmpAddress('');
      setEmpEmail('');
      setPassword('');
    }catch(error){
      console.error(error);
      alert('Failed to register Employee');
    }
    }


  return (
    <>
    <Navbar />
    <div className='container-wrapper2'>
      <div className='home-container'>
        <h1 className='container-heading'>EMPLOYEE DETAILS</h1>
        <form>
        <div className='form-group'>
            <label>ORG ID </label>
            <input type='text' className='form-control' placeholder='Enter Emp Id' 
            value={orgid} onChange={(e)=>setOrgId(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>EMP ID </label>
            <input type='text' className='form-control' placeholder='Enter Emp Id' 
            value={empid} onChange={(e)=>setEmpId(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>EMP NAME </label>
            <input type='text' className='form-control' placeholder='Enter Emp Name' 
            value={empname} onChange={(e)=>setEmpName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>EMP MOBILE </label>
            <input type='text' className='form-control' placeholder='Enter Emp Mobile Number' 
            value={empmobile} onChange={(e)=>setEmpMobile(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>EMP EMAIL </label>
            <input type='email' className='form-control' placeholder='Enter Emp Email' 
            value={empemail} onChange={(e)=>setEmpEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>EMP ADDRESS </label>
            <input type='text' className='form-control' placeholder='Enter Emp Address' 
            value={empaddress} onChange={(e)=>setEmpAddress(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Enter Password' 
            value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
          <button type='button' className='btn btn-primary' onClick={handleEdit}>Edit</button>
          <button type='button' className='btn btn-primary' onClick={handleSubmit}>Add</button>
          <button type='button' className='btn btn-primary' onClick={fetchEmployee}>View</button>
          </div>
        </form>
      </div>
      {showEmp && (
        <div className='container'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ORG ID</th>
                <th>EMP ID</th>
                <th>EMP NAME</th>
                <th>EMP MOBILE</th>
                <th>EMP EMAIL</th>
                <th>EMP ADDRESS</th>
                <th>EMP Password</th>
              </tr>
            </thead>
            <tbody>
              {emp.map((employee) => (
                <tr key={employee.empid}>
                  <td>{employee.orgid}</td>
                  <td>{employee.empid}</td>
                  <td>{employee.empname}</td>
                  <td>{employee.empmobile}</td>
                  <td>{employee.empemail}</td>
                  <td>{employee.empaddress}</td>
                  <td>{employee.password}</td>
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
