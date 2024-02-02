import React ,{useState} from 'react'

import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const navigate = useNavigate();
    const [userName,setusername]=useState('');
  const [newemail,setnewemail]=useState('');
  const[newPassword,setnewpassword]=useState('');
  const [found, setfound]=useState(false)

  async function returnback (event){
        const form = event.target.form;
        event.preventDefault();

  if (form.checkValidity()) {

    try {
        
        const response= await fetch('https://catch-park.onrender.com/auth/signUp' , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  userName, newemail,newPassword })

        })
        const result = await response.json();
        // let result;
         
console.log('im here ',  result);
console.log(result);
        if (response.ok) {
          console.log('User registered successfully');
          navigate('/Login');
          // Update UI or navigate to the next page
        } else {
          console.error('Failed to signup:', result.message);
          setfound(true);
          
        }
      } catch (error) {
        navigate('/Login');
      }
    }
   else {
    // Prevent the form submission if it's not valid
    event.preventDefault();
    alert('Please fill in all required fields.');
  }

      
    }
  return (
    
      <div className="w-screen h-screen flex justify-center items-center
    bg-white">
        <form className=" bg-white rounded-xl drop-shadow-lg space-y-5  py-20 px-5 " action="">
        <div class="flex justify-center items-center">
  <img src="https://www.uctoday.com/wp-content/uploads/2018/10/TelcoSwitch-CRM.png" class="w-60 h-60" alt="TelcoSwitch CRM"/>
</div>
            <h1 className="text-center text-3xl text-[#3fa277] font-bold">Create New Account</h1>

            {found && <div className='text-[#ff0000]  text-center'> This user already have account</div>}
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#3fa277]" for="email">UserName</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400"  placeholder="Your Username" onChange={e=>setusername(e.target.value)}required/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#3fa277]" for="email">Email</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="email" placeholder="Your Email"
                    name="email" id="email"  onChange={e=>setnewemail(e.target.value)}required/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#3fa277]" for="password">Password</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password"
                    placeholder="Your Password" onChange={e=>setnewpassword(e.target.value)} required/>
            </div>
  

            <button className="w-full px-10 py-2 bg-[#3fa277] text-white rounded-md " type="submit" onClick={(e)=>returnback(e)}>
                Sign Up
            </button>

        </form>
    </div>

    
  )
}
