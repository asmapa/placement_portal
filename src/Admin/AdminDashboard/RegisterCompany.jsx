import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const RegisterCompany = () => {

  const navigate = useNavigate();
  // State to store form data
  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    address: "",
    website: "",
    companyType: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to check if all fields are filled
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  // Show success alert only if form is valid
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      // Show error alert if fields are missing
      MySwal.fire({
        title: "Oops!",
        text: "Please fill in all fields before submitting.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      // Show success alert when form is fully filled
      MySwal.fire({
        title: "Good Job!",
        text: "You have successfully registered the company!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000, // Auto close after 2 seconds
      });

      navigate("/Admin-dashboard");
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#005f69]">Register Company</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Row 1: ID and Company Name */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1">
            <label className="text-[#005f69]">Company Unique ID:</label>
            <input
              type="text"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-[#005f69]">Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Row 2: Contact Person Name and Phone Number */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1">
            <label className="text-[#005f69]">Contact Person Name:</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-[#005f69]">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Row 3: Official Email and Address */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1">
            <label className="text-[#005f69]">Official Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-[#005f69]">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Row 4: Website Link */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1">
            <label className="text-[#005f69]">Website Link:</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Row 5: Type of Company */}
        <div className="flex gap-10 mb-6">
          <div className="flex-1">
            <label className="text-[#005f69]">Type of Company:</label>
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full bg-transparent text-gray-800 border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              required
            >
              <option value="">Select Type</option>
              <option value="core">Core</option>
              <option value="it">IT</option>
              <option value="dream">Dream</option>
              <option value="open">Open</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-[#005f69] text-white rounded hover:bg-[#004b52] transition"
            
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompany;
