import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import LoginCards from './Components/LoginCards';
import TopCompany from './Components/TopCompany';
import Welcome from './Components/Welcome';
import FlashNews from './Components/FlashNews';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Student/Login'; // Import the Login component
import StudentDashboard from './Student/StudentDashboard';
import Register from './Student/Register'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <section id="home">
            <Home />
          </section>
          <FlashNews />
          <section id="about">
            <Welcome />
          </section>
          <section id="login">
            <LoginCards />
          </section>
          <TopCompany />
          <section id="contact">
            <Contact />
          </section>
          <Footer />
        </>} />
        
      
        <Route path="/login" element={<Login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/Register" element={  <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
