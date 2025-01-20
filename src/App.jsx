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
import Result from './Student/StudentDashboard/Result';
import UpdateProfile from './Student/StudentDashboard/UpdateProfile';
import MyApplication from './Student/StudentDashboard/MyApplication';
import Placement from './Student/StudentDashboard/Placement';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import RecentPlacement from './Components/RecentPlacement';
import AdminLayout from './Admin/AdminDashboard/Shared/AdminLayout';
import Dashboard from './Admin/AdminDashboard/Dashboard';

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
              <section id="RecentPlacement">
              <RecentPlacement/>
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
        {/* Default route */}
        <Route index element={<Placement />} />
        {/* Nested routes */}
        <Route path="Result" element={<Result />} />
        <Route path="UpdateProfile" element={<UpdateProfile />} />
        <Route path="MyApplication" element={<MyApplication />} />
      </Route>

      <Route path="/Admin-dashboard" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
