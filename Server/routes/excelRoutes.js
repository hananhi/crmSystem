import express from 'express'
import { interExcel } from '../controllers/excelController.js';

const router=express.Router() ;


router.post('/',interExcel);

export default router ;