import express from 'express'
 import { getMeetings } from '../controllers/CalendarController.js';

const router=express.Router() ;
//routing for  endpoit
router.get('/',getMeetings);

export default router ;