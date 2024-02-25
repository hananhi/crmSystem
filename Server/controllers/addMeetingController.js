import pool from '../server.js';

export const addMeetings =async (req,res,next)=>{

    try {
        const {id, leadId, title, startDateTime, endDateTime, duration, number } = req.body;
        
      
        console.log('Received meeting data with leadId:', req.body);
    
        const insertQuery = 'INSERT INTO meetings (id,lead_id, title, start, end, duration, number) VALUES (?, ?, ?, ?, ?, ?,?)';
        
        pool.query(insertQuery, [id,leadId, title, startDateTime, endDateTime, duration, number], (insertError, insertResults, insertFields) => {
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
