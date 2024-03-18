import express from 'express'
 import { getMeetings } from '../controllers/CalendarController.js';
 import { addMeetings ,deleteMeetings , updateMeeting} from '../controllers/addMeetingController.js';

const router=express.Router() ;
//routing for  endpoit
router.get('/',getMeetings);
router.post('/',addMeetings);
router.delete('/:id', deleteMeetings);
router.patch(':/id',updateMeeting);
export default router ;