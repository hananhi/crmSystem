import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import LeadInformation from './components/LeadInformation';
import NewLead from './components/NewLead';
function App() {
  

  return (
    
     <div>

<BrowserRouter>
      
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="SignUp" element={<SignUp />} />
  <Route path="Home" element={<Home />}>
    <Route path="LeadInformation" element={<LeadInformation />} />
    <Route path="NewLead" element={<NewLead />} />
  </Route>
</Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
