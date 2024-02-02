import React ,{useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';


export default function SignUp() {
    const navigate = useNavigate();
  
  const [newemail,setnewemail]=useState('');
  const[newPassword,setnewpassword]=useState('');
  const [found, setfound]=useState(false)

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, newemail, newPassword)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('User Sign up:', user);

        // Redirect to the Home page or perform other actions as needed
        navigate('/');
      })
      .catch((error) => {
        console.error('Error sighn up :', error);
        // Handle login error and show user feedback
        setfound(true);
      });
  };

  
  return (
    

      <div className="w-screen h-screen flex justify-center items-center
    bg-white">
        <form className=" bg-white rounded-xl drop-shadow-lg space-y-5  py-20 px-5 " action="" onSubmit={handleSignUp}>
        <div class="flex justify-center items-center">
  <img src="https://www.uctoday.com/wp-content/uploads/2018/10/TelcoSwitch-CRM.png" class="w-60 h-60" alt="TelcoSwitch CRM"/>
</div>
            <h1 className="text-center text-3xl text-[#3fa277] font-bold">Create New Account</h1>

            {found && <div className='text-[#ff0000]  text-center'> This user already have account</div>}
           
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
  

            <button className="w-full px-10 py-2 bg-[#3fa277] text-white rounded-md " type="submit" >
                Sign Up
            </button>

        </form>
    </div>

    
  )
}
