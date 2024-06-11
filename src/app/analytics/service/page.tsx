"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import {LoadPieChart_DataPoint1, LoadBarChart_DataPoint2, LoadPieChart_DataPoint3, 
          LoadServiceRevenue, LoadServiceRevenueWOConsultation, LoadTopServices} from './LoadData'; // Import charts or other data
import axios from 'axios';


function Page() {
  const [clinic, setClinic] = useState('');
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');

  useEffect(() => {
    if (clinic && year && quarter) {
      axios.get('/getOption/data', {
        params: { clinic, year, quarter }
      })
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [clinic, year, quarter]);

  return (
    <div className="dashboard-container">
      <div className="flex items-center mb-4 w-full max-w-xl">
        <select onChange={(e) => setClinic(e.target.value)} className="mr-3.5 py-2 px-20 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="all clinics">Clinic</option>
          <option value="clinic 3">Clinic 3</option>
          <option value="clinic 4">Clinic 4</option>
          <option value="clinic 5">Clinic 5</option>
          <option value="clinic 6">Clinic 6</option>
          <option value="clinic 7">Clinic 7</option>
        </select>

        <select onChange={(e) => setYear(e.target.value)} className="mr-3.5 py-2 px-10 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="all years">Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <select onChange={(e) => setQuarter(e.target.value)} className="mr-3.5 py-2 px-10 text-left rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="all quarters">Quarter</option>
          <option value="quarter 1">Quarter 1</option>
          <option value="quarter 2">Quarter 2</option>
          <option value="quarter 3">Quarter 3</option>
          <option value="quarter 4">Quarter 4</option>
        </select>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <LoadServiceRevenue/>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
          <LoadServiceRevenueWOConsultation/>
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
                <LoadBarChart_DataPoint2/>
              </Box>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Box sx={{ height: '380px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <LoadTopServices/>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services contributed to the revenue</h2>
            <LoadPieChart_DataPoint3/>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services used</h2>
            <LoadPieChart_DataPoint1/>
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

export default Page;

