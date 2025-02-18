import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadOrDeleteDrive = () => {
  const navigate = useNavigate();
  const [placementDriveData, setPlacementDriveData] = useState({
    company_id: "",
    job_role: "",
    num_of_rounds: "",
    package: "",
    drive_mode: "On Campus",
    drive_type: "Dream",
    start_date: "",
    no_of_backlogs_permitted: "",
    supply_history_allowed: true,
    min_cgpa_required: "",
    focused_branches: [],
    description: "",
  });

  const [round, setRound] = useState(0); // ✅ Moved outside the function to fix state update issue

  const handleInputChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;

    if (type === "select-multiple") {
      // Get selected options as an array
      const selectedValues = Array.from(selectedOptions).map((option) => option.value);
      setPlacementDriveData((prevData) => ({
        ...prevData,
        [name]: selectedValues,
      }));
    } else if (type === "checkbox") {
      setPlacementDriveData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setPlacementDriveData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "num_of_rounds") {
        setRound(Number(value));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Placement Drive Data Submitted: ", placementDriveData);
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#005f69]">Register Placement Drive</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company ID */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Company ID:</label>
            <input
              type="text"
              name="company_id"
              value={placementDriveData.company_id}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            />
          </div>

          {/* Job Role */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Job Role:</label>
            <input
              type="text"
              name="job_role"
              value={placementDriveData.job_role}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            />
          </div>

          {/* Number of Rounds */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Number of Rounds:</label>
            <input
              type="number"
              name="num_of_rounds"
              value={placementDriveData.num_of_rounds}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
              min="1"
            />
          </div>

          {/* Package */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Package (₹):</label>
            <input
              type="number"
              name="package"
              value={placementDriveData.package}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
              min="0"
            />
          </div>

          {/* Drive Mode */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Drive Mode:</label>
            <select
              name="drive_mode"
              value={placementDriveData.drive_mode}
              onChange={handleInputChange}
              className="w-full bg-white text-gray-800 border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            >
              <option value="On Campus">On Campus</option>
              <option value="Off Campus">Off Campus</option>
            </select>
          </div>

          {/* Drive Type */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Drive Type:</label>
            <select
              name="drive_type"
              value={placementDriveData.drive_type}
              onChange={handleInputChange}
              className="w-full bg-white text-gray-800 border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            >
              <option value="Dream">Dream</option>
              <option value="Open">Open</option>
              <option value="Core">Core</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={placementDriveData.start_date}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            />
          </div>

          {/* Focused Branches */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Focused Branch:</label>
            <select
              multiple
              name="focused_branches"
              value={placementDriveData.focused_branches}
              onChange={handleInputChange}
              className="w-full bg-white text-gray-800 border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            >
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MCA">MCA</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Job Description:</label>
            <textarea
              name="description"
              value={placementDriveData.description}
              onChange={handleInputChange}
              className="w-full text-gray-800 bg-white border border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#005f69] text-white rounded hover:bg-[#004b52] transition"
              onClick={() => navigate(`/Admin-dashboard/AddRounds/${round}`)}
            >
              Register Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadOrDeleteDrive;
