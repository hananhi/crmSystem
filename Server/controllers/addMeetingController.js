import pool from '../server.js';

export const addMeetings =async (req,res,next)=>{

    try {
        console.log(req.body);
        const {id, leadId, title, startDateTime, duration ,endDateTime} = req.body;
        
      
        console.log('Received meeting data with leadId:', req.body);
    
        const insertQuery = 'INSERT INTO meetings (id,lead_id, title, start, duration , end) VALUES (?, ?, ?, ?, ?, ?)';
        
        pool.query(insertQuery, [id,leadId, title, startDateTime,  duration , endDateTime,], (insertError, insertResults, insertFields) => {
            if (insertError) {
                console.error('Error adding meeting:', insertError);
                res.status(500).send('Error adding meeting');
                return;
            }

            // If the insert operation was successful, you can send back a success response
            console.log('New meeting added:', insertResults);
            res.status(201).send({ message: 'Meeting added successfully', meetingId: insertResults.insertId });
        });
      } catch (error) {
        console.error('Error processing meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

}

export const deleteMeetings =async (req,res,next)=>{

  const meetingId = req.params.id;
 
  console.log(meetingId);

  try {
  
      // Use pool.query for executing the DELETE query
      pool.query(
          'DELETE FROM meetings WHERE id = ?',
          [meetingId],
          (error, results, fields) => {
              if (error) {
                  console.error('Error in delete meeting', error);
                  // Respond with an error status
                  res.status(500).json({ error: 'Internal Server Error' });
                  return;
              }

            
              console.log('meeting deleted successfully:', results);

              // Send a JSON response indicating the success of the operation
              res.status(204).send();
          }
      );
  } catch (error) {
      console.error('Error in deletePackage:', error);
      next(error);
  }
}

