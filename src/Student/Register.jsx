import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reg from "../assets/reg.png";
import axios from "axios"
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
    dob: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };



const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/portal/students", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Response:", response.data); // Log success response
    navigate("/student-dashboard"); // Navigate after successful registration

  } catch (error) {
    console.error("Error registering student:", error.response ? error.response.data : error.message);
  }
};
  const handleClick = () => {
    alert("Are you sure about the Provided Data ?");
    navigate("/Login")
 }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="navbar flex items-center w-full justify-between p-4 lg:p-7 bg-Navy transition-colors duration-500">
        <div className="nav-text flex flex-col ml-2">
          <h2 className="rit text-3xl font-[Itim] font-light text-white">RIT Career Connect</h2>
        </div>
        <ul className="flex flex-1 justify-end space-x-6">
          <li className="text-2xl cursor-pointer font-bold text-white hover:text-gray-800" onClick={()=> navigate("/")}>Home</li>
          <li className="text-2xl font-bold cursor-pointer text-white" onClick={()=> navigate("/Login")}>Login</li>
        </ul>
      </div>

      <div className="bg-Navy flex shadow-lg w-full p-5">
        <div className="sm:w-2/3 px-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">Registration Form</h1>
          </div>

          <form onSubmit={handleRegister}>
            {/* Row 1 */}
            <div className="flex gap-10 mb-6">
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
                />
              </div>
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
                  className="input w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Confirm Password"
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
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Gender</label>
                <div className="flex gap-4">
                  {["Male", "Female", "Others"].map((option) => (
                    <label key={option} className="flex items-center text-white">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                        required
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
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
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-white">Course</label>
                <select
                  name="course"
                  className="w-full bg-transparent text-white border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex gap-10 mb-6">
              <div className="flex-1">
                <label className="text-white">Year of Study</label>
                <select
                  name="yearOfStudy"
                  className="w-full text-white bg-transparent border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
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
                  required
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
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="stylebt px-6 py-2 bg-white text-Navy rounded" onClick={handleClick}>
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
