// Import necessary React hooks and utilities
import React, { useState } from 'react'; // Importing React and the useState hook for state management
import { useNavigate } from 'react-router-dom'; // To programmatically navigate between routes
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth function for creating a new user
import { auth } from '../firebase.js'; // Import the auth object from the Firebase configuration

// Define the SignUp component
export default function SignUp() {
  const navigate = useNavigate(); // useNavigate hook for navigating to different routes

  // State hooks for storing user input and a flag to indicate if the user already exists
  const [newemail, setnewemail] = useState('');
  const [newPassword, setnewpassword] = useState('');
  const [found, setfound] = useState(false); // Initially false, indicating no error in account creation

  // handleSignUp function is executed when the form is submitted
  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use the createUserWithEmailAndPassword function from Firebase to create a new user account
    createUserWithEmailAndPassword(auth, newemail, newPassword)
      .then((userCredential) => {
        // If the account is created successfully, userCredential contains information about the new user
        const user = userCredential.user;
        console.log('User Sign up:', user); // Log the new user's information

        // Navigate to the Home page after successful account creation
        navigate('/');
      })
      .catch((error) => {
        console.error('Error sign up :', error); // Log any error during the account creation process
        // Set the found flag to true to show an error message to the user
        setfound(true);
      });
  };

  // The component renders a form for the user to sign up
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
