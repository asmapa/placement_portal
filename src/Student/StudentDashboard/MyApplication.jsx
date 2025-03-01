import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/portal/registered-drives", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data); // Store the drives the student registered for
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data?.message || error.message);
      }
    };

    fetchMyApplications();
  }, []);


  return (
    <div className="min-h-screen text-white flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-9 text-Navy">My Job Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
        {applications.length === 0 ? (
          <p className="text-lg text-Navy">You haven't applied for any jobs yet.</p>
        ) : (
          applications.map((company, index) => (
            <div 
              key={index} 
              className="bg-white text-blue-950 p-10 min-h-[250px] rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-center justify-center border-Navy border-2"
            >
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">{company.company_name}</h2>
                <p className="text-lg font-medium"><strong>Role:</strong> {company.job_role}</p>
                <p className="text-gray-700 mb-4">{company.description}</p>
                <p className="text-gray-800 font-medium">
                  <strong>Location:</strong> {company.work_location}
                </p>
                <p className="text-gray-800 font-medium">
                  <strong>Salary:</strong> {company.permanent_package} LPA
                </p>
              </div>
              <button onClick={() => navigate("/student-dashboard/Result")} className="mt-2 px-4 py-2 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-800 transition w-1/2 flex justify-center">
                Result
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplication;
