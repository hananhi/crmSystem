import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LeadInformation from './components/LeadInformation';
import NewLead from './components/NewLead';
import Calendar from './components/Calendar';


function App() {
  

  return (
    
     <div>

<BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/SignUp' element={<SignUp />}/>
          <Route path='Home' element={<Home />}/>
          <Route path='Home/LeadInformation' element={<LeadInformation />}/>
          <Route path='Home/NewLead' element={<NewLead />}/>
          <Route path='Home/Calendar' element={<Calendar />}/>
          
        
          
        </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
