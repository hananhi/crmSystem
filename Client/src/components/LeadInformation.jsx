import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
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
  const { state } = useLocation();
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

const id=state.leadId;

  useEffect(() => {
    // Define handleRowClick inside useEffect
   
    const handleRowClick = async (leadId) => {
      setIsLoading(true); // Assume you have a state to track loading
      try {
        // Fetch lead details
        const leadResponse = await fetch(`https://crm3-vj7r.onrender.com/leads/${leadId}`);
        const leadData = await leadResponse.json();
        console.log('Lead data:', leadData);
  
   
   setData(leadData);
        // Fetch associated packages
        const packagesResponse = await fetch(`https://crm3-vj7r.onrender.com/leads/${leadId}/packages`);
        const packagesData = await packagesResponse.json();
        console.log('Associated Packages:', packagesData);
  
        // Fetch associated action logs
        const actionLogsResponse = await fetch(`https://crm3-vj7r.onrender.com/leads/${leadId}/actionlogs`);
        const actionLogsData = await actionLogsResponse.json();
        console.log('Associated Action Logs:', actionLogsData);
  
        // Update state with fetched data

        setPackages(packagesData);
        setActivityLogs(actionLogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Update loading state
      }
    };
  
    // Check if state.leadId is available then call handleRowClick
    if (state.leadId) {
      handleRowClick(state.leadId);
    }
  }, [state.leadId]); // Dependency array includes state.leadId


//delete function for the selected package
  async function deletePackage(id) {

    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/packages/${id}`, {
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

//delete function for the selected action
  async function deleteAction(id) {
    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/actionlogs/${id}`, {
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

//function to handle the inpush change which is in the package or in the actions 
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

  const handleAddPackage = async () => {

    try {
  

      // Make a POST request to the server to add the package
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/packages`, {
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

        
        setNewPackage({
          id: uuidv4(),
          name: '',
          description: '',
          price: '',
        });

        setAddPackage(false);

        console.log('Package added successfully:', addedPackage);
      } else {
        console.error('Failed to add package data.');
      }
    } catch (error) {
      console.error('Error adding package', error);
    }
   };

   //add action log function 
  const handleAddActivityLog = async () => {

    try {


      // Make a POST request to the server to add the action 
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/actionlogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivityLog),
      });

      if (response.ok) {
        // Assuming the server responds with the added action
        const addedlog = await response.json();

        // Update the client-side state with the added action
        setActivityLogs([...activityLogs, addedlog]);

        // reset the form or clear the newAction state
        setNewActivityLog({
          id: uuidv4(),
          date: '',
          notes: '',
        });

        setAddActivityLog(false);

        console.log(' added successfully:', addedlog);
        window.location.reload()
      } else {
        console.error('Failed to add  data.');
      }

    } catch (error) {
      console.error('Error adding ', error);
    }

  };

  //define new package and action when the user want to add package or action
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




  //when the user put edit botton 
  const handleEditClick = (id, name, description, price) => {
    setEditingId(id);
    setEditedName(name);
    setEditedDescription(description);
    setEditedPrice(price);
  };

  const handleSaveClick = async () => {
    try {
      // Make an API call to update the data on the server
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/packages/${editingId}`, {
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
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${state.leadId}/actionlogs/${editingLogId}`, {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    
    // Extract values from the form
    const { title, startDateTime, endDateTime, duration, customerNumber } = event.target.elements;
  
    
    // Prepare formData
    const formData = {
      id: uuidv4(),
      leadId:state.leadId,
      title: title.value,
      startDateTime: startDateTime.value,
      endDateTime: endDateTime.value,
      duration: duration.value,
    
      number: customerNumber.value,
      
    };
  
    try {
      const response = await fetch(`http://localhost:4000/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful response

      setTimeout(() => {
        setShowForm(false);
      }, 2000);

    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };
  
  return (
    <div>
      <Header />
{Data.length > 0 ? (
  
  <div>
  <div className='flex justify-between mt-6 ml-6'>
    <div className='w-[50%] text-teal-500 font-bold text-2xl'>
      {/* Display Opportunity Name */}
      <div>Opportunity Name: {Data[0].name}</div>
    </div>
    <div className='flex flex-col items-center justify-center border-2 border-teal-500 px-3 py-2 mb-8 rounded' onClick={() => setShowForm(true)}>
  <FaVideo className='text-teal-500 text-3xl' /> {/* Adjust text-2xl as needed for size */}
  <div className=' text-teal-500 '>New Meeting</div>
</div>

{showForm && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <form className="bg-white rounded-lg p-8 m-4 max-w-lg w-full space-y-4" onSubmit={handleSubmit}>
      <div className="text-lg font-semibold text-center">Add New Meeting</div>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Meeting Title</label>
        <input type="text" name="title" placeholder="Meeting Title" required 
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
      </div>
      
      <div>
        <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">Start Date & Time:</label>
        <input type="datetime-local" name="startDateTime" required 
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
      </div>
      
      <div>
        <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">End Date & Time:</label>
        <input type="datetime-local" name="endDateTime" required 
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
      </div>
      
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes):</label>
        <input type="number" name="duration" placeholder="Duration in minutes" 
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
      </div>

<div>
  <label htmlFor="customerNumber" className="block text-sm font-medium text-gray-700">customer Number:</label>
  <input type="text" name="customerNumber" placeholder="Enter number" 
         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
</div>
      
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
        Submit
      </button>
    </form>
  </div>
)}


    <div className='flex justify-evenly w-[30%] text-teal-500 text-center'>
      {/* Display Creation Date */}
      <div className='border-r-2 p-3'>
        <div>Creation Date</div>
        <div>{new Date(Data[0].creation_date).toLocaleDateString()}</div>
      </div>

      {/* Display Last Modified Date */}
      <div className='border-r-2 p-3'>
        <div>Last Modified</div>
        <div>{new Date(Data[0].last_modified).toLocaleDateString()}</div>
      </div>

      {/* Display Status */}
      <div className='p-3'>
        <div>Status</div>
        <div>{Data[0].status}</div> {/* Assuming Status is static. If dynamic, use {Data.status} */}
      </div>
    </div>
  </div>
</div>
) : (
<div>Loading...</div>
)}

<div className="p-6 bg-gradient-to-br  from-green-50 to-teal-100 shadow-xl rounded-xl">
  <div className="mb-6 text-teal-800 font-bold text-2xl flex justify-between items-center">
    <span>Packages</span>
   
  </div>

  <div className="overflow-x-auto rounded-lg">
    <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg overflow-hidden">
      <thead className="text-xs text-gray-700 uppercase bg-teal-300">
        <tr>
          <th className="py-3 px-6">Package ID</th>
          <th className="py-3 px-6">Package Name</th>
          <th className="py-3 px-6">Description</th>
          <th className="py-3 px-6">Price</th>
          <th className="py-3 px-6">Actions</th>
          <th className="py-3 px-6">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {packages.map((packageItem) => (
          <tr key={packageItem.id} className="hover:bg-teal-50 transition duration-150 ease-in-out">
            <td className="py-4 px-6">{packageItem.id}</td>
            <td className="py-4 px-6">
              {editingId === packageItem.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="input input-bordered w-full rounded"
                />
              ) : (
                packageItem.name
              )}
            </td>
            <td className="py-4 px-6">
              {editingId === packageItem.id ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="textarea textarea-bordered w-full rounded"
                />
              ) : (
                packageItem.description
              )}
            </td>
            <td className="py-4 px-6">
              {editingId === packageItem.id ? (
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="input input-bordered w-full rounded"
                />
              ) : (
                packageItem.price
              )}
            </td>
            <td className="py-4 px-6">
              {editingId === packageItem.id ? (
                <button
                  onClick={handleSaveClick}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-green-600 hover:bg-green-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(packageItem.id, packageItem.name, packageItem.description, packageItem.price)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-500 hover:bg-blue-600 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
                >
                  <FaEdit size="16px" />
                </button>
              )}
            </td>
            <td className="py-4 px-6">
              <button
                onClick={() => deletePackage(packageItem.id)}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-600 hover:bg-red-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                <RiDeleteBin6Line size="16px" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   
  </div>
  <div className='mt-4 flex justify-end'>
  {!addPackage ? (
      <button
        onClick={() => setAddPackage(true)}
        className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:-translate-y-1 shadow"
      >
        Add New Package
      </button>
    ) : (
      <button
        onClick={handleAddPackage}
        className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:-translate-y-1 shadow"
      >
        Save Package
      </button>
    )}
    </div>
  </div>



  <div className="p-6 bg-gradient-to-br bg-teal-100 shadow-xl rounded-xl">
  <div className="mb-6 text-teal-800 font-bold text-2xl">Action Logs</div>

  <div className="overflow-x-auto rounded-lg">
    <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg overflow-hidden">
      <thead className="text-xs text-gray-700 uppercase bg-teal-300">
        <tr>
          <th className="py-3 px-6">Action ID</th>
          <th className="py-3 px-6">Action Date</th>
          <th className="py-3 px-6">Note</th>
          <th className="py-3 px-6">Edit</th>
          <th className="py-3 px-6">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {activityLogs.map((log) => (
          <tr key={log.id} className="hover:bg-teal-50 transition duration-150 ease-in-out">
            <td className="py-4 px-6">{log.id}</td>
            <td className="py-4 px-6">
              {editingLogId === log.id ? (
                <input
                  type="date"
                  value={editedLog.date}
                  onChange={(e) => setEditedLog({ ...editedLog, date: e.target.value })}
                  className="input input-bordered w-full rounded"
                />
              ) : (
                log.action_date
              )}
            </td>
            <td className="py-4 px-6">
              {editingLogId === log.id ? (
                <textarea
                  value={editedLog.notes}
                  onChange={(e) => setEditedLog({ ...editedLog, notes: e.target.value })}
                  className="textarea textarea-bordered w-full rounded"
                />
              ) : (
                log.notes
              )}
            </td>
            <td className="py-4 px-6">
              {editingLogId === log.id ? (
                <button
                  onClick={handleSaveEdit}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-green-600 hover:bg-green-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClickAction(log.id, log.action_date, log.notes)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-500 hover:bg-blue-600 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
                >
                  <FaEdit size="16px" />
                </button>
              )}
            </td>
            <td className="py-4 px-6">
              <button
                onClick={() => deleteAction(log.id)}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-600 hover:bg-red-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                <RiDeleteBin6Line size="16px" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-4 flex justify-end">
    {!addActivityLog ? (
      <button
        onClick={() => setAddActivityLog(true)}
        className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:-translate-y-1 shadow"
      >
        Add New Activity Log
      </button>
    ) : (
      <button
        onClick={handleAddActivityLog}
        className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:-translate-y-1 shadow"
      >
        Save Activity Log
      </button>
    )}
  </div>
</div>
</div>



  )
}