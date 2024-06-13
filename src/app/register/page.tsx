'use client';
import React, { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoginCard } from '../_contexts/logincardContext';

interface MongoUsers {
  consulting_vet: boolean;
  email: string | null;
  password: string;
  site_id: number;
  user_id: number;
  user_name: string | null;
}
interface PostResponse {
  message: string;
}

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword]= useState("");
  const [errorMessage, setErroressage] = useState("");

  const {toggleLogin} = useLoginCard();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users')
      for (const user of response.data) {
        if (email === user.email) {
          setErroressage("User with this email already exists");
          return;
        }
      }
      const newUSer : MongoUsers = {
        email: email,
        consulting_vet: true,
        password: password,
        site_id: 3,
        user_id: response.data.length + 1,
        user_name: username

      }

      const postResponse = await axios.post<PostResponse>('http://127.0.0.1:5000/api/add_mongo_user', newUSer)
      console.log(postResponse.data);

      if (postResponse.data.message == "user added successfully") {
        toggleLogin();
      }

      
    }
    catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="Username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="username"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          required
          onChange = {(e) => setPassword(e.target.value)}
        />
      </div>
      <button
          className="w-full bg-[rgb(0,146,226)] hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-3">{errorMessage}</p>}
    </form>

  );
};

export default RegisterCard;