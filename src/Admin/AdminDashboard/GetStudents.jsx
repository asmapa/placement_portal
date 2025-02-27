import React, { useState, useEffect } from "react";
import axios from "axios";

const GetStudents = () => {
  const [onCampusDrives, setOnCampusDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState("");

  useEffect(() => {
    let url = "http://localhost:3000/portal/getdrives"; // Default URL

    if (selectedDrive === "On-Going-drive") {
      url = "http://localhost:3000/portal/drives/ongoing";
    } else if (selectedDrive === "Up-coming-Drives") {
      url = "http://localhost:3000/portal/drives/upcoming";
    } else if (selectedDrive === "Completed-drives") {
      url = "http://localhost:3000/portal/drives/past";
    }

    axios
      .get(url)
      .then((response) => {
        console.log("Fetched drives:", response.data);
        if (Array.isArray(response.data.drives)) {
          const drives = response.data.drives || [];
            const formattedDrives = drives.map(drive => ({
        ...drive,
        start_date: new Date(drive.start_date).toISOString().split("T")[0],
        last_date_to_submit: new Date(drive.last_date_to_submit).toISOString().split("T")[0]
            }));
           setOnCampusDrives(formattedDrives);
          
        } else {
          console.error("Drives data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching drives:", error);
      });
  }, [selectedDrive]); // ✅ Dependency ensures re-fetching when selectedDrive changes

  return (
    <div className="mt-9 px-4">
      <h3 className="text-2xl font-bold mb-2 text-[#005f69]">
        Get Students Applied To Different Drives
      </h3>
      <select
        name="course"
        className="w-50 border-[#005f69] text-black border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2 my-9"
        onChange={(e) => setSelectedDrive(e.target.value)}
        required
      >
        <option value="">All Drives</option>
        <option value="On-Going-drive">On-Going Drive</option>
        <option value="Up-coming-Drives">Upcoming Drives</option>
        <option value="Completed-drives">Completed Drives</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {onCampusDrives.map((drive) => (
          <div
            key={drive.drive_id}
            className="flex flex-col items-center p-6 border-[#005f69] border-2 rounded-2xl shadow-lg text-white transform transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="font-bold text-2xl text-[#005f69]">
              {drive.company_name} - {drive.job_role}
            </span>
            <hr className="border-blue-500 w-full my-2" />
            <p className="text-[#005f69] text-center">{drive.description}</p>
            <p className="text-[#005f69] text-center">{drive.start_date}</p>

            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center gap-2 mb-4">
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
  );
};

export default GetStudents;
