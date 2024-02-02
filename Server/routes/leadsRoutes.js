import express from 'express'
import { getLeads,addLead ,getLead} from '../controllers/leadsController.js';
import { deletePackage ,editPackage,addPackage,getPackages } from '../controllers/packageController.js';
import { getActionLogs,deleteAction,editAction ,addActionLog} from '../controllers/actionController.js';


const router=express.Router() ;

//routing for every endpoit
router.get('/',getLeads);
router.post('/',addLead);
router.get('/:id',getLead);

router.get('/:id/packages',getPackages);

 router.delete('/:id/packages/:packageId', deletePackage);
 router.patch('/:id/packages/:packageId', editPackage);
 router.post('/:id/packages',addPackage);

 router.get('/:id/actionLogs',getActionLogs);
 router.delete('/:id/actionLogs/:actionId',deleteAction);
 router.patch('/:id/actionLogs/:actionId',editAction);
 router.post('/:id/actionLogs',addActionLog);
 


export default router ;