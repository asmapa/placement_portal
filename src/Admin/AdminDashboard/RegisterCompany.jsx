import React from "react";

const RegisterCompany = () => {
  return (
    <div className="p-8">
      {/* Centered Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#005f69]">Register Company</h1>
      </div>

      <div>
        <form>
          {/* Row 1: ID and Company Name */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69]">Company Unique ID:</label>
              <div>
                <input
                  type="text"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[#005f69]">Company Name:</label>
              <div>
                <input
                  type="text"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Contact Person Name and Phone Number */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69]">Contact Person Name:</label>
              <div>
                <input
                  type="text"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[#005f69]">Phone Number:</label>
              <div>
                <input
                  type="text"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 3: Official Email and Address */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69]">Official Email Address:</label>
              <div>
                <input
                  type="email"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[#005f69]">Address:</label>
              <div>
                <textarea
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Row 4: Website Link */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69]">Website Link:</label>
              <div>
                <input
                  type="url"
                  className="input w-full text-gray-800 bg-transparent  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 5: Type of Company */}
          <div className="flex gap-10 mb-6">
            <div className="flex-1">
              <label className="text-[#005f69]">Type of Company:</label>
              <div>
                <select
                  className="w-full bg-transparent text-gray-800  border-[#005f69] rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  required
                >
                  <option value="" className="bg-gray-800 text-gray-800">
                    Select Type
                  </option>
                  <option value="core" className="bg-gray-800 text-gray-800">
                    Core
                  </option>
                  <option value="it" className="bg-gray-800 text-gray-800">
                    IT
                  </option>
                  <option value="dream" className="bg-gray-800 text-gray-800">
                    Dream
                  </option>
                  <option value="open" className="bg-gray-800 text-gray-800">
                    Open
                  </option>
                </select>
              </div>
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
    </div>
  );
};

export default RegisterCompany;
