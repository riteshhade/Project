const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const JWT_SECRET = 'your_secret_key'; // Consider using an environment variable in production

const dB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7723069683',
    database: 'project_db'
});

dB.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/AdminLoginServer', async (req, res) => {
    const { email, password } = req.body;

    // Query to find the user with the provided email
    const query = 'SELECT * FROM adminlogin WHERE email = ?';
    dB.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            console.log('User not found');
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];
        console.log(`User found: ${user.email}`);

        // Directly compare the provided password with the password in the database
        if (password === user.password) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            console.log('Password mismatch');
            res.status(401).send('Invalid credentials');
        }
    });
});

app.post("/EmployeeLoginServer",(req,res)=>{
    const { email, password } = req.body;
    const query = 'SELECT empemail,password FROM employeedetail WHERE empemail = ?';
    dB.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            console.log('User not found');
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];
        console.log(`User found: ${user.email}`);

        // Directly compare the provided password with the password in the database
        if (password === user.password) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            console.log('Password mismatch');
            res.status(401).send('Invalid credentials');
        }
    });
})

app.post("/AdminRegisterationServer",(req, res)=>{
    const {  email, password } = req.body;
    const query = 'INSERT INTO adminlogin (email, password) VALUES (?, ?)';
    dB.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(results);
        res.status(200).send('User registered successfully');
    });
});

app.post("/sendNotification",(req,res)=>{
    const { id,notificationid,reqdate,specialistid,completiondate } = req.body;
    const query = 'INSERT INTO notification(id,notificationid,reqdate,specialistid,completiondate) VALUES (?,?,?,?,?)';
    dB.query(query, [id, notificationid, reqdate, specialistid, completiondate], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(results);
        res.status(200).send('Notification sent successfully');
    });
})

app.post("/addOrgDetails",(req,res)=>{
    const {orgId,orgName,orgAddress,orgEmail,orgPhone,orgStatus} = req.body;
    const query = 'INSERT INTO orgdetail(orgId,orgName,orgAddress,orgEmail,orgPhone,orgStatus) VALUES (?, ?, ?, ?, ?, ?)';
    dB.query(query, [orgId, orgName, orgAddress, orgEmail, orgPhone, orgStatus], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(results);
        res.status(200).send('Organization details added successfully');
    });
})

app.get('/viewAllOrgs', (req, res) => {
    const query = 'SELECT * FROM orgdetail';
    dB.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch organizations' });
      }
      res.json(results);
    });
  });
  

app.put('/updateOrgDetails', async (req, res) => {
    const { orgId, orgName, orgAddress, orgEmail, orgPhone, orgStatus } = req.body;
    try {
      await dB.query('UPDATE orgdetail SET orgName = ?, orgAddress = ?, orgEmail = ?, orgPhone = ?, orgStatus = ? WHERE orgId = ?', 
        [orgName, orgAddress, orgEmail, orgPhone, orgStatus, orgId]);
      res.send({ message: 'Organization updated' });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update organization' });
    }
  });
  
//SERVERS DETAIL
app.post('/ServerDetail',(req,res)=>{
    const {org_id, user_id, server_id, server_name,ip_address,server_room_name,location,status,reason}=req.body
    console.log(req.body);
  
    //add servers in system
    const sql='INSERT INTO servers (org_id, user_id, server_id, server_name,ip_address,server_room_name,location,status,reason) VALUES (?,?,?,?,?,?,?,?,?)';
    dB.query(sql, [org_id, user_id, server_id, server_name, ip_address, server_room_name, location, status, reason], (err, result)=>{
        if(err){
            console.log('Error adding server:', err);
            res.status(500).send('Error adding server');
        }else{
            console.log('Server added successfully');
            res.status(200).send('Server added successfully');
        }
    })
   
});

