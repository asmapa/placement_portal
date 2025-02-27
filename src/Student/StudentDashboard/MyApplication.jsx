import React from "react";

const PlacementList = () => {
  const companies = [
    { name: "Google", role: "Software Engineer", description: "Develop and maintain software solutions." },
    { name: "Microsoft", role: "Data Analyst", description: "Analyze and interpret complex data." },
    { name: "Amazon", role: "Cloud Engineer", description: "Manage cloud infrastructure and services." },
    { name: "Facebook", role: "UI/UX Designer", description: "Design user-friendly interfaces." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">My Job Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {companies.map((company, index) => (
          <div key={index} className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-2">{company.name}</h2>
            <p className="text-lg font-medium"><strong>Role:</strong> {company.role}</p>
            <p className="text-gray-700 mb-4">{company.description}</p>
            <button className="mt-2 px-4 py-2 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-800 transition">Result</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementList;