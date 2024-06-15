import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart_DataPoint11 from './BarChart_DataPoint11';
import DonutChart_DataPoint11 from './DonutChart_DataPoint11';
import StopwatchPieChart from './DonutChart_DataPoint13';
import AnimalAppointmentPieChart from './PieChart_DataPoint14';

// Filter function to build query string 
const buildQueryString = (selectedClinic: number[], selectedYear: number[]) => {
  let query = '';
  if (selectedClinic.length > 0) {
    query += `ClinicID=${selectedClinic.join(',')}&`;
  }
  if (selectedYear.length > 0) {
    query += `Year=${selectedYear.join(',')}&`;
  }
  return query.slice(0, -1);
};

// Loading Data Point 7
interface ReturningPatientsData {
    ReturningPatientsPercentage: number;
    ReturningPatientsCount: number;
  }
  
  const LoadReturningPatientsData: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
    const [patientsData, setPatientsData] = useState<ReturningPatientsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const queryString = buildQueryString(selectedClinic, selectedYear);
          console.log('Fetching data with query string:', queryString);
          const response = await axios.get<ReturningPatientsData>(`http://127.0.0.1:5000/api/appointmentData/returningPatientsScheduledInfo?${queryString}`);
          setPatientsData(response.data);
        } catch (err) {
          console.error('Error fetching data:', err);
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
        setLoading(false);
      };
  
      void fetchData();
    }, [selectedClinic, selectedYear]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!patientsData) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        <p style={{ fontSize: '18px', marginBottom: '5px' }}>{patientsData.ReturningPatientsCount} ({patientsData.ReturningPatientsPercentage.toFixed(2)}%)</p>
      </div>
    );
  };

interface ConfirmedAppointmentsData {
    ConfirmedAppointmentsPercentage: number;
    ConfirmedAppointmentsCount: number;
  }
  
  const LoadConfirmedAppointmentsData: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
    const [appointmentsData, setAppointmentsData] = useState<ConfirmedAppointmentsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const queryString = buildQueryString(selectedClinic, selectedYear);
          console.log('Fetching data with query string:', queryString);
          const response = await axios.get<ConfirmedAppointmentsData>(`http://127.0.0.1:5000/api/appointmentData/confirmedAppointmentsInfo?${queryString}`);
          setAppointmentsData(response.data);
        } catch (err) {
          console.error('Error fetching data:', err);
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
        setLoading(false);
      };
  
      void fetchData();
    }, [selectedClinic, selectedYear]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!appointmentsData) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        <p style={{ fontSize: '18px', marginBottom: '5px' }}>{appointmentsData.ConfirmedAppointmentsCount} ({appointmentsData.ConfirmedAppointmentsPercentage.toFixed(2)}%)</p>
      </div>
    );
  };  
  
// Loading Data Point 8
interface TotalAppointmentsData {
    TotalAppointmentsCount: number;
}
  
const LoadTotalAppointmentsData: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
    const [appointmentsData, setAppointmentsData] = useState<TotalAppointmentsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const queryString = buildQueryString(selectedClinic, selectedYear);
          console.log('Fetching data with query string:', queryString);
          const response = await axios.get<TotalAppointmentsData>(`http://127.0.0.1:5000/api/appointmentData/totalAppointmentsCount?${queryString}`);
          setAppointmentsData(response.data);
        } catch (err) {
          console.error('Error fetching data:', err);
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
        setLoading(false);
      };
  
      void fetchData();
    }, [selectedClinic, selectedYear]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!appointmentsData) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        <p style={{ fontSize: '18px', marginBottom: '5px' }}>{appointmentsData.TotalAppointmentsCount}</p>
      </div>
    );
  };
  
//Data Point 9
interface AttendedAppointmentsData {
  AttendedAppointmentsPercentage: number;
  AttendedAppointmentsCount: number;
}

const LoadAttendedAppointmentsData: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
  const [appointmentsData, setAppointmentsData] = useState<AttendedAppointmentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<AttendedAppointmentsData>(`http://127.0.0.1:5000/api/appointmentData/attendedAppointmentsInfo?${queryString}`);
        setAppointmentsData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setLoading(false);
    };

    void fetchData();
  }, [selectedClinic, selectedYear]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!appointmentsData) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <p style={{ fontSize: '18px', marginBottom: '5px' }}>{appointmentsData.AttendedAppointmentsCount} ({appointmentsData.AttendedAppointmentsPercentage.toFixed(2)}%)</p>
    </div>
  );
};


interface PatientTypeData {
  ReturningPatientsPercentage: number;
  NewPatientsPercentage: number;
}

