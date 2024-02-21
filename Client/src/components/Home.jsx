import React, { useState } from 'react'
import Header from './Header'
import { FaPlus } from "react-icons/fa";
import { GoPin } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Calendar from './Calendar';

//home component
export default function Home() {

  const [leadsArray, setLeadsArray] = useState([]); //array of the leads 
  const [upcoming, setUpcoming] = useState([]);
  const [numberOfLeads,setNumberOfLeads]=useState();
  const navigate = useNavigate();
 


  //use effect to perform fetch to call the leads 
  useEffect(() => {
    fetchData();
    
  }, [])

  const fetchData = async () => {

    try {
      const response = await fetch('https://crm3-vj7r.onrender.com/leads/');
      const data = await response.json();
      console.log(data);

      setLeadsArray(data);
      setNumberOfLeads(data.length);
      

      const upcomingMeeting = data.filter(e => {
        // Ensure e.meeting_data is a valid date string
        const meetingDateTime = new Date(e.meeting_datetime); // Convert to Date object
        const now = new Date(); // Current date and time
        const twoHoursFifteenMinutesLater = new Date(now.getTime() + (2 * 60 * 60 * 1000) + (15 * 60 * 1000)); // Now + 2 hours and 15 minutes
      
        // Check if meeting_datetime is before twoHoursFifteenMinutesLater and send_reminder is 0
        return meetingDateTime < twoHoursFifteenMinutesLater && e.send_reminder === 0;
      });

      console.log('upcomingMeeting',upcomingMeeting);
      setUpcoming(upcomingMeeting);

    } catch (error) {
      console.error('Error fetching leads:', error);
    }

  };




// go to NewLead page when the user click on New botton
  function newLeadPage() {

    navigate('NewLead');
  }


//go to lead information regarding to the lead(row) that user click in 
  const handleRowClick = async (leadId) => {

    navigate('LeadInformation', { state: { leadId } })
  };

  function toCalendar() {

    navigate('Calendar');
  }

  return (
    <div className=' bg-gray-50'>
<Header />
<div className='flex items-center space-x-2 p-2 rounded-lg justify-evenly w-[500px]'>
<button className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-teal-200 ml-2" onClick={newLeadPage}>
              <FaPlus color="#2f855a" size="20px" />
              <div className="text-teal-800 font-bold">New</div>
            </button>
             
             <div className='text-teal-800 font-bold '>
             <div >Number of Leads <span className='bg-teal-800 text-white px-2 rounded-md'>{numberOfLeads}</span></div>
             </div>

             <div className='text-teal-800 font-bold space-x-2 p-2 rounded-lg cursor-pointer hover:bg-teal-200 ml-2' onClick={toCalendar}>Calendar</div>
             </div>
            
<div className='w-full'>
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      
      <div className="relative py-3 sm:mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <div className="flex justify-between items-center mb-8">
           
            <div className="flex space-x-4">
              <GoPin size="30px" color="#2f855a" />
              <h1 className="text-teal-800 font-bold text-4xl">My Opportunities</h1>
            </div>
            <div className="w-full max-w-md">
              <marquee behavior="scroll" direction="left" className="block text-red-700">
                {upcoming.length > 0 ? `Reminder, you have a meeting in 10 min with ${upcoming[0].customer_account}` : "You don't have an upcoming meeting."}
              </marquee>
            </div>
          </div>

          {/* Leads table */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Account</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadsArray.map((lead) => (
                  <tr key={lead.id} className="hover:bg-teal-50 cursor-pointer" onClick={() => handleRowClick(lead.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.customer_account}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50">
                        <option value="new" selected={lead.status === 'new'}>New</option>
                        <option value="quote_given" selected={lead.status === 'quote given'}>Quote Given</option>
                        <option value="advance_paid" selected={lead.status === 'advance paid'}>Advance Paid</option>
                        <option value="full_amount_paid" selected={lead.status === 'full amount paid'}>Full Amount Paid</option>
                        <option value="sale_loss" selected={lead.status === 'sale loss'}>Sale Loss</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

