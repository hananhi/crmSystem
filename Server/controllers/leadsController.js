import pool from '../server.js';

export const getLead = (req, res, next) => {
        try {
            // Extract leadId from the request parameters
            const { id } = req.params;
    
    
            // Use pool.query for executing the query
            pool.query('SELECT * FROM Leads WHERE id = ?', [id], (error, results, fields) => {
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
};

export const addLead =async (req,res,next)=>{

    try {
        const { leadName, customerAccount, phone, email, status } = req.body.leadData;
        
        // Use pool.query for executing the query
        pool.query('INSERT INTO Leads (name, customer_account, phone, email, status) VALUES (?, ?, ?, ?, ?)', [leadName, customerAccount, phone, email, status], (error, results) => {
            if (error) {
                console.error('Error in addLead:', error);
                next(error);
                return;
            }
    
            // Log the retrieved results
            console.log(results);
    
            // Send the results as a JSON response with a success message
            res.json({ message: 'Lead added successfully', results });
        });
    } catch (error) {
        console.error('Error in addLead:', error);
        next(error);
    }
}
export const getLeads = (req, res, next) => {
    try {
        // Use pool.query for executing the query
        pool.query('SELECT * FROM Leads', (error, results, fields) => {
            if (error) {
                console.error('Error in getLeads:', error);
                next(error);
                return;
            }

            // Log the retrieved results
            console.log(results);

            // Send the results as a JSON response
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getLeads:', error);
        next(error);
    }
};