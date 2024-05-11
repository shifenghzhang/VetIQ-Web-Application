'use client';
import React, { FormEvent, useState } from 'react';
import RegisterCard from '../register/page';

interface LoginCardProps {
  onClose: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onClose }) => {
  const [showRegisterCard, setShowRegisterCard] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
  };

  const handleRegisterClick = () => {
    setShowRegisterCard(true);
  };

  const handleRegisterClose = () => {
    setShowRegisterCard(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2 py-1 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
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
          <div className="mt-4 text-center">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
      {showRegisterCard && (
      <RegisterCard onClose={handleRegisterClose} />
    )}
    </div>
  );
};

export default LoginCard;