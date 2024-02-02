import React, { useState ,useEffect} from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from './Header';
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



export default function LeadInformation() {
   
  const [addPackage, setAddPackage] = useState(false);
  const [addActivityLog, setAddActivityLog] = useState(false);
  const [packages, setPackages] = useState([])
  const [activityLogs, setActivityLogs] = useState([]);
  const [Data, setData] = useState({});


  const { state } = useLocation ();
 

  useEffect(() => {
    handleRowClick(state.leadId);
   }, [state.leadId]);
   
   useEffect(() => {
    console.log('use', Data);

  }, [Data]);

  const handleRowClick = async (leadId) => {
    try {
    
      // Fetch lead details
      
      const leadResponse = await fetch(`http://localhost:4000/leads/${leadId}`);
      const leadData = await leadResponse.json();
  
      console.log('im here',leadData);
     
      
     
      // Fetch associated packages
      const packagesResponse = await fetch(`http://localhost:4000/leads/${leadId}/packages`);
      const packagesData = await packagesResponse.json();

    
      console.log('Associated Packages:', packagesData);

      // Fetch associated action logs
      const actionLogsResponse = await fetch(`http://localhost:4000/leads/${leadId}/actionlogs`);
      const actionLogsData = await actionLogsResponse.json();
  
      console.log(leadData)
      setData(leadData)
      console.log('Lead Data:', Data);
      
      setPackages(packagesData);
      setActivityLogs(actionLogsData);
        // Display or handle the retrieved data as needed
      
      console.log('Associated Action Logs:', actionLogsData);
    
    
  
      // You can now use the data to update the UI or display it in a modal, for example.
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  async function deletePackage(id){

    
    try {
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/packages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Assuming you want to update the packages state after deletion
        setPackages((prevPackages) => prevPackages.filter(item => item.id !== id));
        console.log('Package deleted successfully.');
      } else {
        console.error('Failed to delete package data.');
      }
    } catch (error) {
      console.error('Error deleting package', error);
    }

  }


  async function deleteAction(id){
    try {
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/actionlogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Assuming you want to update the packages state after deletion
        setPackages((prevPackages) => prevPackages.filter(item => item.id !== id));
        console.log('Package deleted successfully.');
        window.location.reload()
      } else {
        console.error('Failed to delete package data.');
      }
    } catch (error) {
      console.error('Error deleting package', error);
    }
  }
  

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
  
    if (type === 'package') {
      setNewPackage((prevPackage) => ({
        ...prevPackage,
        [name]: value,
      }));
    } else if (type === 'activityLog') {
      setNewActivityLog((prevActivityLog) => ({
        ...prevActivityLog,
        [name]: value,
      }));
    }
  };

  const handleAddPackage =async () => {

    try {
      // Perform any client-side validation if needed
      
      // Make a POST request to the server to add the package
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/packages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPackage),
      });

      if (response.ok) {
        // Assuming the server responds with the added package
        const addedPackage = await response.json();

        // Update the client-side state with the added package
        setPackages([...packages, addedPackage]);

        // Optionally, you can reset the form or clear the newPackage state
        setNewPackage({
          id: uuidv4(),
          name: '',
          description: '',
          price: '',
        });

        // Optionally, you can close the form or modal
        setAddPackage(false);

        console.log('Package added successfully:', addedPackage);
      } else {
        console.error('Failed to add package data.');
      }
    } catch (error) {
      console.error('Error adding package', error);
    }
  
  };

  const handleAddActivityLog = async() => {
    
    try {
    
      
      // Make a POST request to the server to add the package
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/actionlogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivityLog),
      });

      if (response.ok) {
        // Assuming the server responds with the added package
        const addedlog = await response.json();

        // Update the client-side state with the added package
        setActivityLogs([...activityLogs, addedlog]);

        // Optionally, you can reset the form or clear the newPackage state
        setNewActivityLog({
          id: uuidv4(),
         date: '',
          notes: '',
        });

        // Optionally, you can close the form or modal
        setAddActivityLog(false);

        console.log('Package added successfully:', addedlog);
        window.location.reload()
      } else {
        console.error('Failed to add  data.');
      }
    
    } catch (error) {
      console.error('Error adding ', error);
    }
  
    
  };

  const [newPackage, setNewPackage] = useState({
    id: uuidv4(),
    name: '',
    description: '',
    price: '',
  });
  const [newActivityLog, setNewActivityLog] = useState({
    id: uuidv4(),
    date: '',
    notes: '',
  });


  console.log('im also',Data);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  const handleEditClick = (id, name, description, price) => {
    setEditingId(id);
    setEditedName(name);
    setEditedDescription(description);
    setEditedPrice(price);
  };

  const handleSaveClick =async () => {
    try {
      // Make an API call to update the data on the server
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/packages/${editingId}`, {
        method: 'PATCH', // Assuming you use a PUT request for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          description: editedDescription,
          price: editedPrice,
        }),
      });
  
      if (response.ok) {
        // Update the local state or trigger a data refetch
        // Reset the editing state
        setEditingId(null);
        setEditedName('');
        setEditedDescription('');
        setEditedPrice('');

  window.location.reload();
        console.log('Changes saved successfully!');
      } else {
        console.error('Failed to save changes.');
      }
    
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const [editingLogId, setEditingLogId] = useState(null); // To track the edited log entry
  const [editedLog, setEditedLog] = useState({
    id: '',
    date: '',
    notes: '',
  });
  const [editedDate, setEditedDate] = useState(''); // State for edited date
  const [editedNotes, setEditedNotes] = useState('');
  
  // Function to handle clicking the "Edit" icon
  const handleEditClickAction = (logId, date, notes) => {
    setEditingLogId(logId); // Set the editing flag
    setEditedLog({
      id: logId,
      date: date,
      notes: notes,
    }); // Populate editedLog with the log to be edited
  };
  
  // Function to handle saving changes in the edit form
  const handleSaveEdit = async () => {
    try {
      // Make an API call to update the data on the server
      const response = await fetch(`http://localhost:4000/leads/${state.leadId}/actionlogs/${editingLogId}`, {
        method: 'PATCH', // Assuming you use a PUT request for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedLog),
      });
  
      if (response.ok) {
        // Update the local state or trigger a data refetch
        // Reset the editing state

        setEditingLogId(null);
        setEditedDate('');     // Reset to initial state
        setEditedNotes('');    // Reset to initial state

        window.location.reload();
        console.log('Changes saved successfully!');
      } else {
        console.error('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  
  return (
    <div>
      <Header />
      

      <div className='flex justify-between mt-6 ml-6 '>
        <div className='w-[50%] text-[#3fa277] font-bold text-2xl'>

          <div>{Data.name}</div>
          <div> {Data.id}</div>
          
        </div>

        <div className='flex justify-evenly w-[30%] text-[#3fa277] text-center'>
          <div className='border-r-2 p-3 '>
            <div>Creation date</div>
            <div>{Data.creation_date}</div>
          </div>

          <div className='border-r-2 p-3 '>
            <div>Last modified</div>
            <div>{Data.last_modified}</div>
          </div>

          <div className=' p-3'>
            <div>Status</div>
            <div>New</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col space-y-20 m-10 '>
        <div>
          <div class="text-[#3fa277] p-2 font-bold text-xl">Packages</div>

          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-[#d5f7e8]">
                <th class="w-1/4 p-2 border">Package ID</th>
                <th class="w-1/4 p-2 border">Package Name</th>
                <th class="w-1/4 p-2 border">Description</th>
                <th class="w-1/4 p-2 border">Price</th>
                
              </tr>
            </thead>
            <tbody>
            {packages.map((packageItem) => (
              <tr key={packageItem.id}>
                <td className="border border-slate-400">{packageItem.id}</td>
                <td className="w-1/4 p-2 border">
                  {editingId === packageItem.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    packageItem.name
                  )}
                </td>
                <td className="w-1/4 p-2 border">
                  {editingId === packageItem.id ? (
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    packageItem.description
                  )}
                </td>
                <td className="w-1/4 p-2 border">
                  {editingId === packageItem.id ? (
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                  ) : (
                    packageItem.price
                  )}
                </td>
                <td>
                  {editingId === packageItem.id ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(packageItem.id, packageItem.name, packageItem.description, packageItem.price)}>
                      <FaEdit color='#3fa277' size={'20px'} />
                    </button>
                  )}
                </td>
            
      <th onClick={() => deletePackage(packageItem.id)}>
  <RiDeleteBin6Line color='#3fa277' size={'20px'} />
</th>
                </tr>
              ))}
              {addPackage && (
                <tr>
                  <td className="border border-slate-400">{newPackage.id}</td>
                  <td className="border border-slate-400">
                    <input
                      type="text"
                      name="name"
                      placeholder="Package Name"
                      value={newPackage.name}
                      onChange={(e) => handleInputChange(e, 'package')}
                      className="p-2 border mr-2"
                    />
                  </td>
                  <td className="border border-slate-400">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={newPackage.description}
                      onChange={(e) => handleInputChange(e, 'package')}
                      className="p-2 border mr-2"
                    />
                  </td>
                  <td className="border border-slate-400">
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={newPackage.price}
                      onChange={(e) => handleInputChange(e, 'package')}
                      className="p-2 border mr-2"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4">
            {!addPackage && (
              <button onClick={() => setAddPackage(true)} className="bg-[#3fa277] text-white p-2 rounded">
                Add New Package
              </button>
            )}
            {addPackage && (
              <button onClick={handleAddPackage} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Package
              </button>
            )}
          </div>
        </div>


         <div>
          <div class="text-[#3fa277] p-2 font-bold text-xl">Action Logs</div>

          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-[#d5f7e8]">
                <th class="w-1/4 p-2 border">Action ID</th>
                <th class="w-1/4 p-2 border">Action Date</th>
                <th class="w-1/4 p-2 border">Note</th>
              </tr>
            </thead>
            <tbody>
            {activityLogs.map((log) => (
        <tr key={log.id}>
          <td className="border border-slate-400">{log.id}</td>
          <td className="w-1/4 p-2 border">
            {editingLogId === log.id ? (
              <input
                type="date"
                value={editedLog.date}
                onChange={(e) =>
                  setEditedLog({ ...editedLog, date: e.target.value })
                }
              />
            ) : (
              log.action_date
            )}
          </td>
          <td className="w-1/4 p-2 border">
            {editingLogId === log.id ? (
              <textarea
                value={editedLog.notes}
                onChange={(e) =>
                  setEditedLog({ ...editedLog, notes: e.target.value })
                }
              />
            ) : (
              log.notes
            )}
          </td>
          <td>
            {editingLogId === log.id ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <button
                onClick={() => handleEditClickAction(log.id, log.action_date, log.notes)}
              >
                <FaEdit color="#3fa277" size={'20px'} />
              </button>
            )}
          </td>
          <td onClick={() => deleteAction(log.id)}>
            <RiDeleteBin6Line color="#3fa277" size={'20px'} />
          </td>
        </tr>
      ))}
            </tbody>
          </table>
          <div className="mt-4">
            {!addActivityLog && (
              <button onClick={() => setAddActivityLog(true)} className="bg-[#3fa277] text-white p-2 rounded">
                Add New Activity Log
              </button>
            )}
            {addActivityLog && (
              <button onClick={handleAddActivityLog} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Activity Log
              </button>
            )}
          </div>
        </div>
      </div>
    

       
      </div>
    
  )}