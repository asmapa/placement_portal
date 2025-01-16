import React from 'react';
import Reg from "../assets/reg.png";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    navigate("/StudentDashboard"); // Correct navigation path
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="navbar flex items-center w-full justify-between p-4 lg:p-7 bg-Navy transition-colors duration-500">
        <div className="nav-text flex flex-col ml-2">
          <h2 className="rit text-3xl font-[Itim] font-light text-white">RIT Career Connect</h2>
        </div>

        <ul className="flex flex-1 justify-end space-x-6">
          <li className="text-lg cursor-pointer text-white">Home</li>
          <li className="text-lg cursor-pointer text-white">Login</li>
        </ul>
      </div>

      <div className="bg-Navy flex shadow-lg w-full p-5">
        <div className="sm:w-2/3 px-16">
          {/* Centered Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white">Registration Form</h1>
          </div>

          <div>
            <form>
           

              {/* Row 1 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="text-white">Your Name</label>
                  <div>
                    <input
                      type="text"
                      className="input w-full text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-white">KTU ID</label>
                  <div>
                    <input
                      type="text"
                      className="input w-full border text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="text-white">Password</label>
                  <div>
                    <input
                      type="password"
                      className="input w-full border text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-white">Confirm Password</label>
                  <div>
                    <input
                      type="password"
                      className="input w-full text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="text-white">Phone</label>
                  <div>
                    <input
                      type="text"
                      className="input w-full text-white bg-transparent border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-white">Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-white">
                      <input type="radio" id="male" name="gender" value="male" required />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center text-white">
                      <input type="radio" id="female" name="gender" value="female" />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="flex items-center text-white">
                      <input type="radio" id="others" name="gender" value="others" />
                      <span className="ml-2">Others</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label htmlFor="dob" className="block text-white mb-2">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="w-full text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500p-2"
                    required
                  />
                </div>
                <div className="flex-1">
                      <label htmlFor="course" className="block text-white mb-2">Course</label>
                            <select
                                className="w-full bg-transparent text-white border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                                required
                            >
                                  <option value="" className="bg-gray-800 text-white">Select Course</option>
                                  <option value="B.Tech" className="bg-gray-800 text-white">B.Tech</option>
                                  <option value="M.Tech" className="bg-gray-800 text-white">M.Tech</option>
                                  <option value="PhD" className="bg-gray-800 text-white">PhD</option>
                            </select>
                    </div>

              </div> 

              {/* Row 5*/}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label htmlFor="year" className="block text-white mb-2">Year of Study</label>
                  <select
                    className="w-full border text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">Choose Year</option>
                    <option value="1" className="bg-gray-800 text-white">1</option>
                    <option value="2" className="bg-gray-800 text-white">2</option>
                    <option value="3" className="bg-gray-800 text-white">3</option>
                    <option value="4" className="bg-gray-800 text-white">4</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="cgpa" className="block text-white mb-2">Average CGPA</label>
                  <select
                    className="w-full text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">Select CGPA</option>
                    <option value="9" className="bg-gray-800 text-white">9</option>
                    <option value="8" className="bg-gray-800 text-white">8</option>
                    <option value="7" className="bg-gray-800 text-white">7</option>
                    <option value="6" className="bg-gray-800 text-white">6</option>
                  </select>
                </div>
              </div>


              {/* Row 7 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="text-white">College Email address</label>
                  <div>
                    <input
                      type="text"
                      className="input w-full text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-white">Number Of Backlogs</label>
                  <div>
                    <input
                      type="email"
                      className="input w-full border text-white bg-transparent border-b  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 7 */}
              <div className="flex gap-10 mb-6">
                <div className="flex-1">
                  <label className="text-white">Upload Certificate</label>
                  <div>
                    <input
                      type="file"
                      className="input w-full text-white bg-transparent border  rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder='Select Certificate'
                      name='certificate'
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                 
                </div>
              </div>


              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="stylebt px-6 py-2 bg-white text-Navy rounded">Register Now</button>
              </div>
            </form>
          </div>
        </div>

        <div className="sm:w-1/3 flex flex-col items-center rounded">
          <p className="text-center text-white px-4 mt-6">
            All students are required to provide accurate and truthful information during the registration process. Submission of false or misleading data will result in disciplinary action, which may include penalties or further legal consequences. Please review your details carefully before submitting.
          </p>
          <img className="rounded-2xl w-full" src={Reg} alt="Registration Info" />
        </div>
      </div>
    </section>
  );
};

export default Register;
