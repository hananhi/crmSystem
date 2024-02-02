import express from "express";
import dotenv from 'dotenv';
import mysql from 'mysql'
import { errorhandler } from "./middilewares/errorHandling.js";
import cors from 'cors';
import leadsRoutes from  './routes/leadsRoutes.js'
import customerRoutes from './routes/customerRoutes.js'


dotenv.config();
//dataBase connection 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crm-system',
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
})


const app = express();
app.use(express.json()); //parsing


app.use( cors({credentials:true}));//middileware for cors

app.use(errorhandler); //middileware for error

app.use('/leads',leadsRoutes); //middileware for leads
app.use('/customers',customerRoutes) //middileware for user

app.listen(process.env.PORT, () => {
  console.log(`Listening`);
 
});

export default pool;


  