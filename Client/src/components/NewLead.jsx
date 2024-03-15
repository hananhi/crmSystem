// Import necessary hook from React for state management
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useTranslation } from 'react-i18next';

// Define the NewLead component
export default function NewLead() {
  // State hook for managing lead data as an object

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [t,i18n]=useTranslation('global');
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
<Header/>
<div className="max-w-xl mx-auto mt-8 p-4 border bg-white rounded shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-teal-500 text-center">{t('newLead.createNewLead')}</h2>
  <form onSubmit={handleSubmit} className='flex flex-wrap space-x-4 p-2'>
    {/* Lead Name */}
    <div className="mb-4 ml-4">
      <label htmlFor="leadName" className="block text-sm font-medium text-gray-600">{t('newLead.leadName')}</label>
      <input type="text" id="leadName" name="leadName" onChange={handleChange} value={leadData.leadName} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Customer Account */}
    <div className="mb-4">
      <label htmlFor="customerAccount" className="block text-sm font-medium text-gray-600">{t('newLead.customerAccount')}</label>
      <input type="text" id="customerAccount" name="customerAccount" onChange={handleChange} value={leadData.customerAccount} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Phone Number */}
    <div className="mb-4">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-600">{t('newLead.phoneNumber')}</label>
      <input type="tel" id="phone" name="phone" onChange={handleChange} value={leadData.phone} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">{t('newLead.email')}</label>
      <input type="email" id="email" name="email" onChange={handleChange} value={leadData.email} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Creation Date */}
    <div className="mb-4">
      <label htmlFor="creationDate" className="block text-sm font-medium text-gray-600">{t('newLead.creationDate')}</label>
      <input type="date" id="creationDate" name="creationDate" onChange={handleChange} value={leadData.creationDate} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Payment Date */}
    <div className="mb-4">
      <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-600">{t('newLead.paymentDate')}</label>
      <input type="date" id="paymentDate" name="paymentDate" onChange={handleChange} value={leadData.paymentDate} className="mt-1 p-2 border w-full" required />
    </div>

    {/* Status */}
    <div className="mb-4">
      <label htmlFor="status" className="block text-sm font-medium text-gray-600">{t('newLead.status')}</label>
      <select id="status" name="status" onChange={handleChange} value={leadData.status} className="mt-1 p-2 border w-full" required>
  <option value="new">{t('newLead.options.new')}</option>
  <option value="quote_given">{t('newLead.options.quote_given')}</option>
  <option value="advance_paid">{t('newLead.options.advance_paid')}</option>
  <option value="full_amount_paid">{t('newLead.options.full_amount_paid')}</option>
  <option value="sale_loss">{t('newLead.options.sale_loss')}</option>
</select>

    </div>

    {/* Submit Button */}
    <button type="submit" className="bg-teal-500 text-white p-2 rounded hover:bg-[#3fa277]" disabled={isSubmitting}>
      {isSubmitting ? t('submitButton.submitting') : t('submitButton.create')}
    </button>
  </form>
</div>
</div>
  )
}
