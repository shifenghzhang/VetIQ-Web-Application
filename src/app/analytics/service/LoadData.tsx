import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart_DataPoint2 from './BarChart_DataPoint2';
import PieChart_DataPoint3 from './PieChart_DataPoint3';
import PieChart_DataPoint1 from './PieChart_DataPoint1';


//Loading Data Point 1
interface UsagePercentage {
  TransactionTypeName: string;
  PercentageUsage: number;
  TotalUsage: number;
}

const LoadPieChart_DataPoint1 = () => {
  const [usageData, setUsageData] = useState<UsagePercentage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UsagePercentage[]>('http://127.0.0.1:5000/api/serviceData/usedServicePercentage');
        const transformedUsageData = response.data.map(item => ({
          TransactionTypeName: item.TransactionTypeName,
          PercentageUsage: item.PercentageUsage,
          TotalUsage: item.TotalUsage
        }));
        setUsageData(transformedUsageData);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <PieChart_DataPoint1 data={usageData} />;
};

//Loading Data Point 2
interface ServiceTransaction {
  TransactionTypeName: string;
  Month: number;
  Count: number;
}

interface RevenuePercentage {
  TransactionTypeName: string;
  TotalRevenue: number;
  PercentageContribution: number;
}

const LoadBarChart_DataPoint2 = () => {
  const [transactionData, setData] = useState<ServiceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ServiceTransaction[]>('http://127.0.0.1:5000/api/serviceData/transactionServiceCounts');
        const transformedData = response.data.map(item => ({
          TransactionTypeName: item.TransactionTypeName,
          Month: item.Month,
          Count: item.Count
        }));
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

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

const LoadServiceRevenue = () => {
  const [revenueData, setRevenueData] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ServiceRevenue[]>('http://127.0.0.1:5000/api/serviceData/totalRevenueService');
        setRevenueData(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

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
const LoadServiceRevenueWOConsultation = () => {
  const [revenueData2, setRevenueData2] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ServiceRevenue[]>('http://127.0.0.1:5000/api/serviceData/totalRevenueServiceWithoutConsultation');
        setRevenueData2(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

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
        {revenueData2.map((service, index) => (
          <li key={index}>
            {service.TotalRevenue}
          </li>
        ))}
      </ul>
    </div>
  );
};

//Loading Data Point 3
const LoadPieChart_DataPoint3 = () => {
  const [revenueData, setRevenueData] = useState<RevenuePercentage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RevenuePercentage[]>('http://127.0.0.1:5000/api/serviceData/revenueServicePercentage');
        const transformedRevenueData = response.data.map(item => ({
          TransactionTypeName: item.TransactionTypeName,
          TotalRevenue: item.TotalRevenue,
          PercentageContribution: item.PercentageContribution
        }));
        setRevenueData(transformedRevenueData);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

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

const LoadTopServices = () => {
  const [listData, setListData] = useState<TopServices[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TopServices[]>('http://127.0.0.1:5000/api/serviceData/topServices');
        console.log('Response data:', response.data); // Log response data
        setListData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    void fetchData();
  }, []);
  

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


