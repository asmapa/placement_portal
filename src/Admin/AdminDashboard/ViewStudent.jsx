import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ViewStudent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [students, setStudents] = useState([]);
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      let url = "http://localhost:3000/portal/get-all-students";

      if (activeTab === "placed") {
        url = "http://localhost:3000/portal/get-students/placed";
      } else if (activeTab === "registered") {
        url = "http://localhost:3000/portal/get-students/registered";
      } else if (activeTab === "year" && year) {
        url = `http://localhost:3000/portal/get-students-by-year/${year}`;
      } else if (activeTab === "department" && department) {
        url = `http://localhost:3000/portal/get-students-by-department/${department}`;
      }

      try {
        setStudents([]); // Reset before fetching new data
        const res = await axios.get(url);
        setStudents(res.data.students || res.data); // Handle both array and object response
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [activeTab, year, department]);

  // Function to Export Data to Excel
  const exportToExcel = () => {
    if (students.length === 0) {
      alert("No data available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // File name based on active tab
    const fileName = `students_${activeTab}.xlsx`;

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, fileName);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-4">
        {["all", "placed", "registered", "year", "department"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg flex-1 ${
              activeTab === tab
                ? "bg-[#005f69] text-white font-bold"
                : "bg-gray-200 border-[#005f69] border-2 hover:bg-gray-300 font-bold"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Download Button */}
      <button
        onClick={exportToExcel}
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
        Download {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data
      </button>

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
          className="p-2 rounded-lg border-[#005f69] border-2 w-1/2"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      )}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border-[#005f69]">
          <thead>
            <tr className="bg-[#005f69] text-white">
              <th className="p-3 text-left">KTU ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">RIT Mail</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Program</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">DOB</th>
              <th className="p-3 text-left">Year of Graduation</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">CGPA</th>
              <th className="p-3 text-left">Number of Backlogs</th>
              <th className="p-3 text-left">Supply History</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.ktu_id} className="border-b">
                  <td className="p-3">{student.ktu_id}</td>
                  <td className="p-3">{student.student_name}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.rit_email}</td>
                  <td className="p-3">{student.phone_number}</td>
                  <td className="p-3">{student.program}</td>
                  <td className="p-3">{student.semester}</td>
                  <td className="p-3">{student.date_of_birth}</td>
                  <td className="p-3">{student.year_of_graduation}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">{student.cgpa}</td>
                  <td className="p-3">{student.no_of_backlogs}</td>
                  <td className="p-3">{student.supply_history ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="p-3 text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudent;
