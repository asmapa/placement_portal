import React from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';

const GetStudents = () => {
  const [onCampusDrives, setOnCampusDrives] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/portal/getPlacement");
         setOnCampusDrives(res.data.drives || []);
    } catch (error) {
      console.log("Error in Fetching Data !!!", error);
    }
  };

  fetchData();
}, []);
  return (
    <div>
        <div className="mt-9 px-4">
        
          <div>
          <h3 className="text-2xl  font-bold mb-2 text-[#005f69]">Get Students Applied To Different Drives</h3>
          <input
          type="text"
          placeholder="Enter Company Name"
          className="p-2 rounded-lg border-[#005f69] border-2 w-1/2 my-8"
          
        />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {onCampusDrives.map((drive) => (
              <div
  key={drive.drive_id}
  className="flex flex-col items-center p-6  border-[#005f69] border-2 rounded-2xl shadow-lg  text-white transform transition-all hover:-translate-y-2 hover:shadow-xl"
>
  <span className="font-bold text-2xl text-[#005f69]">
    {drive.company_name} - {drive.job_role}
  </span>
  <hr className="border-blue-500 w-full my-2" />
  <p className="text-[#005f69] text-center">{drive.description}</p>
 <button
       
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center gap-2 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v12m0 0l-3-3m3 3l3-3M6 20h12"
          />
        </svg>
        Download 
      </button>
</div>

              ))}
            </div>
          </div>
        
 </div>
    </div>
  )
}

export default GetStudents
