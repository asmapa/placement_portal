import React from 'react';
import student from '../assets/contact.png';


const Contact = () => {
  return (
    <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
      {/* Title */}
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold text-Navy uppercase">Contact Us</h1>
      </div>

      {/* Content Section */}
      <div className="flex  w-full justify-center gap-24">
        
        {/* Left Image */}
        <div>
          <img src={student} alt="Student" className="w-[300px] h-auto" />
        </div>

        {/* Right Boxes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-Navy hover:bg-red-800 text-white rounded-lg shadow-md text-center transition duration-300">
            <h3>Prof. Ebin M Manuel</h3>
            <p>Placement Officer</p>
            <p>8075723660</p>
          </div>
          <div className="p-6  bg-Navy  hover:bg-red-800 text-white rounded-lg shadow-md text-center transition duration-300">
          <h3>Muhammed Midlaj T. V</h3>
            <p>Internship Coordinator</p>
            <p>7907101626</p>
          </div>
          <div className="p-6  bg-Navy hover:bg-red-800 text-white rounded-lg shadow-md text-center transition duration-300">
          <h3>Shamir Rahman</h3>
            <p>Placement Coordinator</p>
            <p>9747364361</p>
          </div>
          <div className="p-6  bg-Navy hover:bg-red-800 text-white  rounded-lg shadow-md text-center transition duration-300">
          <h3>Email Address</h3>
            <p>Placement@rit.ac.in</p>
           
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