const LoadPatientsComparisonData: React.FC<{ selectedClinic: number[], selectedYear: number[]}> = ({ selectedClinic, selectedYear}) => {
  const [patientTypeData, setPatientTypeData] = useState<PatientTypeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Adjusted endpoint based on your API structure
        const queryString = `clinic=${selectedClinic.join(',')}&year=${selectedYear.join(',')}`;
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<PatientTypeData>(`http://127.0.0.1:5000/api/appointmentData/patientType?${queryString}`);
        setPatientTypeData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setLoading(false);
    };

    void fetchData();
  }, [selectedClinic, selectedYear]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!patientTypeData) {
    return <p>No data available</p>;
  }

  // Assuming data structure for DonutChart_DataPoint1
  const dataForDonutChart = [
    { TransactionTypeName: 'Returning Patients', PercentageUsage: patientTypeData.ReturningPatientsPercentage },
    { TransactionTypeName: 'New Patients', PercentageUsage: patientTypeData.NewPatientsPercentage }
  ];

  return (
    <DonutChart_DataPoint11 data={dataForDonutChart} />
  );
};



//Data point 11
interface RetentionAndAcquisitionData {
    AppointmentYear: number;
    TotalAppointments: number;
    NewPatientVisits: number;
    ReturningPatientVisits: number;
    RetentionRatePercentage: number;
  }
  
  const LoadRetentionAndAcquisitionData: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
    const [retentionData, setRetentionData] = useState<RetentionAndAcquisitionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const queryString = buildQueryString(selectedClinic, selectedYear);
          console.log('Fetching data with query string:', queryString);
          const response = await axios.get<RetentionAndAcquisitionData[]>(`http://127.0.0.1:5000/api/appointmentData/patientRetentionAndAcquisition?${queryString}`);
          setRetentionData(response.data);
        } catch (err) {
          console.error('Error fetching data:', err);
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
        setLoading(false);
      };
  
      void fetchData();
    }, [selectedClinic, selectedYear]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (retentionData.length === 0) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        <BarChart_DataPoint11 data={retentionData} />
      </div>
    );
  };


//Data Point 13
interface AppointmentDurationStats {
  AppointmentYear: number;
  AppointmentMonth: number;
  MinDuration: number;
  AvgDuration: number;
  MaxDuration: number;
}

const LoadAppointmentDuration: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
  const [durationStats, setDurationStats] = useState<AppointmentDurationStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<AppointmentDurationStats[]>(`http://127.0.0.1:5000/api/appointmentData/appointmentDurationStats?${queryString}`);
        setDurationStats(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setLoading(false);
    };

    void fetchData();
  }, [selectedClinic, selectedYear]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (durationStats.length === 0) {
    return <p>No data available</p>;
  }

  // Ensure durationStats[0] is defined before rendering StopwatchPieChart components
  const { MinDuration, AvgDuration, MaxDuration } = durationStats[0] ?? {};

  return (
    <div style={{ display: 'flex', gap: '1px' }}>
        {MinDuration !== undefined && (
          <StopwatchPieChart duration={MinDuration} label="Min" />
        )}

        {AvgDuration !== undefined && (
          <StopwatchPieChart duration={AvgDuration} label="Avg" />
        )}

        {MaxDuration !== undefined && (
          <StopwatchPieChart duration={MaxDuration} label="Max" />
        )}
      </div>
  );
};

//Data Point 14
interface AnimalAppointmentData {
  AnimalCategory: string;
  TotalAppointments: number;
  AttendedAppointmentsCount: number;
  AttendedAppointmentsPercentage: number;
}

const AnimalAppointmentPercentages: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
  const [animalData, setAnimalData] = useState<AnimalAppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<AnimalAppointmentData[]>(`http://127.0.0.1:5000/api/appointmentData/petAnimalPercentages?${queryString}`);
        setAnimalData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setLoading(false);
    };

    void fetchData();
  }, [selectedClinic, selectedYear]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(animalData) || animalData.length === 0) {
    return <p>No data available</p>;
  }


  return (
    <div>
      <AnimalAppointmentPieChart
        data={animalData.map(item => ({
          AnimalCategory: item.AnimalCategory,
          AttendedAppointmentsPercentage: item.AttendedAppointmentsPercentage,
        }))} />
    </div>
  );
};


export { LoadReturningPatientsData, LoadConfirmedAppointmentsData, LoadTotalAppointmentsData, LoadRetentionAndAcquisitionData,
          LoadAttendedAppointmentsData, LoadPatientsComparisonData, LoadAppointmentDuration, AnimalAppointmentPercentages
        };