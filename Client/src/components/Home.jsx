import React, { useState } from 'react'
import Header from './Header'
import { FaPlus } from "react-icons/fa";
import { GoPin } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { FaFilter } from 'react-icons/fa';
import { IoCloudUploadOutline } from "react-icons/io5";


const PORT = import.meta.env.VITE_REACT_APP_PORT

//home component
export default function Home() {

  const [leadsArray, setLeadsArray] = useState([]); //array of the leads 
  const [followUps, setFollowUps] = useState([]); //array of the leads 
  const [upcoming, setUpcoming] = useState([]);
  const [numberOfLeads, setNumberOfLeads] = useState();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const [sortDirection, setSortDirection] = useState(false);
 


  //use effect to perform fetch to call the leads 
  useEffect(() => {
    fetchData();
    fetchFollowUps();
  }, [])

  const fetchFollowUps = async () => {

    try {

      const response = await fetch(`https://crmsystem-y80u.onrender.com:${PORT}/followUps`);
      const data = await response.json();
      console.log(data);

      setFollowUps(data);
      //const upcomingFollows=data.filter(follow=> current data (start time )<follow.scheduled_time < current time )

    }
    catch (error) {

      console.error('Error fetching followUps:', error);
    }
  }

  const fetchData = async () => {

    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com:${PORT}/leads/`);
      const data = await response.json();
      console.log(data);

      setLeadsArray(data);
      setNumberOfLeads(data.length);
      setAllLeads(data);


      const upcomingMeeting = data.filter(e => {
        // Ensure e.meeting_data is a valid date string
        const meetingDateTime = new Date(e.meeting_datetime); // Convert to Date object
        const now = new Date(); // Current date and time
        const twoHoursFifteenMinutesLater = new Date(now.getTime() + (2 * 60 * 60 * 1000) + (15 * 60 * 1000)); // Now + 2 hours and 15 minutes

        // Check if meeting_datetime is before twoHoursFifteenMinutesLater and send_reminder is 0
        return meetingDateTime < twoHoursFifteenMinutesLater && e.send_reminder === 0;
      });

      console.log('upcomingMeeting', upcomingMeeting);
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


  const [allLeads, setAllLeads] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchValue = search.trim().toLowerCase();
      if (searchValue) {
        const filteredData = allLeads.filter(lead =>
          lead.customer_account.toLowerCase().includes(searchValue)
        );
        setLeadsArray(filteredData);
      } else {
        setLeadsArray(allLeads); // If search is empty, reset to all leads
      }
    }, 300); // 300 ms delay

    return () => clearTimeout(handler); // Cleanup timeout on effect cleanup
  }, [search, allLeads]);

  const handleStatusChange = async (e, leadId) => {
    const newStatus = e.target.value;

    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com/leads/${leadId}/${newStatus}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful response

      console.log('success');

    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const leadFields = ['name', 'phone', 'email', 'creation_date', 'last_modified', 'status', 'customer_account', 'meeting_datetime', 'send_reminder'];


  function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);

        console.log(parsedData);


        const transformedData = parsedData.map(row => ({
          name: row['name'],
          email: row['email'],
          status: row['status'] || 'new',
          phone: row['phone'],
          customer_account: row['customer_account'],

        }));

        console.log(transformedData);

        converExcel(transformedData)
      };
      reader.readAsBinaryString(file);
    }
  }


  const converExcel = async (transformedData) => {

    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com/excel/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData)
      });

      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful response

      console.log('success');

    } catch (error) {
      console.error("Failed to submit form:", error);
    }

  }
  const [activeTab, setActiveTab] = useState('opportunities');
  const title = activeTab === 'opportunities' ? 'My Opportunities' : 'Follow Ups';


  const deleteLead=async(leadId)=>{

    console.log(leadId);
    try {
      const response = await fetch(`http://localhost:4000/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
       
        console.log(response);
        window.location.reload();
        console.log('lead deleted successfully.');
      } else {
        console.error('Failed to delete lead data.');
      }
    } catch (error) {
      console.error('Error deleting lead', error);
    }
  }

    const handleFilter=(filterValue)=>{

      console.log(filterValue);

      if (filterValue === 'All') {
        setLeadsArray(leadsArray); 

      } else {
       
        let filterArray = leadsArray.filter(lead => lead.status.toLowerCase() == filterValue.toLowerCase());
        console.log(filterArray);
        setLeadsArray(filterArray);
      }
      
        }
      

  return (
    <div className=' bg-gray-50 min-h-screen'>
      <Header />
      <div className='md:flex items-center space-x-2 p-2 rounded-lg justify-evenly w-full'>
        <button className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-teal-200 ml-2" onClick={newLeadPage}>
          <FaPlus color="#2f855a" size="20px" />
          <div className="text-teal-800 font-bold">New</div>
        </button>

        <div className='text-teal-800 font-bold '>
          <div >Number of Leads <span className='bg-teal-800 text-white px-2 rounded-md'>{numberOfLeads}</span></div>
        </div>

        <div className='text-teal-800 font-bold space-x-2 p-2 rounded-lg cursor-pointer hover:bg-teal-200 ml-2' onClick={toCalendar}>Calendar</div>

        <div class="flex-grow flex md:max-w-xs lg:max-w-sm xl:max-w-md">
          <input type="text" id="searchInput" placeholder="Search by customer name..." onChange={(e) => setSearch(e.target.value)}
            class="flex-1 p-2 rounded border-2 border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-500 w-[400px]" />

        </div>
        <div >
    <label for="file-upload" class="flex justify-evenly items-center p-1 border-2 border-teal-800 font-bold rounded-md shadow-sm bg-white cursor-pointer hover:border-teal-400">
    <IoCloudUploadOutline size={'20px'} style={{ color: 'teal' }} />
        <span class="text-center text-teal-800 ml-1">Upload a file</span>
        <input id="file-upload" type="file" accept=".xlsx, .xls" class="hidden" onChange={(e) => handleFileUpload(e)} />
    </label>
</div>
      </div>

      <div className='w-full  '>
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 ">

          <div className="relative py-3 sm:mx-auto min-h-screen min-w-[1050px]">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
            <div className="relative min-h-screen px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">

            <div className="max-w-[300px]  ml-[700px] min-w-[300px]">
  <ul className="text-sm font-medium text-center rounded-lg shadow flex">
    <li className="w-full">
      <button
        onClick={() => setActiveTab('opportunities')}
        className={`inline-block w-full p-3 rounded-l-lg ${activeTab === 'opportunities' ? 'text-white bg-gradient-to-r from-green-500 to-teal-500' : 'text-teal-500 hover:text-white hover:bg-teal-500'}`}
      >
         Opportunities
      </button>
    </li>
    <li className="w-full">
      <button
        onClick={() => setActiveTab('followUps')}
        className={`inline-block w-full p-3 rounded-r-lg ${activeTab === 'followUps' ? 'text-white bg-gradient-to-r from-green-500 to-teal-500' : 'text-teal-500 hover:text-white hover:bg-teal-500'}`}
      >
        Follow Ups
      </button>
    </li>
  </ul>
</div>

              <div className="flex justify-between items-center mb-8">

                <div className="flex space-x-4">
                  <GoPin size="30px" color="#2f855a" />
                  <h1 className="text-teal-800 font-bold text-4xl }">{title}</h1>
                </div>
                <div className="w-full max-w-md">
                  <marquee behavior="scroll" direction="left" className="block text-red-700">
                    {upcoming.length > 0 ? `Reminder, you have a meeting in 10 min with ${upcoming[0].customer_account}` : "You don't have an upcoming meeting."}
                  </marquee>
                </div>
              </div>

              {activeTab === 'opportunities' && (
                <div>

                  <div className="overflow-x-auto " style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lead Name</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Account</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                          <th className=" relative px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Status <FaFilter  className="inline cursor-pointer ml-8" onClick={()=>setSortDirection(!sortDirection)} />
                          
                    { sortDirection && <div className='absolute mt-3 bg-teal-100 p-1 rounded-md min-h-40'>

                    <div className="flex items-center mb-4">
        <input id="radio-1" name="filterStatus" type="radio" value="All" onClick={()=>handleFilter('All')}/>
        <label htmlFor="radio-1" className="ml-2 normal-case ">All</label>
      </div>
                      
                      <div className="flex items-center mb-4">
        <input id="radio-1" name="filterStatus" type="radio" value="new" onClick={()=>handleFilter('new')}/>
        <label htmlFor="radio-1" className="ml-2 normal-case ">New</label>
      </div>
      
      <div class="flex items-center mb-4">
        <input id="radio-2" name="filterStatus" type="radio" value="Quote Given" onClick={()=>handleFilter('Quote Given')} />
        <label htmlFor="radio-3" className="ml-2 normal-case ">Quote Given</label>
      </div>
      
      <div class="flex items-center mb-4">
        <input id="radio-3" name="filterStatus" type="radio" value="advanced paid" onClick={()=>handleFilter('advance Paid')} />
        <label htmlFor="radio-3" className="ml-2 normal-case">Advanced Paid</label>
      </div>
      
      <div class="flex items-center mb-4">
        <input id="radio-4" name="filterStatus" type="radio" value="Full Amount Paid" onClick={()=>handleFilter('Full Amount Paid')} />
        <label htmlFor="radio-4" class="ml-2 normal-case ">Full Amount Paid</label>
      </div>

      <div class="flex items-center mb-4">
        <input id="radio-4" name="filterStatus" type="radio" value="saleloss" onClick={()=>handleFilter('sale loss')} />
        <label htmlFor="radio-4" class="ml-2 normal-case ">Sale loss</label>
      </div>

      
                      </div>
}
                          </th>
                        </tr>
                      
                     
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 min-h-[500px]">
                        {leadsArray.map((lead) => (
                          <tr key={lead.id} className="hover:bg-teal-50 cursor-pointer" onClick={() => handleRowClick(lead.id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.customer_account}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                              <select className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleStatusChange(e, lead.id)}>

                                <option value="new" selected={lead.status === 'new'}>New</option>
                                <option value="quote_given" selected={lead.status === 'quote given'}>Quote Given</option>
                                <option value="advance_paid" selected={lead.status === 'advance paid'}>Advance Paid</option>
                                <option value="full_amount_paid" selected={lead.status === 'full amount paid'}>Full Amount Paid</option>
                                <option value="sale_loss" selected={lead.status === 'sale loss'}>Sale Loss</option>
                              </select>
                            </td>


                            <td className="py-4 px-6">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  text-grey rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                <FiEdit2 />
              </button>

            </td>
                 <td className="py-4 px-6">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-600 hover:bg-red-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out" 
              onClick={(e) => {
                e.stopPropagation(); // Stop the event from propagating first
                deleteLead(lead.id); // Then call your deleteLead function with the lead id
              }}
              >
                <RiDeleteBin6Line size="16px" />
              </button>

            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}


              {/* Content based on active sheet */}
              {activeTab === 'followUps' && (
                <div>

                  <div>
                    <table className='sm:mx-auto w-full divide-y divide-gray-200' >
                      <thead className="bg-gray-50">
                        <tr>

                          <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                            Scheduled Time
                          </th>
                          <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                            FollowUp Type
                          </th>
                          <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                            Updated At
                          </th>
                          <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                            Customer Name
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {followUps.map((followUp) => (
                          
                          <tr key={followUp.id} className="hover:bg-teal-100">
                             <td className="px-5 py-5 border-b border-gray-200 text-sm">
                              {followUp.customer_name}
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-500">
                              {followUp.scheduled_time}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-500">
                              {followUp.follow_up_type}
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-500">
                              {followUp.updated_at}
                            </td>

                            <td className="py-4 px-6">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  text-grey rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                <FiEdit2 />
              </button>

            </td>
                            <td className="py-4 px-6">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-red-600 hover:bg-red-700 text-white rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                <RiDeleteBin6Line size="16px" />
              </button>

              
            </td>

                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

