
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home'
import LoginCards  from './Components/LoginCards';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopCompany from './Components/TopCompany';
import Welcome from './Components/Welcome'
import FlashNews from './Components/FlashNews'


import React, { useState } from 'react';

import './App.css';
import Contact from './Components/Contact';
import Footer from './Components/Footer';


const App = () => {
 
  return (
    
     <>
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
    </>
  )
}

export default App
