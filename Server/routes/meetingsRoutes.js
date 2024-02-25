import express from 'express'
 import { getMeetings } from '../controllers/CalendarController.js';
 import { addMeetings } from '../controllers/addMeetingController.js';

const router=express.Router() ;
//routing for  endpoit
router.get('/',getMeetings);
router.post('/',addMeetings);
export default router ;