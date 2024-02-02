import pool from '../server.js';

export const getActionLogs =async (req,res,next)=>{


    const id = req.params.id; // Corrected from req.params

    console.log(id);
    try {
        // Use pool.query for executing the query
        pool.query('SELECT * FROM ActionLogs WHERE lead_id = ?', [id], (error, results, fields) => {
            if (error) {
                console.error('Error in getPackages:', error);
                next(error);
                return;
            }

            // Log the retrieved results
            console.log('Packages:', results);

            // Send the results as a JSON response
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getAction:', error);
        next(error);
    }



}

export const deleteAction=async(req,res,next)=>{

    const leadId = req.params.id;
    const actionId = req.params.actionId;

    try {


        // Use pool.query for executing the DELETE query
        pool.query(
            'DELETE FROM actionlogs WHERE lead_id = ? AND id = ?',
            [leadId, actionId],
            (error, results, fields) => {
                if (error) {
                    console.error('Error in deletePackage:', error);
                    // Respond with an error status
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                // Log the result of the DELETE operation
                console.log('Package deleted successfully:', results);

                // Check if any rows were affected (indicating successful delete)
                if (results.affectedRows === 0) {
                    // Package with the given IDs not found
                    console.error('Package not found:', leadId, actionId);
                    res.status(404).json({ error: 'Package not found' });
                    return;
                }

                // Send a JSON response indicating the success of the operation
                res.status(204).send();
            }
        );
    } catch (error) {
        console.error('Error in deletePackage:', error);
        next(error);
    }
}

export const editAction= async(req,res,next)=>{

   
    const leadId = req.params.id;
     
    const logId = req.body.id;
   console.log(leadId,logId);
   console.log(req.body);
   

    try {
        // Assuming you have the updated package details in req.body
        const { id,date, notes } = req.body;
       
        // Use pool.query to execute the update query
        pool.query(
          `
          UPDATE actionlogs
          SET action_date = ?, notes = ?
          WHERE lead_id = ? AND id = ?;
        `,
          [date, notes, leadId, logId],
          (error, results, fields) => {
            if (error) {
              console.error('Error updating package:', error);
              next(error);
              return;
            }
    
            // Handle the success case, if needed
    
            res.status(200).json({ message: 'action updated successfully' });
          }
        );
        
      } catch (error) {
        console.error('Error updating ', error);
        next(error);
      }
    
}

export const addActionLog= async(req,res,next)=>{

    const leadId = req.params.id;
  const newLog = req.body; // Assuming the new package details are sent in the request body

  console.log(leadId,newLog);

  console.log('New log:', newLog);

  try {
    // Use pool.query for executing the INSERT query


    pool.query(
      'INSERT INTO actionlogs (id, lead_id, action_date, notes) VALUES (?, ?, ?, ?)',
      [newLog.id, leadId, newLog.date, newLog.notes],
      (error, results, fields) => {
        if (error) {
          console.error('Error adding package:', error);
          next(error);
          return;
        }
  
        // Get the added package's ID from the results
        const newLogId = results.insertId;
  
        // Include the new package ID in the response
        const addedLog = { id: newLogId, lead_id: leadId, ...newLog };
  
        // Send the added package as a JSON response
        res.status(201).json(addedLog);
        
      }
    );
  }
  catch (error) {
    console.error('Error adding package:', error);
    next(error);
  }

};