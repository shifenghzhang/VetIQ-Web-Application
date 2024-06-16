"use client";
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Select from 'react-select';
import { clinicOptions, yearOptions, handleClinicChange, handleYearChange } from '../../_components/DropdownOptions';
import { type Option } from '../../_components/DropdownOptions';
import { LoadReturningPatientsData, LoadConfirmedAppointmentsData, LoadTotalAppointmentsData,
          LoadRetentionAndAcquisitionData, LoadAttendedAppointmentsData, LoadPatientsComparisonData,
          LoadAppointmentDuration, AnimalAppointmentPercentages} from './LoadData'; // Import charts or other data
import AppointmentModal from '~/app/_components/appointmentModal';
import { useAuth } from '~/app/_contexts/authProvider';
import axios from 'axios';

interface MongoUsers {
  consulting_vet: boolean;
  email: string | null;
  password: string;
  site_id: number;
  user_id: number;
  user_name: string | null;
  analytics_appointment_survey?: string; // Optional property
}

interface PostResponse {
  message: string;
}

function Page() {
  const [selectedClinic, setSelectedClinic] = useState<number[]>([]); 
  const [selectedYear, setSelectedYear] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasCheckedSurveyStatus, setHasCheckedSurveyStatus] = useState(false);
  const {user} = useAuth();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const checkSurveyStatus = async () => {
      try {
        if (!user) {
          return;
        }        
        const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users');
        const currentUser = response.data.find(mongo_user => mongo_user.user_id === user.user_id);
        
        if (currentUser && !currentUser.analytics_appointment_survey) {
          console.log("Survey not taken yet. Setting timer to show modal.");
          const timer = setTimeout(() => {
            setIsModalOpen(true);
          }, 1000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error checking survey status:", error);
      } finally {
        setHasCheckedSurveyStatus(true);
      }
    };

    if (user && !hasCheckedSurveyStatus) {
      void checkSurveyStatus();
    }
  }, [user, hasCheckedSurveyStatus]);

  useEffect(() => {
    if (user) {
      setHasCheckedSurveyStatus(false);
    }
  }, [user]);

  const handleModalSubmit = async (answers: string) => {
    console.log("Submitting survey data:", answers);

    try {
      const postResponse = await axios.post<PostResponse>('http://127.0.0.1:5000/api/add_analytics_appointment_survey', {
        user_id: user?.user_id,
        new_data: answers
      });

      if (postResponse.status === 200) {
        console.log("Survey data submitted successfully: ", postResponse.data)
      } else {
        console.log("Failed to submit survey data");
      }      
    } catch(error) {
      console.error("Error submitting survey data:", error);
    }

    setIsModalOpen(false);
  };

  // Dropdown menu
  return (
    <div className="dashboard-container">
      {user &&
        <AppointmentModal 
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onSubmit={(answers) => handleModalSubmit(answers)}
        />
      }
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
