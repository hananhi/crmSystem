import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('User logged in:', user);

        // Redirect to the Home page or perform other actions as needed
        navigate('Home');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        // Handle login error and show user feedback
        setNotFound(true);
      });
  };

  const goToSignUp = () => {
    navigate('SignUp');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <form className="bg-white rounded-xl drop-shadow-lg space-y-5 py-20 px-5" action="" onSubmit={(e) => handleLogin(e)}>
        <div className="flex justify-center items-center">
          <img src="https://www.uctoday.com/wp-content/uploads/2018/10/TelcoSwitch-CRM.png" className="w-60 h-60" alt="TelcoSwitch CRM" />
        </div>
        <h1 className="text-center text-3xl text-[#3fa277] font-bold">Welcome</h1>
        <div className="flex flex-col space-y-2">
          <label className="font-light text-[#3fa277]" htmlFor="email">
            Email
          </label>
          <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-light text-[#3fa277]" htmlFor="password">
            Password
          </label>
          <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
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

        <button
          className="w-full px-10 py-2 bg-[#3fa277] text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
          type="submit"
        >
          Log In
        </button>

        <p className="text-right" onClick={goToSignUp}>
          <a className="text-[#3fa277] text-sm font-light hover:underline" href="/SignUp">
            Don't have an Account? <span className="font-bold">Register Now</span>
          </a>
        </p>
      </form>
    </div>
  );
}
