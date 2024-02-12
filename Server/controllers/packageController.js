import pool from '../server.js';

//get package endpoint
export const getPackages =async (req,res,next)=>{

    const id = req.params.id; // Corrected from req.params

    console.log(id);
    try {
        // Use pool.query for executing the query
        pool.query('SELECT * FROM packages WHERE lead_id = ?', [id], (error, results, fields) => {
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
        console.error('Error in getPackages:', error);
        next(error);
    }


}

//add package endpoint
export const addPackage =async (req,res,next)=>{

    const leadId = req.params.id;
  const newPackage = req.body; // Assuming the new package details are sent in the request body

  console.log(leadId,newPackage);

  console.log('New Package:', newPackage);

  try {
    // Use pool.query for executing the INSERT query
    pool.query(
      'INSERT INTO packages (id, lead_id, name, description, price) VALUES (?, ?, ?, ?, ?)',
      [newPackage.id, leadId, newPackage.name, newPackage.description, newPackage.price],
      (error, results, fields) => {
        if (error) {
          console.error('Error adding package:', error);
          next(error);
          return;
        }
  
        // Get the added package's ID from the results
        const newPackageId = results.insertId;
  
        // Include the new package ID in the response
        const addedPackage = { id: newPackageId, lead_id: leadId, ...newPackage };
  
        // Send the added package as a JSON response
        res.status(201).json(addedPackage);
      }
    );
  } catch (error) {
    console.error('Error adding package:', error);
    next(error);
  }

}

//delete package endpoint
export const deletePackage = async (req, res, next) => {
    const leadId = req.params.id;
    const packageId = req.params.packageId;

    try {
        console.log('Attempting to delete package with leadId:', leadId, 'and packageId:', packageId);

        // Use pool.query for executing the DELETE query
        pool.query(
            'DELETE FROM packages WHERE lead_id = ? AND id = ?',
            [leadId, packageId],
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
                    console.error('Package not found:', leadId, packageId);
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
};


export const editPackage= async(req,res,next)=>{

    const leadId = req.params.id;
    const packageId = req.params.packageId;
    console.log(leadId,packageId);
   

    try {
        // Assuming you have the updated package details in req.body
        const { name, description, price } = req.body;
        console.log(name, description, price);
    
        // Perform a database update query based on the received data
        // Update the table and columns according to your database structure

    
        // Use pool.query to execute the update query
        pool.query(
          `
          UPDATE packages
          SET name = ?, description = ?, price = ?
          WHERE lead_id = ? AND id = ?;
        `,
          [name, description, price, leadId, packageId],
          (error, results, fields) => {
            if (error) {
              console.error('Error updating package:', error);
              next(error);
              return;
            }
    
            // Handle the success case
    
            res.status(200).json({ message: 'Package updated successfully' });
          }
        );
        
      } catch (error) {
        console.error('Error updating package:', error);
        next(error);
      }
}