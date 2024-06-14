'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/resetPassword', { email: forgotEmail });
      if (response.status === 200) {
        setResetSuccess(true);
        setForgotEmail('');
      } else {
        setResetError(response.data.error || 'Failed to send password reset email');
      }
    } catch (error: unknown) {
      console.error('Error sending password reset email:', error);
      if (axios.isAxiosError(error) && error.response) {
        setResetError(error.response.data.error || 'An error occurred while sending the password reset email');
      } else {
        setResetError('An unknown error occurred while sending the password reset email');
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Forgot password?</h3>
      <p className="text-sm mb-4">No worries, we'll send you reset instructions.</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold" htmlFor="forgotEmail">
          Enter your email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
          required
          value={forgotEmail}
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
          onClick={onBack}
        >
          &lt; Back to log in
        </button>
      </div>
      {resetSuccess && <p className="text-green-500 text-sm mt-3">Password reset email sent successfully</p>}
      {resetError && <p className="text-red-500 text-sm mt-3">{resetError}</p>}
    </div>
  );
};

export default ForgotPassword;
