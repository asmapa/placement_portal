import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reg from "../assets/reg.png";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ktuid: "",
    name: "",
    gender: "",
    yearOfStudy: "",
    course: "",
    branch: "",
    cgpa: "",
    program: "",
    ritmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dob: "",
    skills: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "ktuid" && value.trim() !== "") {
      try {
        const response = await axios.get("http://localhost:3000/portal/get-all-students");
        const allStudents = response.data;

        // Find student with matching KTU ID
        const studentData = allStudents.find(student => student.ktu_id === value);

        if (studentData) {
          setFormData((prevData) => ({
            ...prevData,
            name: studentData.student_name || "",
            gender: studentData.gender || "",
            yearOfStudy: studentData.year_of_graduation ? (studentData.year_of_graduation - 2022) : "",
            course: studentData.program || "",
            branch: studentData.department || "",
            cgpa: studentData.cgpa || "",
            program: studentData.program || "",
            ritmail: studentData.rit_email || "",
            phoneNumber: studentData.phone_number || "",
            dob: studentData.date_of_birth ? studentData.date_of_birth.split("T")[0] : "", // Format YYYY-MM-DD
          }));
        } else {
          console.log("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  // Create a FormData object
  const formDataToSend = new FormData();

  // Append all required fields
  formDataToSend.append('ktuId', formData.ktuid);
  formDataToSend.append('studentName', formData.name);
  formDataToSend.append('skills', formData.skills);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('confirmPassword', formData.confirmPassword);

  // Append the resume file
  const resumeFile = document.querySelector('input[name="resume"]').files[0];
  if (!resumeFile) {
    alert("Please upload a resume file.");
    return;
  }
  formDataToSend.append('resume', resumeFile);

  try {
    const response = await axios.post("http://localhost:3000/portal/students/register", formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("Response:", response.data); // Log success response

    // Show success alert
    alert("Student successfully registered!");

    // Navigate to the login page
    navigate("/Login");
  } catch (error) {
    console.error("Error registering student:", error.response ? error.response.data : error.message);

    // Show error alert
    alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
  }
};


  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="navbar flex items-center w-full justify-between p-4 lg:p-7 bg-Navy transition-colors duration-500">
        <div className="nav-text flex flex-col ml-2">
          <h2 className="rit text-3xl font-[Itim] font-light text-white">RIT Career Connect</h2>
        </div>
        <ul className="flex flex-1 justify-end space-x-6">
          <li className="text-2xl cursor-pointer font-bold text-white hover:text-gray-800" onClick={() => navigate("/")}>Home</li>
          <li className="text-2xl font-bold cursor-pointer text-white" onClick={() => navigate("/Login")}>Login</li>
        </ul>
      </div>

      <div className="bg-Navy flex shadow-lg w-full p-5">
        <div className="sm:w-2/3 px-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">Registration Form</h1>
            <p className='text-lg text-white mt-9'>✨ "Type your KTU ID carefully, like it's your Netflix password! 🎬 If you're a valid student, all your details will magically appear. Set your password, show off your skills, and upload that resume like a pro! 🚀"</p>
          </div>

          <form onSubmit={handleRegister}>
            {/* Row 1 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">KTU ID</label>
                <input
                  type="text"
                  name="ktuid"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="KTU ID"
                  value={formData.ktuid}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1">
                <label className="text-white">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="input w-full text-white bg-transparent border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Gender</label>
                <input
                  type="text"
                  name="gender"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">DOB</label>
                <input
                  type="date"
                  name="dob"
                  className="w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  value={formData.dob}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Course</label>
                <input
                  type="text"
                  name="course"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Course"
                  value={formData.course}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Year of Study"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="text-white">CGPA</label>
                <input
                  type="text"
                  name="cgpa"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="CGPA"
                  value={formData.cgpa}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">College Email</label>
                <input
                  type="email"
                  name="ritmail"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Email"
                  value={formData.ritmail}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Skills (Comma Separated)</label>
                <input
                  type="text"
                  name="skills"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="e.g. Java, Python, React"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 7 - File Upload */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">Upload Resume</label>
                <input
                  type="file"
                  name="resume"
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  accept=".pdf"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="stylebt px-6 py-2 bg-white text-Navy rounded">
                Register Now
              </button>
            </div>
          </form>
        </div>

        <div className="sm:w-1/3 flex flex-col items-center rounded">
          <img className="rounded-2xl w-full" src={Reg} alt="Registration" />
        </div>
      </div>
    </section>
  );
};

export default Register;