app.put('/UpdateServerDetail',async(req, res)=>{
    
    const { org_id,user_id, server_id, server_name, ip_address, server_room_name, location, status, reason}=req.body;
    try{
        
    const sql='UPDATE servers SET  user_id=?, server_id=?, server_name=?, ip_address=?, server_room_name=?, location=?, status=?, reason=? WHERE org_id=?';
    dB.query(sql, [ user_id, server_id, server_name, ip_address, server_room_name, location, status, reason, org_id], (err, result)=>{
        
        [ user_id, server_id, server_name, ip_address, server_room_name, location, status, reason,org_id]
            console.log('Server updated successfully');
            res.status(200).send('Server updated successfully');
    })
    } catch (error) {
    console.log(error);
    res.status(500).send('Error updating server');}
});

app.get('/ViewDetail',(req, res)=>{
    const sql='SELECT * FROM servers';
    dB.query(sql, (err, result)=>{
        if(err){
            console.log('Error fetching servers:', err);
            res.status(500).send('Error fetching servers');
        }else{
            console.log('Servers fetched successfully');
            res.json(result);
        }
    })
});
//NOTIFICATION
app.get('/failedServer',(req,res)=>{
    const query = 'SELECT * FROM servers WHERE status = "Failed" or status = "Inactive"';
    dB.query(query, (err, results) => {
      if (err) {
        console.error('test', err);
        return res.status(500).json({ error: 'Failed to fetch failed servers' });
      }
      res.json(results);
    });

});

app.get('/showNotificationList',(req, res)=>{
    const query = 'SELECT * FROM notification';
    dB.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch failed servers' });
      }
      res.json(results);
    });
});
//Employee DetAILS
app.post('/employeeDetails',(req,res)=>{
    const { orgid,empid,empname,empmobile,empemail,empaddress,password } = req.body; 
    try{
    const query = 'INSERT INTO employeedetail (orgid, empid, empname, empmobile, empemail, empaddress, password) VALUES (?, ?, ?, ?, ?, ?,?)';
    dB.query(query, [orgid,empid,empname,empmobile,empemail,empaddress,password], (err, result)=>{
        
        [orgid,empid,empname,empmobile,empemail,empaddress]
            console.log('Employee added successfully');
            res.status(200).send('Employee added successfully');
    })
    } catch (error) {
    console.log(error);
    res.status(500).send('Error adding employee');
}
})

app.put('/editEmployee',async(req,res)=>{
    const { orgid,empid,empname,empmobile,empemail,empaddress,password } = req.body;
    try{
    const query = 'UPDATE employeedetail SET orgid = ?,empname=?, empmobile=?, empemail=?, empaddress=?,emppassword = ? WHERE empid=?';
    dB.query(query, [orgid,empname,empmobile,empemail,empaddress,password,empid], (err, result)=>{

        [orgid,empname,empmobile,empemail,empaddress,password,empid]
            console.log('Employee updated successfully');
            res.status(200).send('Employee updated successfully');
    })
    } catch (error) {
    console.log(error);
    res.status(500).send('Error updating employee');
}
});

app.get('/viewEmployeeDetail', (req, res) => {
    const query = 'SELECT * FROM employeedetail';
    dB.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch employees' });
      }
      res.json(results);
    });
  });
// NOTIFICATION ON EMPLOYEE PAGE
  app.get('/empNotifications',async(req,res)=>{
    const query = `SELECT s.user_id,s.server_id,s.server_name,s.ip_address,n.notificationid,s.reason,n.reqdate,n.specialistid,n.completiondate FROM notification n JOIN servers s ON n.id = s.server_id`
    dB.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch employees' });
      }
      res.json(results);
    });
});

app.put('/updateServerStatus',async(req,res)=>{
    const { user_id,server_id,server_name,ip_address,status } = req.body;
    try{
    const query = 'UPDATE servers SET user_id=?, server_name=?, ip_address=?, status=? WHERE server_id=?';
    dB.query(query, [user_id,server_name,ip_address,status,server_id], (err, result)=>{

        [user_id,server_name,ip_address,status,server_id]
            console.log('Server updated successfully');
            res.status(200).send('Server updated successfully');
    })
    } catch (error) {
    console.log(error);
    res.status(500).send('Error updating server');
}
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
