import pool from '../server.js';

export const interExcel =async (req,res,next)=>{
    const  excelLeads = req.body;
    console.log(req.body);
 
    try {
        excelLeads.forEach(lead => {
            const query = 'INSERT INTO leads (name, email, status, phone, customer_account ) VALUES (?, ?, ?, ?, ?)';
            const values = [lead.name, lead.email, lead.status, lead.phone, lead.customer_account ];
    
            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error inserting lead:', error);
                } else {
                    console.log('Lead inserted successfully:', results.insertId);
                }
            });
        });
        
    } catch (error) {
        console.log(error);
    }
       
    }
    
