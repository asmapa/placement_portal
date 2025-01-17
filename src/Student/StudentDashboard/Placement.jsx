import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';
import Rit from '../../assets/placed_1.png';
import homeimage1 from '../../assets/placed_2.png';
import homeimage2 from '../../assets/placed_3.png';
const Placement = () => {
  const [selectedTab, setSelectedTab] = useState('on-campus'); // State to toggle between tabs

  // Updated on-campus drives data
  const onCampusDrives = [
    { 
      id: 1, 
      name: 'TCS', 
      applyLink: '#', 
      description: 
        ' Software Developer Develop scalable applications, perform code testing, and maintain system designs for global clients. Work with modern technologies like Java, Python, and cloud platforms.Eligibility: Minimum CGPA of 6.5 and strong programming skills .Apply now to kickstart your career with TCS and be part of a global leader in IT services.'
    },
    { 
      id: 2, 
      name: 'Infosys', 
      applyLink: '#', 
      description: 
        'Role: System Engineer\n' +
        'Responsibilities: Design and develop software solutions, ensure efficient deployment of applications, and troubleshoot system issues.\n' +
        'Eligibility: Open for all branches with a CGPA of 6 and above. Proficiency in coding (C++, Java) is a plus.\n' +
        'Join Infosys to shape your career in digital transformation and innovation. Apply today!'
    },
    { 
      id: 3, 
      name: 'Wipro', 
      applyLink: '#', 
      description: 
        'Role: Cloud Engineer\n' +
        'Responsibilities: Manage and deploy cloud-based solutions, automate system processes, and provide technical support for cloud infrastructure.\n' +
        'Eligibility: 60% or above throughout academics. Knowledge of AWS or Azure is preferred.\n' +
        'Start your journey with Wipro to explore exciting opportunities in cloud technology. Apply now!'
    },
    { 
      id: 4, 
      name: 'HCL Technologies', 
      applyLink: '#', 
      description: 
        'Role: Data Analyst\n' +
        'Responsibilities: Analyze and interpret complex datasets, create reports for clients, and suggest actionable insights to drive business growth.\n' +
        'Eligibility: CGPA of 7 and above. Basic knowledge of SQL and Python is required.\n' +
        'Apply now to become part of HCL Technologies and contribute to transforming data into powerful insights.'
    },
  ];
  
  // Updated off-campus drives data
  const offCampusDrives = [
    { 
      id: 1, 
      name: 'Google', 
      applyLink: '#', 
      description: 'Google is a global tech giant offering cutting-edge solutions in AI, cloud computing, and digital advertising.' 
    },
    { 
      id: 2, 
      name: 'Microsoft', 
      applyLink: '#', 
      description: 'Microsoft is a leader in software development, cloud computing, and enterprise solutions.' 
    },
  ];

  return (
    <div>


      {/* Carousel Section */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto h-80">
        <Carousel className="w-full mx-auto">
          <div className="h-80">
            <img
              src={Rit}
              alt="Image 1"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-80">
            <img
              src={homeimage1}
              alt="Image 2"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-80">
            <img
              src={homeimage2}
              alt="Image 3"
              className="h-full w-full object-cover"
            />
          </div>
        </Carousel>
      </div>


      {/* Placement Stats Section */}
      <div className="flex justify-around  mt-8">
        <div className="flex flex-col items-center flex-1 bg-Navy text-white p-4 rounded-lg mx-2 shadow-md">
          <h2 className="text-lg font-bold">Placements Attended</h2>
          <p className="text-4xl font-bold">6</p>
        </div>
        <div className="flex flex-col items-center flex-1 bg-blue-950 text-white p-4 rounded-lg mx-2 shadow-md">
          <h2 className="text-lg font-bold">Number of Offers</h2>
          <p className="text-4xl font-bold">1</p>
        </div>
        <div className="flex flex-col items-center flex-1 bg-blue-900 text-white p-4 rounded-lg mx-2 shadow-md">
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
            {/* Grid Layout for On-Campus Drives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {onCampusDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="flex flex-col items-center p-4 border-4 border-Navy  rounded-lg shadow"
                >
                  <span className="font-bold text-Navy w-full h-10 text-2xl text-center rounded-lg">
                    {drive.name}
                  </span>
                  <hr className='border-Navy w-full my-2' />
                  <p className="mt-10 mb-10 text-blue-950">{drive.description}</p>
                  <a
                    href={drive.applyLink}
                    className="px-4 py-2 bg-Navy text-white rounded hover:bg-green-600"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedTab === 'off-campus' && (
          <div>
            <h3 className="text-lg font-bold mb-2">Off-Campus Drives</h3>
            {/* Grid Layout for Off-Campus Drives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offCampusDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow"
                >
                  <span className="font-medium">{drive.name}</span>
                  <p className="mt-10 mb-10 text-gray-700">{drive.description}</p>
                  <a
                    href={drive.applyLink}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Placement;
