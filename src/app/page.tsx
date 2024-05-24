"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DimUser {
  AuditCreateDateTime: string;
  AuditJobID: number;
  AuditModifyFlag: string;
  AuditSourceCode: string | null;
  AuditUpdateDateTime: string;
  ClinicID: number;
  ConsultingVet: boolean;
  ContactMobileNoCode: string | null;
  ContactPhoneNoCode: string | null;
  Deactivated: boolean;
  DefaultClinicCode: string | null;
  EmailAddressString: string | null;
  EmployeeNoCode: string | null;
  LicenceAgreementDate: string | null;
  LicenceNoCode: string | null;
  SiteID: number;
  SiteNumber: number;
  SourceSystemCode: string;
  UserCode: string | null;
  UserID: number;
  UserName: string | null;
  UserNumber: number;
}

const Home = () => {
  const [data, setData] = useState<DimUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DimUser[]>('http://127.0.0.1:5000/api/users');
        setData(response.data);
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

    fetchData().catch(console.error); // Ensure promises are handled
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div>
      {/* <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.UserID}>{user.UserName}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Home;
