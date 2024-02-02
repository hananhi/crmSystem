import express from "express";
import dotenv from 'dotenv';
import mysql from 'mysql'
import { errorhandler } from "./middilewares/errorHandling.js";
import cors from 'cors';
import leadsRoutes from  './routes/leadsRoutes.js'
import usersRoutes from  './routes/usersRoutes.js'

import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.js';
dotenv.config();



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


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
app.use(express.json());


app.use( cors({credentials:true}));

app.use(errorhandler);

app.use('/leads',leadsRoutes);
app.use('/users',usersRoutes)

app.listen(4000, ()=>{
    console.log('listening on port 4000')
})

export default pool;


  