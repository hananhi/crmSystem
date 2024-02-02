import express from 'express'
import { getCustomers } from '../controllers/customerController.js';

const router=express.Router() ;
//routing for  endpoit
router.get('/',getCustomers);

export default router ;