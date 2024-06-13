"use client";
import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Select from 'react-select';
import { clinicOptions, yearOptions, handleClinicChange, handleYearChange } from '../../_components/DropdownOptions';
import { type Option } from '../../_components/DropdownOptions';
import { LoadPieChart_DataPoint1, LoadBarChart_DataPoint2, LoadPieChart_DataPoint3, 
          LoadServiceRevenue, LoadServiceRevenueWOConsultation, LoadTopServices } from './LoadData'; // Import charts or other data


function Page() {
  const [selectedClinic, setSelectedClinic] = useState<number[]>([]); 
  const [selectedYear, setSelectedYear] = useState<number[]>([]); 

  return (
    <div className="dashboard-container">
      <div className="flex items-center mb-4 w-full max-w-xl">
        <Select
          isMulti
          options={clinicOptions}
          className="mr-3.5 w-full"
          placeholder="Select Clinic"
          onChange={(selectedOptions) => setSelectedClinic(handleClinicChange(selectedOptions as Option[]))}
          value={selectedClinic.map(value => clinicOptions.find(option => option.value === value))}
        />
        <Select
          isMulti
          options={yearOptions}
          className="mr-3.5 w-full"
          placeholder="Select Year"
          onChange={(selectedOptions) => setSelectedYear(handleYearChange(selectedOptions as Option[]))}
          value={selectedYear.map(value => yearOptions.find(option => option.value === value))}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <LoadServiceRevenue selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <LoadServiceRevenueWOConsultation selectedClinic={selectedClinic} selectedYear={selectedYear} />
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
                <LoadBarChart_DataPoint2 selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Box sx={{ height: '380px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <LoadTopServices selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services contributed to the revenue</h2>
            <LoadPieChart_DataPoint3 selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '350px', backgroundColor: '#e0e0e0', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <h2>Percentage of services used</h2>
            <LoadPieChart_DataPoint1 selectedClinic={selectedClinic} selectedYear={selectedYear} />
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