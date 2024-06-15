'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordCard: React.FC<{ email: string; onPasswordChange: () => void }> = ({ email, onPasswordChange }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/changePassword', {
        email,
        newPassword
      });
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully");
        setErrorMessage("");
        setTimeout(onPasswordChange, 1500); // Close the card after a short delay
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setErrorMessage(response.data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('An error occurred while changing the password');
    }
  };

  const checkPasswordStrength = (password: string) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (strongRegex.test(password)) {
      setPasswordStrength('strong');
    } else if (mediumRegex.test(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handlePastePrevent = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full relative">
        <h3 className="text-lg font-bold mb-2">Change Password</h3>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            onPaste={handlePastePrevent}
            required
          />
          <div className="mt-2">
            <span className={`text-sm ${
              passwordStrength === 'strong'
                ? 'text-green-500'
                : passwordStrength === 'medium'
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}>
              {passwordStrength === 'strong'
                ? 'Strong'
                : passwordStrength === 'medium'
                ? 'Medium'
                : 'Weak'}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onPaste={handlePastePrevent}
            required
          />
        </div>
        <div className="mt-4 text-center">
          <button
            className="w-full bg-[rgb(0,146,226)] hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mt-3">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-3">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordCard;
