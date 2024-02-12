import pool from '../server.js';
export const getCustomers =async (req,res,next)=>{


    try {
        // Extract leadId from the request parameters
        const { id } = req.params;


        // Use pool.query for executing the query
        pool.query('SELECT * FROM customers WHERE id = ?', [id], (error, results, fields) => {
            if (error) {
                console.error('Error in getLead:', error);
                next(error);
                return;
            }

            // Log the retrieved results
            console.log(results);

            // Send the results as a JSON response
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getLead:', error);
        next(error);
    }


}