import React from 'react'

function page() {
  return (
    <div>
      <div className="flex items-center mb-4 w-full max-w-xl">
        {/* Add your dropdown menus here */}
        <select className="mr-3.5 py-2 px-20 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="clinic">Clinic</option>
          {/* Add options here */}
        </select>

        <select className="mr-3.5 py-2 px-10 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="month">Year</option>
          {/* Add options here */}
        </select>

        <select className="mr-3.5 py-2 px-10 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="month">Quarter</option>
          <option value="month">Quarter 1</option>
          <option value="month">Quarter 2</option>
          <option value="month">Quarter 3</option>
          <option value="month">Quarter 4</option>
          {/* Add month options here */}
        </select>
      </div>

      {/* Add graphs and other components here */}
      <div className="graph-container mb-4">
        {/* Graph will go here */}
        <div className="h-32 bg-gray-300 rounded-lg" />
      </div>

      <div className="graph-container mb-4">
        
        <div className="h-32 bg-gray-300 rounded-lg" />
      </div>

      <div className="graph-container mb-4">
        
        <div className="h-32 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}

export default page;