import React, { useState,useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { Modal, Button } from 'flowbite-react';
import {
  FaUserFriends,
  FaBuilding,
  FaSpinner,
  FaClipboardCheck,
  FaGraduationCap,
  FaChartLine,
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';

const dataBar = [
  { name: 'January', placements: 5 },
  { name: 'February', placements: 10 },
  { name: 'March', placements: 8 },
  { name: 'April', placements: 12 },
  { name: 'May', placements: 9 },
  { name: 'June', placements: 15 },
  { name: 'July', placements: 20 },
  { name: 'August', placements: 18 },
  { name: 'September', placements: 14 },
  { name: 'October', placements: 16 },
  { name: 'November', placements: 19 },
  { name: 'December', placements: 22 },
];

const dataPie = [
  { name: 'CSE', value: 120 },
  { name: 'ECE', value: 100 },
  { name: 'EEE', value: 80 },
  { name: 'ME', value: 60 },
  { name: 'CE', value: 40 },
];



const companies = [
  {
    company_id: 1,
    company_name: "Tech Innovators Ltd",
    contact_person_name: "Rahul Sharma",
    phone_number: "9876543210",
    official_mail: "contact@techinnovators.com",
    address: "123, Tech Park, Bangalore, India",
    website_link: "https://www.techinnovators.com"
  },
  {
    company_id: 2,
    company_name: "NextGen Solutions",
    contact_person_name: "Priya Verma",
    phone_number: "9123456780",
    official_mail: "info@nextgensolutions.com",
    address: "456, Business Hub, Mumbai, India",
    website_link: "https://www.nextgensolutions.com"
  },
  {
    company_id: 3,
    company_name: "GlobalSoft Pvt Ltd",
    contact_person_name: "Amit Khanna",
    phone_number: "9001234567",
    official_mail: "support@globalsoft.com",
    address: "789, IT Valley, Hyderabad, India",
    website_link: "https://www.globalsoft.com"
  },
  {
    company_id: 4,
    company_name: "DataWave Analytics",
    contact_person_name: "Sneha Raj",
    phone_number: "9988776655",
    official_mail: "hello@datawave.com",
    address: "101, Data Towers, Pune, India",
    website_link: "https://www.datawave.com"
  },
  {
    company_id: 5,
    company_name: "AI Revolution Corp",
    contact_person_name: "Vikram Patel",
    phone_number: "9871122334",
    official_mail: "ai@revolutioncorp.com",
    address: "555, AI Hub, Chennai, India",
    website_link: "https://www.revolutioncorp.com"
  }
];

const on_going = [
  {
      drive_id: 1,
      company_name: "Tech Innovators Ltd",
      job_role: "Software Engineer",
      num_of_rounds: 3,
      training_package: 5.5,
      permanent_package: 10.0,
      drive_mode: "On Campus",
      drive_type: "Dream",
      start_date: "2025-02-10",
      last_date_to_submit: "2025-02-08",
      no_of_backlogs_permitted: 1,
      supply_history_allowed: true,
      min_cgpa_required: 7.0,
      focused_branches: ["CSE", "IT"],
      work_location: "Bangalore, India",
      registration_link: "https://techinnovators.com/register"
  },
{
  drive_id: 2,
      company_name: "NextGen Solutions",
      job_role: "Data Analyst",
      num_of_rounds: 4,
      training_package: 6.0,
      permanent_package: 12.0,
      drive_mode: "Off Campus",
      drive_type: "Open",
      start_date: "2025-03-05",
      last_date_to_submit: "2025-03-01",
      no_of_backlogs_permitted: 2,
      supply_history_allowed: false,
      min_cgpa_required: 6.5,
      focused_branches: ["CSE", "ECE"],
      work_location: "Mumbai, India",
      registration_link: "https://nextgensolutions.com/apply"
    }
  
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f'];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Existing-Company');

  const [choose, setChoose] = useState(false);
  const [drivechoose, setDrivechoose] = useState(false);
   const [formData, setFormData] = useState({
    company_id: "",
    company_name: "",
    contact_person_name: "",
    official_mail: "",
    phone_number: "",
    website_link: "",
   });
  
  
  const [formDrive, setFormDrive] = useState({
  drive_id: "",
  company_name: "",
  job_role: "",
  num_of_rounds: "",
  training_package: "",
  permanent_package: "",
  drive_mode: "",
  drive_type: "",
  start_date: "",
  last_date_to_submit: "",
  no_of_backlogs_permitted: "",
  supply_history_allowed: false,
  min_cgpa_required: "",
  focused_branches: [],
  work_location: "",
  });
  

  const handleDriveChange = (drive) => {
    setFormDrive({
  drive_id: drive.drive_id,
  company_name: drive.company_name,
  job_role: drive.job_role || "",
  num_of_rounds: drive.num_of_rounds || "",
  training_package: drive.training_package || "",
  permanent_package: drive.permanent_package || "",
  drive_mode: drive.drive_mode || "",
  drive_type: drive.drive_type || "",
  start_date: drive.start_date || "",
  last_date_to_submit: drive.last_date_to_submit || "",
  no_of_backlogs_permitted: drive.no_of_backlogs_permitted || "",
  supply_history_allowed: drive.supply_history_allowed ?? false, // Handling boolean values
  min_cgpa_required: drive.min_cgpa_required || "",
  focused_branches: drive.focused_branches || [],
  work_location: drive.work_location || "",
});

setTimeout(() => setDrivechoose(true), 10);
  }

  const handleUpdatedClick = (company) => {
    

   
    setFormData({
      company_id: company.company_id,
      company_name: company.company_name,
      contact_person_name: company.contact_person_name || "",
      official_mail: company.official_mail,
      phone_number: company.phone_number || "",
      website_link: company.website_link,
    });
     setTimeout(() => setChoose(true), 10);
  }

  const handleDrive = (e) => {
    setFormDrive({ ...formDrive, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  return (
    <div>
      {/* Placement Stats */}
      <div className="flex flex-wrap justify-around">
        {/* Stats Section */}
        <div className="flex flex-col items-center flex-1 bg-[#005f69] text-white p-4 rounded-lg mx-2 shadow-md">
          <FaUserFriends size={40} className="mb-2" />
          <h2 className="text-lg font-bold">Total Students Registered</h2>
          <p className="text-4xl font-bold">245</p>
        </div>

        <div className="flex flex-col items-center flex-1 bg-blue-800 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaBuilding size={40} className="mb-2" />
          <h2 className="text-lg font-bold">Total Companies Registered</h2>
          <p className="text-4xl font-bold">50</p>
        </div>

        <div className="flex flex-col items-center flex-1 bg-blue-900 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaSpinner size={40} className="mb-2 animate-spin" />
          <h2 className="text-lg font-bold">Ongoing Drives</h2>
          <p className="text-4xl font-bold">3</p>
        </div>

        <div className="flex flex-col items-center flex-1 bg-red-600 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaClipboardCheck size={40} className="mb-2" />
          <h2 className="text-lg font-bold">Upcoming Deadlines</h2>
          <p className="text-4xl font-bold">2</p>
        </div>

        <div className="flex flex-col items-center flex-1 bg-teal-700 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaGraduationCap size={40} className="mb-2" />
          <h2 className="text-lg font-bold">Students Placed</h2>
          <p className="text-4xl font-bold">180</p>
        </div>

        <div className="flex flex-col items-center flex-1 bg-emerald-600 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaChartLine size={40} className="mb-2" />
          <h2 className="text-lg font-bold">Placement Success Rate</h2>
          <p className="text-4xl font-bold">73%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-row justify-center items-center mt-6 space-x-8">
        {/* Bar Chart */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Placements Overview</h2>
          <ResponsiveContainer width={600} height={300}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placements" fill="#005f69" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut Chart */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Department-wise Placement</h2>
          <ResponsiveContainer width={600} height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*Button to choose different sections */}
     <div className="flex justify-center mt-10 gap-4">
        <button
          className={`px-6 py-2 font-bold flex-1 ${
            selectedTab === 'Existing-Company' ? 'bg-[#005f69] text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('Existing-Company')}
        >
          Existing Company
        </button>
        <button
          className={`px-6 py-2  font-bold flex-1 ${
            selectedTab === 'On-going-drive' ? 'bg-[#005f69] text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('DriveData')}
        >
          Check Drive Details
        </button>
         
      </div>   

      {/*The Table Data */}
      {selectedTab === "Existing-Company" && (
        <div className="overflow-x-auto shadow-md rounded-lg border-Navy mt-8">
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#005f69", color: "white" }}>
              <tr>
                <th> ID</th>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Update</th>
                <th>Dlete</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.company_id}>
                  <td>{company.company_id}</td>
                  <td>{company.company_name}</td>
                  <td>{company.contact_person_name || "N/A"}</td>
                  <td>{company.official_mail}</td>
                  <td>{company.phone_number || "N/A"}</td>
                  <td>
                    <a
                      href={company.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website_link}
                    </a>
                  </td>
                  <td>
                    <button className="px-6 py-2 bg-[#005f69] text-white rounded hover:bg-[blue] transition"
                onClick={() => {
    console.log("Button clicked! Company:", company); // Add this log
    handleUpdatedClick(company);
    console.log("choose after click:", choose); // Check if `choose` changes
  }}>Update</button>
                  </td>
                  <td>
                    <button className='px-6 py-2 bg-red-700 text-white rounded hover:bg-[#004b52] transition'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {selectedTab === "DriveData" && (
        <div className="overflow-x-auto shadow-md rounded-lg border-Navy mt-8 p-4">
           <div >
                
                <select
                  name="course"
                  className=" w-50 border-[#005f69] text-black border-b rounded-lg focus:outline-none focus:ring focus:ring-blue-500 p-2"
                  
                  required
                >
                  <option value="">Choose Specific Drive</option>
                  <option value="B.Tech">On-Going-drive</option>
                  <option value="M.Tech">Up-coming-Drives</option>
                  <option value="PhD">Completed-drives</option>
                </select>
              </div>
    <Table striped bordered hover responsive>
      <thead style={{ backgroundColor: "#005f69", color: "white" }}>
        <tr>
          <th className="px-4 py-2 ">Drive ID</th>
          <th className="px-4 py-2">Company Name</th>
          <th className="px-4 py-2">Job Role</th>
          <th className="px-4 py-2">Rounds</th>
          <th className="px-4 py-2">Training Package</th>
          <th className="px-4 py-2">Permanent Package</th>
          <th className="px-4 py-2">Drive Mode</th>
          <th className="px-4 py-2">Drive Type</th>
          <th className="px-4 py-2">Start Date</th>
          <th className="px-4 py-2">Last Date to Submit</th>
          <th className="px-4 py-2">Backlogs Permitted</th>
          <th className="px-4 py-2">Supply Allowed</th>
          <th className="px-4 py-2">Min CGPA</th>
          <th className="px-4 py-2">Focused Branches</th>
          <th className="px-4 py-2">Work Location</th>
                <th className="px-4 py-2">Registration Link</th>
                <th className="px-4 py-2">Update</th>
                 <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {on_going.map((drive) => (
          <tr key={drive.drive_id}>
            <td className="px-4 py-3">{drive.drive_id}</td>
            <td className="px-4 py-3">{drive.company_name}</td>
            <td className="px-4 py-3">{drive.job_role}</td>
            <td className="px-4 py-3">{drive.num_of_rounds}</td>
            <td className="px-4 py-3">{drive.training_package} LPA</td>
            <td className="px-4 py-3">{drive.permanent_package} LPA</td>
            <td className="px-4 py-3">{drive.drive_mode}</td>
            <td className="px-4 py-3">{drive.drive_type}</td>
            <td className="px-4 py-3">{drive.start_date}</td>
            <td className="px-4 py-3">{drive.last_date_to_submit}</td>
            <td className="px-4 py-3">{drive.no_of_backlogs_permitted}</td>
            <td className="px-4 py-3">{drive.supply_history_allowed ? "Yes" : "No"}</td>
            <td className="px-4 py-3">{drive.min_cgpa_required}</td>
            <td className="px-4 py-3">{drive.focused_branches.join(", ")}</td>
            <td className="px-4 py-3">{drive.work_location}</td>
            <td className="px-4 py-3">
              <a
                href={drive.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Apply Here
              </a>
            </td>
            <td>
                    <button className="px-6 py-2 bg-[#005f69] text-white rounded hover:bg-[blue] transition" onClick={()=>handleDriveChange(drive)}>Update</button>
                  </td>
                  <td>
                    <button className='px-6 py-2 bg-red-700 text-white rounded hover:bg-[#004b52] transition'>Delete</button>
                  </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
      )}


{drivechoose && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-1/2">
      <h2 className="text-3xl text-[#005f69] font-bold mb-6 text-center my-7">Update Drive</h2>

      <form action="#" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.keys(formDrive).map((key) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700">
                {key.replace(/_/g, " ").toUpperCase()}
              </label>
              <input
                type={key === "supply_history_allowed" ? "checkbox" : "text"}
                name={key}
                value={formDrive[key]}
                onChange={handleDriveChange}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-2 focus:ring-blue-400"
                readOnly={key === "drive_id"} 
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-5 ">
          <button
            type="button"
            onClick={() => setDrivechoose(false)}
            className="text-white hover:bg-red-700 font-bold bg-slate-500 rounded-lg text-sm px-5 py-2.5 transition flex-1 my-7"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#005f69] hover:bg-[#004b52] font-medium rounded-lg text-sm px-5 py-2.5 transition flex-1 my-7"
          >
            Update Drive
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      

{choose && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-1/2">
      <h2 className="text-3xl text-[#005f69] font-bold mb-6 text-center my-7">Update Company</h2>

      <form action="#" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">ID</label>
            <input
              type="text"
              name="company_id"
              value={formData.company_id}
              readOnly
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">Contact Person</label>
            <input
              type="text"
              name="contact_person_name"
              value={formData.contact_person_name}
              onChange={handleChange}
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">Email</label>
            <input
              type="email"
              name="official_mail"
              value={formData.official_mail}
              onChange={handleChange}
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">Phone</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#005f69] mb-4">Website</label>
            <input
              type="url"
              name="website_link"
              value={formData.website_link}
              onChange={handleChange}
              className="bg-gray-200 border-[#005f69] text-[#005f69] text-lg rounded-lg w-full p-2.5"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 ">
          <button
            type="button"
            onClick={() => setChoose(false)}
            className="text-white hover:bg-red-700 font-bold bg-slate-500 rounded-lg text-sm px-5 py-2.5 transition flex-1 my-7"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#005f69] hover:bg-[#004b52] font-medium rounded-lg text-sm px-5 py-2.5 transition flex-1 my-7"
          >
            Update Drive
          </button>
        </div>
      </form>
    </div>
  </div>
)}


 

    </div>
  );
};

export default Dashboard;
