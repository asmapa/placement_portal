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
import Layout from './Student/StudentDashboard/shared/Layout';
import Register from './Student/Register';
import Dashboard from './Student/StudentDashboard/Dashboard';
import Placement from './Student/StudentDashboard/Placement';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
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
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/student-dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route index element={<Dashboard />} />
          <Route path="placement" element={<Placement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
