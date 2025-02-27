import React, { useState } from "react";

const StudentUpdate = () => {
  const [student, setStudent] = useState({
    ktuId: "KTU123456",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    department: "Computer Science",
    program: "B Tech",
    semester: 6,
    dateOfBirth: "2002-05-15",
    yearOfGraduation: 2026,
    gender: "Male",
    cgpa: 8.5,
    noOfBacklogs: 0,
    supplyHistory: "No",
    skills: "JavaScript, React, Python",
    resumeUrl: "https://example.com/resume.pdf"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Student Info:", student);
    alert("Student details updated successfully!");
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Update Student Details</h1>
      <div className="w-full max-w-3xl bg-white text-blue-950 shadow-lg p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">KTU ID (Cannot be changed)</label>
            <input type="text" name="ktuId" value={student.ktuId} disabled className="w-full p-3 border rounded-lg bg-gray-300 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Name</label>
            <input type="text" name="name" value={student.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Email</label>
            <input type="email" name="email" value={student.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Phone</label>
            <input type="text" name="phone" value={student.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Department</label>
            <input type="text" name="department" value={student.department} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Program</label>
            <input type="text" name="program" value={student.program} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Semester</label>
            <input type="number" name="semester" value={student.semester} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Year of Graduation</label>
            <input type="number" name="yearOfGraduation" value={student.yearOfGraduation} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Gender</label>
            <select name="gender" value={student.gender} onChange={handleChange} className="w-full p-3 border rounded-lg">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold">CGPA</label>
            <input type="number" step="0.01" name="cgpa" value={student.cgpa} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Number of Backlogs</label>
            <input type="number" name="noOfBacklogs" value={student.noOfBacklogs} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-semibold">Supply History</label>
            <select name="supplyHistory" value={student.supplyHistory} onChange={handleChange} className="w-full p-3 border rounded-lg">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold">Skills</label>
            <textarea name="skills" value={student.skills} onChange={handleChange} className="w-full p-3 border rounded-lg"></textarea>
          </div>
          <div>
            <label className="block text-lg font-semibold">Resume URL</label>
            <input type="text" name="resumeUrl" value={student.resumeUrl} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-Navy text-white p-3 rounded-lg hover:bg-blue-700">Update</button>
        </form>
      </div>
    </div>
  );
};

export default StudentUpdate;
