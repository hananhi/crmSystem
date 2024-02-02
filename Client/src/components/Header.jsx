import React from 'react'


export default function Header() {
  return (
    <div className="bg-[#3fa277] p-[1%]  flex flex-row justify-between ">

    <div className='text-white font-bold mt-1 text-3xl'>CRM System</div>
    


    <div class=" flex ">
      <div className='mr-4 text-white mt-2'>UserName</div>
    <img class="h-10 w-10 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
  </div>
  
          </div>
  )
}
