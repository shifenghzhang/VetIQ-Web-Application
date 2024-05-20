'use client';
import React, { FormEvent } from 'react';



const RegisterCard = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform registration logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="Username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Username"
          type="Username"
          placeholder="Username"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button
          className="w-full bg-[rgb(0,146,226)] hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
      </button>
    </form>

  );
};

export default RegisterCard;