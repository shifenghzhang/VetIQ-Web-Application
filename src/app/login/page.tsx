'use client';
import React, { FormEvent, useState } from 'react';
import RegisterCard from '../register/page';
import { useLoginCard } from '../_contexts/logincardContext';

const LoginCard: React.FC = () => {
  const { setShowLoginCard } = useLoginCard();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleClose = () => {
    setShowLoginCard(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2 py-1 focus:outline-none"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="flex mb-6">
          <button
            onClick={handleToggle}
            className={`font-bold flex-1 text-xl pb-2 ${isLogin ? 'text-[rgb(0,146,226)] border-b-2 border-[rgb(0,146,226)]' : 'text-black'}`}
          >
            Login
          </button>
          <button
            onClick={handleToggle}
            className={`font-bold flex-1 text-xl pb-2 ${!isLogin ? 'text-[rgb(0,146,226)] border-b-2 border-[rgb(0,146,226)]' : 'text-black'}`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleSubmit}>
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
            <div className="mt-4 text-center">
              <button
                className="w-full bg-[rgb(0,146,226)] hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        ) : (
          <RegisterCard />
        )}
      </div>
    </div>
  );
};

export default LoginCard;
