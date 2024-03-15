import express from "express";
import dotenv from 'dotenv';
import mysql from 'mysql'
import { errorhandler } from "./middilewares/errorHandling.js";
import cors from 'cors';
import leadsRoutes from  './routes/leadsRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import meetingsRoutes from './routes/meetingsRoutes.js'
import followRoutes from './routes/followRoutes.js'
import excelRoutes from './routes/excelRoutes.js'
//import { scheduleReminders } from './controllers/meetingController.js';
//import whatsappClient from './controllers/whatsAppclientController.js';


dotenv.config();
//dataBase connection 
const pool = mysql.createPool({
    host: '185.229.114.1',
    user: 'u636091749_hanan',
    password: ']h!#MH*8dV',
    database: 'u636091749_crm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Use the pool to get a connection
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
  
    console.log('Connected to MySQL!');

    connection.release();
   // scheduleReminders();
   
})


const app = express();

app.use(express.json()); //parsing
const renderIPs = ['3.75.158.163','3.125.183.140','35.157.117.28']; 
const corsOptions = {
  origin: (origin, callback) => {
    if (renderIPs.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use( cors(corsOptions));//middileware for cors

app.use(errorhandler); //middileware for error


app.use('/leads',leadsRoutes); //middileware for leads
app.use('/customers',customerRoutes) //middileware for user
app.use('/meetings',meetingsRoutes);
app.use('/followUps',followRoutes);
app.use('/excel',excelRoutes);
const PORT =process.env.PORT;


app.listen(PORT, () => {
  console.log(`Listening ON PORT ${PORT}`);
 
});
/*
whatsappClient.on('ready', () => {
  console.log('Client is ready, scheduling reminders.');
  scheduleReminders(); // Ensure this is only called once the client is ready
});
*/

export default pool;


  