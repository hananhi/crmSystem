import pool from '../server.js';

export const addFollowUp =async (req,res,next)=>{
    const { leadId,followUpTime, DateTime } = req.body;
    console.log(req.body);

    // Compute the scheduled time based on followUpTime
    let scheduled_time = new Date(); // Default to current time
    switch (followUpTime) {
        case '1hour':
            scheduled_time.setHours(scheduled_time.getHours() + 1);
            break;
        case '2hours':
            scheduled_time.setHours(scheduled_time.getHours() + 2);
            break;
        case 'tomorrow':
            scheduled_time.setDate(scheduled_time.getDate() + 1);
            break;
        case 'manual':
            scheduled_time = new Date(DateTime); // Use the provided date-time
            break;
        default:
            return res.status(400).send({ error: 'Invalid follow-up type provided.' });
    }

    // Assuming you have a FollowUps table with columns for id, follow_up_time, and scheduled_time
    const query = 'INSERT INTO followUps (lead_id,follow_up_type, scheduled_time) VALUES (?, ?,?)';
    const values = [ leadId,followUpTime, scheduled_time];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error creating follow-up:', error);
            return res.status(500).json({ error: 'Error creating follow-up' });
        }
        // Send back the ID of the new follow-up entry
        res.status(201).json({ message: 'Follow-up created successfully', followUpId: results.insertId });
    });
    
}

export const getFollowUps =async (req,res,next)=>{

    try {
        // Use pool.query for executing the query
        pool.query('SELECT * FROM followUps', (error, results, fields) => {
            if (error) {
                console.error('Error in getFollowUps:', error);
                next(error);
                return;
            }

            // Log the retrieved results
            console.log(results);

            // Send the results as a JSON response
            res.json(results);
        });
    } catch (error) {
        console.error('Error in FollowUps', error);
        next(error);
    }


}