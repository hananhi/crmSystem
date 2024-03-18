// Import necessary hooks from React and other utility functions and components.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To programmatically navigate between routes
import { signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth'; // Firebase auth function for signing in
import { auth } from '../firebase.js'; // Import the auth object from the Firebase configuration

// Define the Login component
export default function Login() {
  // State hooks to store the email, password, and a flag to indicate if login failed due to incorrect credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notFound, setNotFound] = useState(false);

  // useNavigate hook from react-router-dom to programmatically navigate to different routes
  const navigate = useNavigate();

  // handleLogin function is called when the form is submitted
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Use the signInWithEmailAndPassword function from Firebase to authenticate the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If sign in is successful, userCredential contains information about the logged-in user
        const user = userCredential.user;
        console.log('User logged in:', user); // Log the user information

        const userEmail = user.email;
        console.log("User email:", userEmail);
        // Navigate to the Home page after successful login
        navigate('Home');
      })
      .catch((error) => {
        console.error('Error logging in:', error); // Log any error during the login process
        // Set the notFound flag to true to show an error message to the user
        setNotFound(true);
      });
  };

  // Function to handle password reset request
  const handlePasswordReset = () => {
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        alert("Failed to send password reset email. Please try again.");
      });
  };

  // Function to navigate to the Sign Up page
  const goToSignUp = () => {
    navigate('SignUp');
  };

  // The component renders a form for the user to log in
  return (
    
   
      <div className='w-full h-[400px]'>
    <div className="min-h-screen bg-gray-50 py-3 flex flex-col justify-center sm:py-6">
      
      <div className="relative py-2 sm:mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
      <form className="bg-white rounded-xl drop-shadow-lg space-y-3 py-10 px-4" action="" onSubmit={(e) => handleLogin(e)}>
        <div className="flex justify-center items-center">
          <img src="https://www.expandable.com/assets/img/crm.png" className="w-60 h-60" alt="TelcoSwitch CRM" />
        </div>
        <h1 className="text-center text-3xl text-teal-500 font-bold">Welcome</h1>
        <div className="flex flex-col space-y-1">
          <label className="font-light text-teal-500 " htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-400 "
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-light text-teal-500" htmlFor="password">
            Password
          </label>
          <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400 "
            type="password"
            placeholder="Your Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {notFound && <div className="text-[#ff0000]">Email or Password Incorrect</div>}

<div className='mt-3'>
        <a onClick={handlePasswordReset} className='hover-outline font-bold text-teal-500'>Forgot Password?</a>
        </div>
        <button
          className="w-full px-10 py-2 bg-teal-500 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
          type="submit"
        >
          Log In
        </button>

        <p className="text-right" onClick={goToSignUp}>
          <a className="text-teal-500 text-sm font-light hover:underline" href="/SignUp">
            Don't have an Account? <span className="font-bold">Register Now</span>
          </a>
        </p>
      </form>
    </div>
    </div>
    </div>
  
  );
}
