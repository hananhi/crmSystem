import pool from '../server.js';

export const getLead = (req, res, next) => {
        try {
            // Extract leadId from the request parameters
            const { id } = req.params;
    
    
            // Use pool.query for executing the query
            pool.query('SELECT * FROM leads WHERE id = ?', [id], (error, results, fields) => {
                if (error) {
                    console.error('Error in getLead:', error);
                    next(error);
                    return;
                }
    
                // Send the results as a JSON response
                res.json(results);
            });
        } catch (error) {
            console.error('Error in getLead:', error);
            next(error);
        }
};

export const deleteLead = (req, res, next) => {
    const { id } = req.params;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return next(err);
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                connection.release();
                return next(err);
            }

            const deleteActions = `
                DELETE FROM actionlogs WHERE lead_id = ?;
                DELETE FROM followUps WHERE lead_id = ?;
                DELETE FROM meetings WHERE lead_id = ?;
                DELETE FROM packages WHERE lead_id = ?;
                DELETE FROM leads WHERE id = ?;
            `;

            // Splitting the queries into an array for sequential execution
            const queries = deleteActions.trim().split(';').filter(query => query);

            // Execute each query in sequence
            (async () => {
                try {
                    for (const query of queries) {
                        await new Promise((resolve, reject) => {
                            connection.query(query, [id], (error, results) => {
                                if (error) return reject(error);
                                resolve(results);
                            });
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            console.error('Error during commit:', err);
                            connection.rollback(() => connection.release());
                            return next(err);
                        }

                        console.log('Transaction completed successfully');
                        connection.release();
                        res.send('Lead and all related data successfully deleted');
                    });
                } catch (error) {
                    console.error('Error during transaction, rolling back:', error);
                    connection.rollback(() => connection.release());
                    next(error);
                }
            })();
        });
    });
};


export const updateLead = (req, res, next) => {
    try {
        // Extract leadId from the request parameters
        const { id ,status} = req.params;

console.log(id,status);

        // Use pool.query for executing the query
        pool.query('UPDATE leads SET status = ? WHERE id = ?', [ status ,id], (error, results) => {

            if (error) {
                console.error('Error in getLead:', error);
                next(error);
                return;
            }
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
        pool.query('INSERT INTO leads (name, customer_account, phone, email, status) VALUES (?, ?, ?, ?, ?)', [leadName, customerAccount, phone, email, status], (error, results) => {
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
        pool.query('SELECT * FROM leads', (error, results, fields) => {
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