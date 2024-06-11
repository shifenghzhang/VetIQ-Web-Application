"use client";
import React from 'react';
import { Grid, Box } from '@mui/material';
import {LoadPieChart_DataPoint1, LoadBarChart_DataPoint2, LoadPieChart_DataPoint3, 
          LoadServiceRevenue, LoadServiceRevenueWOConsultation, LoadTopServices} from './LoadData'; // Import charts or other data

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
    
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <LoadServiceRevenue />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
          <LoadServiceRevenueWOConsultation />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
     
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9.5}>
              <Box sx={{ height: '380px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <h2>Total Revenue from Type of Services</h2>
                <LoadBarChart_DataPoint2 />
              </Box>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Box sx={{ height: '380px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <LoadTopServices />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services contributed to the revenue</h2>
            <LoadPieChart_DataPoint3 />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services used</h2>
            <LoadPieChart_DataPoint1 />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}></Box>
        </Grid>
      </Grid>

    </div>
  );
}

export default Page;

