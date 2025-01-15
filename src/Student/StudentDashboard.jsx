import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md p-6">
          <ul className="space-y-4">
            <li><a href="#" className="text-blue-600 font-medium hover:underline">Dashboard</a></li>
            <li><a href="#" className="hover:underline">Profile</a></li>
            <li><a href="#" className="hover:underline">Courses</a></li>
            <li><a href="#" className="hover:underline">Results</a></li>
            <li><a href="#" className="hover:underline">Settings</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Welcome, Student!</h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
              <p className="text-4xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">Pending Assignments</h3>
              <p className="text-4xl font-bold text-yellow-500">3</p>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">Completed Projects</h3>
              <p className="text-4xl font-bold text-green-500">5</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mt-8 bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-2">
              <li className="border-b py-2">Submitted assignment for "Web Development"</li>
              <li className="border-b py-2">Enrolled in "Data Structures and Algorithms"</li>
              <li className="border-b py-2">Completed project "React Dashboard"</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
