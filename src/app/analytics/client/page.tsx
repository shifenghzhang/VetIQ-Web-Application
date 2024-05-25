"use client";
import React from 'react';
import {LoadBarChart, LoadPieChart } from './LoadData'; // Import your Test component

function Page() {
  return (
    <div className="dashboard-container">
      <div className="flex items-center mb-4 w-full max-w-xl">
        {/* Add your dropdowns here */}
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
          {/* Add more options here */}
        </select>
      </div>

      {/* Grid container */}
      <div className="grid-container">
        <div className="small-graph">
          <div className="h-32 bg-gray-300 rounded-lg">
          </div>
          <LoadPieChart />
          <LoadBarChart />
        </div>
        <div className="large-graph">
          <div className="h-32 bg-gray-300 rounded-lg">
          </div>
        </div>
        <div className="insights">
          <div className="h-32 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default Page;

