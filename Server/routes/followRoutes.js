import express from 'express'
import { addFollowUp ,getFollowUps } from '../controllers/followController.js';


const router=express.Router() ;
//routing for  endpoit

router.post('/',addFollowUp);
router.get('/',getFollowUps);
export default router ;