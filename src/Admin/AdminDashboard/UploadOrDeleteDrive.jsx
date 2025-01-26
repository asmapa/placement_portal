import React, { useState } from "react";

const UploadOrDeleteDrive = () => {
  const [companyData, setCompanyData] = useState({
    drive_id: "",
    description: "",
    eligibility_courses: "",
    eligibility_criteria: "",
    recruitment_timeline: "",
    work_location: "",
    remuneration_package: {
      training_package: "",
      permanent_package: "",
    },
    key_dates: {
      last_date_to_submit: "",
      interview_date: "",
    },
    register_link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("remuneration_package") || name.startsWith("key_dates")) {
      const [parent, field] = name.split(".");
      setCompanyData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [field]: value,
        },
      }));
    } else {
      setCompanyData({
        ...companyData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Data Submitted: ", companyData);
    // Handle the form submission logic, like sending data to a server
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Centered Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#005f69]">Register Drives</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Drive ID */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Drive ID:</label>
            <div>
              <input
                type="text"
                name="drive_id"
                value={companyData.drive_id}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                required
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Job Description:</label>
            <div>
              <textarea
                name="description"
                value={companyData.description}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                rows="3"
                required
              ></textarea>
            </div>
          </div>

          {/* Row 3: Eligibility Courses */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Eligibility Courses:</label>
            <div>
              <select
                name="eligibility_courses"
                value={companyData.eligibility_courses}
                onChange={handleInputChange}
                className="w-full bg-transparent text-gray-800 border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                required
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
          </div>

          {/* Row 4: Recruitment Timeline */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Recruitment Timeline:</label>
            <div>
              <input
                type="text"
                name="recruitment_timeline"
                value={companyData.recruitment_timeline}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                placeholder="Add dates separated by commas"
              />
            </div>
          </div>

          {/* Row 5: Work Location */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Work Location:</label>
            <div>
              <input
                type="text"
                name="work_location"
                value={companyData.work_location}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                required
              />
            </div>
          </div>

          {/* Row 6: Remuneration Package */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69] font-semibold">Training Package:</label>
              <div>
                <input
                  type="text"
                  name="remuneration_package.training_package"
                  value={companyData.remuneration_package.training_package}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[#005f69] font-semibold">Permanent Package:</label>
              <div>
                <input
                  type="text"
                  name="remuneration_package.permanent_package"
                  value={companyData.remuneration_package.permanent_package}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 7: Key Dates */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69] font-semibold">Last Date to Submit:</label>
              <div>
                <input
                  type="date"
                  name="key_dates.last_date_to_submit"
                  value={companyData.key_dates.last_date_to_submit}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[#005f69] font-semibold">Interview Date:</label>
              <div>
                <input
                  type="date"
                  name="key_dates.interview_date"
                  value={companyData.key_dates.interview_date}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 8: Register Link */}
          <div className="mb-6">
            <label className="text-[#005f69] font-semibold">Registration Link:</label>
            <div>
              <input
                type="url"
                name="register_link"
                value={companyData.register_link}
                onChange={handleInputChange}
                className="w-full text-gray-800 bg-transparent border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#005f69] text-white rounded hover:bg-[#004b52] transition"
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
