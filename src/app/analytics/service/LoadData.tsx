import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart_DataPoint2 from './BarChart_DataPoint2';
import PieChart_DataPoint3 from './PieChart_DataPoint3';
import PieChart_DataPoint1 from './PieChart_DataPoint1';

// Helper function to build query string
const buildQueryString = (selectedClinic: number[], selectedYear: number[]) => {
  let query = '';
  if (selectedClinic.length > 0) {
    query += `ClinicID=${selectedClinic.join(',')}&`;
  }
  if (selectedYear.length > 0) {
    query += `Year=${selectedYear.join(',')}&`;
  }
  return query.slice(0, -1); // Remove trailing '&'
};

// Loading Data Point 1
interface UsagePercentage {
  TransactionTypeName: string;
  PercentageUsage: number;
  TotalUsage: number;
}

const LoadPieChart_DataPoint1: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
  const [usageData, setUsageData] = useState<UsagePercentage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<UsagePercentage[]>(`http://127.0.0.1:5000/api/serviceData/usedServicePercentage?${queryString}`);
        const transformedUsageData = response.data.map(item => ({
          TransactionTypeName: item.TransactionTypeName,
          PercentageUsage: item.PercentageUsage,
          TotalUsage: item.TotalUsage
        }));
        setUsageData(transformedUsageData);
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

  return <PieChart_DataPoint1 data={usageData} />;
};

// Loading Data Point 2
interface ServiceTransaction {
  TransactionTypeName: string;
  Month: number;
  Count: number;
}

const LoadBarChart_DataPoint2: React.FC<{ selectedClinic: number[], selectedYear: number[] }> = ({ selectedClinic, selectedYear }) => {
  const [transactionData, setData] = useState<ServiceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        console.log('Fetching data with query string:', queryString);
        const response = await axios.get<ServiceTransaction[]>(`http://127.0.0.1:5000/api/serviceData/transactionServiceCounts?${queryString}`);
        const transformedData = response.data.map(item => ({
          TransactionTypeName: item.TransactionTypeName,
          Month: item.Month,
          Count: item.Count
        }));
        setData(transformedData);
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

  return <BarChart_DataPoint2 data={transactionData} />;
};

//Another part of Data Point 2
interface ServiceRevenue {
  TransactionTypeName: string;
  TotalRevenue: number;
}

const LoadServiceRevenue = ({ selectedClinic, selectedYear }: { selectedClinic: number[], selectedYear: number[] }) => {
  const [revenueData, setRevenueData] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        const response = await axios.get<ServiceRevenue[]>(`http://127.0.0.1:5000/api/serviceData/totalRevenueService?${queryString}`);
        setRevenueData(response.data);
      } catch (err) {
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

  return (
    <div>
      <h2>Revenue From Services</h2>
      <ul>
        {revenueData.map((service, index) => (
          <li key={index}>
            {service.TotalRevenue}
          </li>
        ))}
      </ul>
    </div>
  );
};


//Another part of Data Point 2
const LoadServiceRevenueWOConsultation = ({ selectedClinic, selectedYear }: { selectedClinic: number[], selectedYear: number[] }) => {
  const [revenueData, setRevenueData] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        const response = await axios.get<ServiceRevenue[]>(`http://127.0.0.1:5000/api/serviceData/totalRevenueServiceWithoutConsultation?${queryString}`);
        setRevenueData(response.data);
      } catch (err) {
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

  return (
    <div>
      <h2>Revenue From Services Without Consultation</h2>
      <ul>
        {revenueData.map((service, index) => (
          <li key={index}>
            {service.TotalRevenue}
          </li>
        ))}
      </ul>
    </div>
  );
};


interface RevenuePercentage {
  TransactionTypeName: string;
  TotalRevenue: number;
  PercentageContribution: number; // Add PercentageContribution if it's part of your API response
}

//Loading Data Point 3
const LoadPieChart_DataPoint3 = ({ selectedClinic, selectedYear }: { selectedClinic: number[], selectedYear: number[] }) => {
  const [revenueData, setRevenueData] = useState<RevenuePercentage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        const response = await axios.get<RevenuePercentage[]>(`http://127.0.0.1:5000/api/serviceData/revenueServicePercentage?${queryString}`);
        setRevenueData(response.data);
      } catch (err) {
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

  return <PieChart_DataPoint3 data={revenueData} />;
};


//Another part of Data Point 3
interface TopServices {
  TransactionTypeName: string;
}
interface TopServices {
  TransactionTypeName: string;
}

const LoadTopServices = ({ selectedClinic, selectedYear }: { selectedClinic: number[], selectedYear: number[] }) => {
  const [listData, setListData] = useState<TopServices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryString = buildQueryString(selectedClinic, selectedYear);
        const response = await axios.get<TopServices[]>(`http://127.0.0.1:5000/api/serviceData/topServices?${queryString}`);
        setListData(response.data);
      } catch (err) {
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

  return (
    <div>
      <h2>Top Services Contribution</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((service, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>
            {index + 1}. {service.TransactionTypeName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LoadPieChart_DataPoint1, 
          LoadBarChart_DataPoint2, LoadServiceRevenue, LoadServiceRevenueWOConsultation,
          LoadPieChart_DataPoint3, LoadTopServices };


