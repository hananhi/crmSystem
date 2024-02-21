// Import necessary hook from React for state management
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the NewLead component
export default function NewLead() {
  // State hook for managing lead data as an object

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadData, setLeadData] = useState({
    leadName: '',
    customerAccount: '',
    phone: '',
    email: '',
    creationDate: '',
    lastModified: '',
    status: 'new', // Default status set to 'new'
  });

  const navigate = useNavigate();
  // handleChange function updates the leadData state based on form input changes
  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  // handleSubmit function to process the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission action

    setIsSubmitting(true);
    // Logging the current state to demonstrate form submission handling
    console.log('Lead data submitted:', leadData);

    try {
      // Attempt to POST the leadData to a server endpoint
      const response = await fetch('https://crm3-vj7r.onrender.com/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadData }), // Send leadData as JSON payload
      });

      if (response.ok) {
        // If the POST request is successful, parse the JSON response
        const data = await response.json();
        console.log(data);
        navigate('/Home')
        // Here you can update the state with the received data, or redirect the user, etc.
      } else {
        // Log an error if the server response is not OK (e.g., 4XX or 5XX status codes)
        console.error('Failed to add lead:', response.status);
      }
    } catch (error) {
      // Catch and log any errors in the fetch operation
      console.error('Error adding lead:', error);
    }
    finally {
      // Re-enable the submit button after a delay, regardless of request outcome
      setTimeout(() => setIsSubmitting(false), 5000);
    }
  };

  // Render the NewLead form component

  return (
    <div>

      <div className="max-w-xl mx-auto  mt-8 p-4 border bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-[#3fa277] text-center">Create New Lead</h2>
        <form onSubmit={handleSubmit} className='  flex flex-wrap space-x-4 p-2'>
          {/* Lead Name */}
          <div className="mb-4 ml-4">
            <label htmlFor="leadName" className="block text-sm font-medium text-gray-600">Lead Name:</label>
            <input type="text" id="leadName" name="leadName" onChange={handleChange} value={leadData.leadName} className="mt-1 p-2 border w-full" required />
          </div>

          {/* customer Account */}
          <div className="mb-4">
            <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-600">Customer Account:</label>
            <input type="text" id="customerAccount" name="customerAccount" onChange={handleChange} value={leadData.customerAccount} className="mt-1 p-2 border w-full" required />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number:</label>
            <input type="tel" id="phone" name="phone" onChange={handleChange} value={leadData.phone} className="mt-1 p-2 border w-full" required />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={leadData.email} className="mt-1 p-2 border w-full" required />
          </div>

          {/* Creation Date */}
          <div className="mb-4">
            <label htmlFor="creationDate" className="block text-sm font-medium text-gray-600">Creation Date:</label>
            <input type="date" id="creationDate" name="creationDate" onChange={handleChange} value={leadData.creationDate} className="mt-1 p-2 border w-full" required />
          </div>



          <div className="mb-4">
            <label htmlFor="PaymentDate" className="block text-sm font-medium text-gray-600">Payment Date</label>
            <input type="date" id="lastModified" name="lastModified" onChange={handleChange} value={leadData.lastModified} className="mt-1 p-2 border w-full" required />
          </div>
          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status:</label>
            <select id="status" name="status" onChange={handleChange} value={leadData.status} className="mt-1 p-2 border w-full" required>
              <option value="new">New</option>
              <option value="quote_given">Quote Given</option>
              <option value="advance_paid">Advance Paid</option>
              <option value="full_amount_paid">Full Amount Paid</option>
              <option value="sale_loss">Sale Loss</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-[#3fa277] text-white p-2 rounded hover:bg-[#3fa277] "  disabled={isSubmitting}> {isSubmitting ? 'Adding new Lead...' : 'Create'}</button>

        
        </form>
      </div>

    </div>
  )
}
