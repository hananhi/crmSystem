import pool from '../server.js';
export const getMeetings =async (req,res,next)=>{

    try {
        // Use pool.query for executing the query
        pool.query('SELECT * FROM meetings', (error, results, fields) => {
            if (error) {
                console.error('Error in getmeetings:', error);
                next(error);
                return;
            }

            // Log the retrieved results
            console.log(results);

            // Send the results as a JSON response
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getmeetings:', error);
        next(error);
    }


}