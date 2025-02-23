import React from 'react'
import { useState, useEffect } from "react";
const ViewStudent = () => {
    const [activeTab, setActiveTab] = useState("all");
  const [students, setStudents] = useState([]);
  const [year, setYear] = useState("");
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [activeTab, year]);

  const fetchStudents = async () => {
    let url = "";
    if (activeTab === "all") url = "/api/students/all";
    else if (activeTab === "placed") url = "/api/students/placed";
    else if (activeTab === "registered") url = "/api/students/registered";
    else if (activeTab === "year") url = `/api/students/year/${year}`;
    else if (activeTab === "department") url = `/api/students/stats/${year}`;

    const res = await fetch(url);
    const data = await res.json();
    setStudents(data.students || data);
  };

  return (
    <div>
       <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-4">
        {["all", "placed", "registered", "year", "department"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg flex-1 ${
              activeTab === tab
                ? "bg-[#005f69] text-white font-bold"
                : "bg-gray-200 border-[#005f69] border-5 hover:bg-gray-300 font-bold"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "year" && (
        <input
          type="number"
          placeholder="Enter Graduation Year"
          className="p-2 border-[#005f69] border-2 rounded-lg w-1/2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
              )}
              
               {activeTab === "department" && (
        <input
          type="text"
          placeholder="Enter Department"
          className="p-2  rounded-lg  border-[#005f69] border-2 w-1/2"
          value={departmentStats}
          onChange={(e) => setDepartmentStats(e.target.value)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border-[#005f69]">
          <thead>
            <tr className="bg-[#005f69] text-white">
              <th className="p-3 text-left">KTU ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.ktu_id} className="border-b">
                  <td className="p-3">{student.ktu_id}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.year_of_graduation}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default ViewStudent
