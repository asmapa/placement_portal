import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';
import Rit from '../../assets/placed_1.png';
import homeimage1 from '../../assets/placed_2.png';
import homeimage2 from '../../assets/placed_3.png';
import {
  FaUserGraduate, // For Placements Attended
  FaRegHandshake, // For Number of Offers
  FaUsers,        // For Ongoing Drives
} from 'react-icons/fa';

const Placement = () => {
  const [selectedTab, setSelectedTab] = useState('on-campus');
  const [selectedDrive, setSelectedDrive] = useState(null);

  // Updated on-campus drives data
  const onCampusDrives = [
    {
      id: 1,
      name: 'TCS',
      applyLink: 'https://careers.tcs.com',
      description:
        'Software Developer: Develop scalable applications, perform code testing, and maintain system designs for global clients.',
      eligibilityCourses: ['B.Tech (CSE, IT)', 'MCA'],
      eligibilityCriteria: 'Minimum CGPA: 6.5, No backlogs',
      timeline: {
        resumeSubmission: '2025-02-15',
        interviewDate: '2025-02-25',
      },
      workLocation: 'PAN India',
      remuneration: {
        training: '₹3.6 LPA',
        permanent: '₹5.5 LPA',
      },
    },
    {
      id: 2,
      name: 'Infosys',
      applyLink: 'https://careers.infosys.com',
      description:
        'System Engineer: Design and develop software solutions, ensure efficient deployment of applications, and troubleshoot system issues.',
      eligibilityCourses: ['B.Tech (All Branches)', 'M.Tech'],
      eligibilityCriteria: 'Minimum CGPA: 6.0, No backlogs',
      timeline: {
        resumeSubmission: '2025-02-20',
        interviewDate: '2025-02-28',
      },
      workLocation: 'Multiple Locations in India',
      remuneration: {
        training: '₹3.5 LPA',
        permanent: '₹5.0 LPA',
      },
    },
    {
      id: 3,
      name: 'Wipro',
      applyLink: 'https://careers.wipro.com',
      description:
        'Cloud Engineer: Manage and deploy cloud-based solutions, automate system processes, and provide technical support for cloud infrastructure.',
      eligibilityCourses: ['B.Tech (CSE, IT, ECE)'],
      eligibilityCriteria: '60% or above throughout academics, No backlogs',
      timeline: {
        resumeSubmission: '2025-02-18',
        interviewDate: '2025-03-01',
      },
      workLocation: 'Bangalore, Hyderabad, Pune',
      remuneration: {
        training: '₹3.2 LPA',
        permanent: '₹4.8 LPA',
      },
    },
  ];

  // Updated off-campus drives data
  const offCampusDrives = [
    {
      id: 1,
      name: 'Google',
      applyLink: 'https://careers.google.com',
      description: 'Software Engineer: Build scalable web solutions and innovative products.',
      eligibilityCourses: ['B.Tech (CSE, IT)', 'M.Tech', 'Ph.D.'],
      eligibilityCriteria: 'CGPA: 8.0+, No active backlogs',
      timeline: {
        resumeSubmission: '2025-03-01',
        interviewDate: '2025-03-15',
      },
      workLocation: 'Bangalore, Hyderabad',
      remuneration: {
        training: '₹15 LPA',
        permanent: '₹25 LPA',
      },
    },
    {
      id: 2,
      name: 'Microsoft',
      applyLink: 'https://careers.microsoft.com',
      description: 'Software Engineer: Work on cloud technologies, AI solutions, and enterprise tools.',
      eligibilityCourses: ['B.Tech (CSE, ECE)', 'M.Tech'],
      eligibilityCriteria: 'CGPA: 8.0+, No active backlogs',
      timeline: {
        resumeSubmission: '2025-03-05',
        interviewDate: '2025-03-20',
      },
      workLocation: 'Hyderabad, Bangalore',
      remuneration: {
        training: '₹12 LPA',
        permanent: '₹22 LPA',
      },
    },
  ];

  return (
    <div>
      {/* Carousel Section */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto h-80">
        <Carousel className="w-full mx-auto">
          <div className="h-80">
            <img src={Rit} alt="Image 1" className="h-full w-full object-cover" />
          </div>
          <div className="h-80">
            <img src={homeimage1} alt="Image 2" className="h-full w-full object-cover" />
          </div>
          <div className="h-80">
            <img src={homeimage2} alt="Image 3" className="h-full w-full object-cover" />
          </div>
        </Carousel>
      </div>

      {/* Placement Stats Section */}
      <div className="flex justify-around mt-8">
        <div className="flex flex-col items-center flex-1 bg-Navy text-white p-4 rounded-lg mx-2 shadow-md">
          <FaUserGraduate className="text-5xl mb-2" />
          <h2 className="text-lg font-bold">Placements Attended</h2>
          <p className="text-4xl font-bold">6</p>
        </div>
        <div className="flex flex-col items-center flex-1 bg-blue-950 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaRegHandshake className="text-5xl mb-2" />
          <h2 className="text-lg font-bold">Number of Offers</h2>
          <p className="text-4xl font-bold">1</p>
        </div>
        <div className="flex flex-col items-center flex-1 bg-blue-900 text-white p-4 rounded-lg mx-2 shadow-md">
          <FaUsers className="text-5xl mb-2" />
          <h2 className="text-lg font-bold">Ongoing Drives</h2>
          <p className="text-4xl font-bold">3</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className={`px-6 py-2 rounded-lg font-bold ${
            selectedTab === 'on-campus' ? 'bg-Navy text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('on-campus')}
        >
          On-Campus
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-bold ${
            selectedTab === 'off-campus' ? 'bg-Navy text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('off-campus')}
        >
          Off-Campus
        </button>
      </div>

      {/* Drives Section */}
      <div className="mt-4 px-4">
        {selectedTab === 'on-campus' && (
          <div>
            <h3 className="text-lg font-bold mb-2">On-Campus Drives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {onCampusDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="flex flex-col items-center p-4 border-4 border-Navy rounded-lg shadow"
                >
                  <span className="font-bold text-Navy w-full h-10 text-2xl text-center rounded-lg">
                    {drive.name}
                  </span>
                  <hr className="border-Navy w-full my-2" />
                  <p className="text-blue-950 text-center">{drive.description}</p>
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="px-4 py-2 bg-Navy text-white rounded hover:bg-green-600 mt-4"
                  >
                    More Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'off-campus' && (
          <div>
            <h3 className="text-lg font-bold mb-2">Off-Campus Drives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offCampusDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow"
                >
                  <span className="font-medium">{drive.name}</span>
                  <p className="text-gray-700 text-center">{drive.description}</p>
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
                  >
                    More Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drive Details Modal */}
      {selectedDrive && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-Navy text-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedDrive.name}</h2>
            <p className="mb-2"><strong>Description:</strong> {selectedDrive.description}</p>
            <p className="mb-2"><strong>Eligibility:</strong> {selectedDrive.eligibilityCourses.join(', ')}</p>
            <p className="mb-2"><strong>Criteria:</strong> {selectedDrive.eligibilityCriteria}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedDrive.workLocation}</p>
            <p className="mb-2"><strong>Remuneration:</strong> Training - {selectedDrive.remuneration.training}, Permanent - {selectedDrive.remuneration.permanent}</p>
            <p className="mb-2"><strong>Key Dates:</strong> Resume Submission - {selectedDrive.timeline.resumeSubmission}, Interview Date - {selectedDrive.timeline.interviewDate}</p>
            <a href={selectedDrive.applyLink} target="_blank" rel="noopener noreferrer" className="block mt-4 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600">
              Apply using Their Site
            </a>
          <a
  onClick={() => {
    alert(
      "You have successfully Registered, PREPARE WELL!!! THE DATA ARE AUTOMATICALLY ENTERED TO DATABASE. ARE YOU SURE??"
    );
    setSelectedDrive(null); // Close the popup after confirmation
  }}
  className="block mt-4 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
>
  Confirm Registration
</a>

            <button
              onClick={() => setSelectedDrive(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Placement;
