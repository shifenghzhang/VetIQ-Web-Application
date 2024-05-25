import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import PieChart from './PieChart';

// Rest of your component code...

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

const LoadBarChart = () => {
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

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <BarChart data={transactionData} />;
};

const LoadPieChart = () => {
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

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <PieChart data={revenueData} />;
};

export { LoadBarChart, LoadPieChart };


