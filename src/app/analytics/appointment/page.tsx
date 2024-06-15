"use client";
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Select from 'react-select';
import { clinicOptions, yearOptions, handleClinicChange, handleYearChange } from '../../_components/DropdownOptions';
import { type Option } from '../../_components/DropdownOptions';
import { LoadReturningPatientsData, LoadConfirmedAppointmentsData, LoadTotalAppointmentsData,
          LoadRetentionAndAcquisitionData, LoadAttendedAppointmentsData, LoadPatientsComparisonData,
           LoadAppointmentDuration, AnimalAppointmentPercentages} from './LoadData'; // Import charts or other data


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
        <Grid item xs={12} md={3}>
          <Box sx={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Scheduled Appointments
            </Typography>
            <LoadTotalAppointmentsData selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Confirmed Appointments
            </Typography>
            <LoadConfirmedAppointmentsData selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Appointments Attended
            </Typography>
            <LoadAttendedAppointmentsData selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Returning Patients
              </Typography>
              <LoadReturningPatientsData selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Trends in Patient Retention & Acquisition 
                </Typography>
                <LoadRetentionAndAcquisitionData selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '465px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  New Patient vs. Returning Patient
                </Typography>
                <LoadPatientsComparisonData selectedClinic={selectedClinic} selectedYear={selectedYear} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7.5}>
          <Box sx={{ height: '250px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Appointment Duration
            </Typography>
            <LoadAppointmentDuration selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4.5}>
          <Box sx={{ height: '250px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #ccc', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
               Animal Appointment Percentages
            </Typography>
            <AnimalAppointmentPercentages selectedClinic={selectedClinic} selectedYear={selectedYear} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Page;