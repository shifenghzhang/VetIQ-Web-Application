'use client';
import React, { FormEvent, useState } from 'react';
import RegisterCard from '../register/page';
import { useLoginCard } from '../_contexts/logincardContext';
import axios from 'axios';
import { useAuth } from '../_contexts/authProvider';
import ForgotPassword from '../forgotPassword/page';
import ChangePasswordCard from '../changePassword/page';

interface MongoUsers {
  consulting_vet: boolean;
  email: string | null;
  password: string;
  must_change_password?: boolean;
  site_id: number;
  user_id: number;
  user_name: string | null;
}

const LoginCard: React.FC = () => {
  const { setShowLoginCard, isLogin, toggleLogin } = useLoginCard();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users');
      for (const user of response.data) {
        if (user.email === email) {
          if (user.password === password) {
            if (user.must_change_password) {
              login(user);
              setShowChangePassword(true);
            }
            else {
              login(user);
              setShowLoginCard(false);
            }
          } else {
            setErrorMessage("Incorrect user details");
          }
        } else {
          setErrorMessage("Incorrect user details");
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setShowLoginCard(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
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
        {!showForgotPassword && !showChangePassword && (
          <>
            <div className="flex mb-6">
              <button
                onClick={toggleLogin}
                className={`font-bold flex-1 text-xl pb-2 ${isLogin ? 'text-[rgb(0,146,226)] border-b-2 border-[rgb(0,146,226)]' : 'text-black'}`}
              >
                Login
              </button>
              <button
                onClick={toggleLogin}
                className={`font-bold flex-1 text-xl pb-2 ${!isLogin ? 'text-[rgb(0,146,226)] border-b-2 border-[rgb(0,146,226)]' : 'text-black'}`}
              >
                Register
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="mt-4 text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>
                {errorMessage && <p className="text-red-500 text-sm mt-3">{errorMessage}</p>}
              </form>
            ) : (
              <RegisterCard />
            )}
            </>
        )}
        {showForgotPassword && (
          <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        )}
        {showChangePassword && (
          <ChangePasswordCard email={email} onPasswordChange={() => setShowLoginCard(false)} />
          <div>
            <h3 className="text-lg font-bold mb-2">Forgot password?</h3>
            <p className="text-sm mb-4">No worries, we&apos;ll send you reset instructions.</p>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold" htmlFor="forgotEmail">
                Enter your email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 text-center">
              <button
                className="w-full bg-[rgb(0,146,226)] hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleResetPassword}
              >
                Reset password
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => setShowForgotPassword(false)}
              >
                &lt; Back to log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginCard;