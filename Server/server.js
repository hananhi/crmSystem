import express from "express";
import dotenv from 'dotenv';
import mysql from 'mysql'
import { errorhandler } from "./middilewares/errorHandling.js";
import cors from 'cors';
import leadsRoutes from  './routes/leadsRoutes.js'
import usersRoutes from  './routes/usersRoutes.js'

dotenv.config();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHXR_Ij5tGwudt0O7jQ-2Kql-mWe5YJ-Q",
  authDomain: "crm-system-99d52.firebaseapp.com",
  projectId: "crm-system-99d52",
  storageBucket: "crm-system-99d52.appspot.com",
  messagingSenderId: "365806722615",
  appId: "1:365806722615:web:2e04155e380f28e92ae9b2",
  measurementId: "G-N40LKSDRPM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


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


  