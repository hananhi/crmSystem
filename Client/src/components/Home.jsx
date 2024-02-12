import React, { useState } from 'react'
import Header from './Header'
import { FaPlus } from "react-icons/fa";
import { GoPin } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//home component
export default function Home() {

  const [leadsArray, setLeadsArray] = useState([]); //array of the leads 
  const navigate = useNavigate();
 

  //use effect to perform fetch to call the leads 
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {

    try {
      const response = await fetch('http://localhost:4000/leads/');
      const data = await response.json();
      console.log(data);

      setLeadsArray(data);
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

  return (

    <div>
      <Header />
      <div className=' flex '>
        <div className='flex  hover:bg-[#d5f7e8] ml-3 p-2'>
          <FaPlus color='#3fa277' size={'20px'} />
          <div className='text-[#3fa277] font-bold ml-1' onClick={newLeadPage}>New</div>
        </div>
      </div>

      <div className='flex justify-between mt-6 ml-6'>
        <div className='flex '><GoPin size={'30px'} color='#3fa277 ' className='mt-2 mr-2' />
          <div className='text-[#3fa277] font-bold text-4xl'>My Opportiontes </div>
        </div>
        <div className="relative block w-[600px] mr-6 mt-2">
        <marquee width="90%" direction="left" height="100px">
Reminder , you have meeting after 10 min with 
</marquee>
        </div>
      </div>
{/* the table of the leads */}
      <div>
        <table class="border-collapse border border-slate-400 w-full mt-7">
          <thead>
            <tr>
              <th class="border border-slate-400 ...">Lead Name</th>
              <th class="border border-slate-400 ...">Customer Account</th>
              <th class="border border-slate-400 ...">Email</th>
              <th class="border border-slate-400 ...">Phone Number</th>
              <th class="border border-slate-400 ...">Status</th>
            </tr>
          </thead>
          <tbody>
            {leadsArray.map(lead => (
              <tr
                className='hover:bg-[#d5f7e8]'
                key={lead.id}
                onClick={() => handleRowClick(lead.id)}>
                <td className="border border-slate-400">{lead.name}</td>
                <td className="border border-slate-400">{lead.customer_account}</td>
                <td className="border border-slate-400">{lead.email}</td>
                <td className="border border-slate-400">{lead.phone}</td>
                <td className="border border-slate-400">
                  <select className='w-[100%]'>
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
  )
}

