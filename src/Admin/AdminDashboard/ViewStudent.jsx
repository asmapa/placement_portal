import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewStudent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [students, setStudents] = useState([]);
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      let url = "http://localhost:3000/portal/get-all-students";

      if (activeTab === "placed") {
        url = "http://localhost:3000/portal/get-placed-students";
      } else if (activeTab === "registered") {
        url = "http://localhost:3000/portal/get-registered-students";
      } else if (activeTab === "year" && year) {
        url = `http://localhost:3000/portal/get-students-by-year/${year}`;
      } else if (activeTab === "department" && department) {
        url = `http://localhost:3000/portal/get-department-wise-stats/${department}`;
      }

        try {
          setStudents([]);
setDepartmentStats([]);
        const res = await axios.get(url);
        const data = res.data;

        if (activeTab === "department") {
          setDepartmentStats(data);
          setStudents([]);
        } else {
          setStudents(data.students || data);
          setDepartmentStats([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [activeTab, year, department]);

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
                  <td className="p-3">{student.supply_history}</td>
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
