import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Personal from './Pages/Personal';
import Education from './Pages/Education';
import Work from './Pages/Work';
import Declaration from './Pages/Declaration';
import Motivation from './Pages/Motivation';
import ResumeTemplate from './Components/template';
import LoginPage from './old/components/Login';
import RegistrationPage from './old/components/Registration';
import Create from './old/components/Create';
import Admin from './old/components/Admin';
import ResumeState from './context/ResumeContext';
import Header from './old/components/Header';
import Resume from './Components/resume';
import MotivationLetter from './Components/motivationletter';
import FilteredResume from './Components/filteredresume';
import MotivationLetterEdit from './Components/motivationedit';
import AdminLoginPage from './Pages/adminlogin';
import AdminRegistrationPage from './Pages/adminregister';
import ForgotPassword from './Pages/forgotpassword';
import ResetPassword from './Pages/resetpassword';
import View from './Components/view';

export default function AppRouter() {
  const [action, setAction] = useState("create")
  const changeAction = (action) =>{
    setAction(action)
  }
  return (
    <Router>
      <ResumeState>
      <Header />
      <Routes>
        {/* <Route path='/' exact element={<Home/>} /> */}
        <Route path='/personal' exact element={<Personal action={action}/>} />
        <Route path='/education' exact element={<Education/>} />
        <Route path='/work' exact element={<Work/>} />
        <Route path='/declaration' exact element={<Declaration/>} />
        <Route path='/motivation' exact element={<Motivation action={action} changeAction={changeAction}/>} />
        <Route path='/resume' exact element={<Resume/>} />
        <Route path='/' exact element={<LoginPage/>} />
        <Route path='/registration' exact element={<RegistrationPage/>} />
        <Route path='/create' exact element={<Create changeAction={changeAction}/>} />
        <Route path='/admin' exact element={<Admin changeAction={changeAction}/>} />
        <Route path='/motivationletter' exact element={<MotivationLetter/>} />
        <Route path='/filteredcv' exact element={<FilteredResume/>} />
        <Route path='/motivationletteredit' exact element={<MotivationLetterEdit/>} />
        <Route path='/adminlogin' exact element={<AdminLoginPage/>} />
        <Route path='/adminregister' exact element={<AdminRegistrationPage/>} />
        <Route path='/forgotpassword' exact element={<ForgotPassword/>} />
        <Route path='/resetpassword' exact element={<ResetPassword/>} />
        <Route path='/view' exact element={<View/>} />

      </Routes>
      </ResumeState>
    </Router>
  );
}
