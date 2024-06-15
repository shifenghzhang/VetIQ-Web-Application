"use client";
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Select from 'react-select';
import { clinicOptions, yearOptions, handleClinicChange, handleYearChange } from '../../_components/DropdownOptions';
import { type Option } from '../../_components/DropdownOptions';
import { LoadDonutChart_DataPoint1, LoadBarChart_DataPoint2, LoadPieChart_DataPoint3, 
          LoadServiceRevenue, LoadServiceRevenueWOConsultation, LoadTopServices } from './LoadData'; // Import charts or other data


function Page() {
  const [selectedClinic, setSelectedClinic] = useState<number[]>([]); 
  const [selectedYear, setSelectedYear] = useState<number[]>([]); 

  //Dropdown menu
  return (
    <div className="dashboard-container">
      <div className="flex items-center mb-4 w-full max-w-xl"> 
        <Select //Create dropdown menu for selecting clinic
          isMulti
          options={clinicOptions}
          className="mr-3.5 w-full"
          placeholder="Select Clinic"
          onChange={(selectedOptions) => setSelectedClinic(handleClinicChange(selectedOptions as Option[]))}
          value={selectedClinic.map(value => clinicOptions.find(option => option.value === value))}
        />
        <Select //Create dropdown menu for selecting year
          isMulti
          options={yearOptions}
          className="mr-3.5 w-full"
          placeholder="Select Year"
          onChange={(selectedOptions) => setSelectedYear(handleYearChange(selectedOptions as Option[]))}
          value={selectedYear.map(value => yearOptions.find(option => option.value === value))}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4.75}>
          <Box sx={{ height: '125px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Total Revenue From Services
            </Typography>
            <LoadServiceRevenue selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4.75}>
          <Box sx={{ height: '125px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Revenue From Services (Excluding Consultation)
            </Typography>
            <LoadServiceRevenueWOConsultation selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9.5}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Revenue from Services
                </Typography>
                <LoadBarChart_DataPoint2 selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Top Services Contribution
                </Typography>
                <LoadTopServices selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '420px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Percentage of services contributed to the revenue
            </Typography>
            <LoadPieChart_DataPoint3 selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '420px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Percentage of services used
            </Typography>
            <LoadDonutChart_DataPoint1 selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Page;