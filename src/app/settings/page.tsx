"use client";
import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface MongoUsers {
  consulting_vet: boolean;
  email: string | null;
  password: string;
  site_id: number;
  user_id: number;
  user_name: string | null;
}
interface PutResponse {
  message: string;
}

type Tab = 'Profile' | 'Password' | 'Security' | 'Email' | 'Notifications';

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [name, setName] = useState('');
  const [consultingVet, setConsultingVet] = useState<boolean>(false);

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false
  });
  const [notificationFrequency, setNotificationFrequency] = useState('immediate');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = 'test@tester.com'; // Replace with the actual user's email or user ID
  
        // Fetch the user from MongoDB
        const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users');
        const user = response.data.find((user) => user.email === userEmail);
  
        if (user) {
          setName(user.user_name || '');
          setConsultingVet(user.consulting_vet);
          // Set other user data fields
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      setPasswordSuccess(false);
      return;
    }
  
    try {
      // Get the current user's email or user ID (you may need to adjust this based on your authentication system)
      const userEmail = 'test@tester.com'; // Replace with the actual user's email or user ID
  
      // Fetch the user from MongoDB
      const response = await axios.get<MongoUsers[]>('http://127.0.0.1:5000/api/mongo_users');
      const user = response.data.find((user) => user.email === userEmail);
  
      if (!user) {
        setPasswordError('User not found');
        setPasswordSuccess(false);
        return;
      }
      
      console.log(user.user_id);

      // Check if the current password matches the password stored in MongoDB
      if (currentPassword !== user.password) {
        setPasswordError('Current password is incorrect');
        setPasswordSuccess(false);
        return;
      }
  
      // Update the user's password in MongoDB
      const updatedUser: MongoUsers = {
        ...user,
        password: newPassword,
      };

      const putResponse = await axios.put<PutResponse>(
        `http://127.0.0.1:5000/api/update_mongo_user_password/${user.user_id}`,
        updatedUser
      );
  
      if (putResponse.status === 200) {
        // Password updated successfully
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setPasswordSuccess(true);
      } else {
        // Handle error case
        setPasswordError('An error occurred while updating the password.');
        setPasswordSuccess(false);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        setPasswordError(error.response.data.error || 'An error occurred while updating the password.');
      } else if (error.request) {
        // Request was made but no response was received
        setPasswordError('No response received from the server.');
      } else {
        setPasswordError('An error occurred while setting up the request.');
      }
    } else {
      setPasswordError('An unexpected error occurred.');
    }
    setPasswordSuccess(false);
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

  const handleSecurityUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 2FA
    console.log('Two-Factor Authentication:', twoFactorAuth);
  };

  const handleNotificationUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Notif
    console.log('Notification Preferences:', notificationPreferences);
    console.log('Notification Frequency:', notificationFrequency);
  };

  const handlePastePrevent = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-customSkyBlue shadow rounded-lg max-w-8xl mx-auto">
        <nav className="flex space-x-4 px-6 py-4">
          <button
            onClick={() => handleTabChange('Profile')}
            className={`${
              activeTab === 'Profile'
                ? 'bg-customBlack text-white'
                : 'text-black hover:bg-customBlack hover:bg-opacity-80 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabChange('Password')}
            className={`${
              activeTab === 'Password'
                ? 'bg-customBlack text-white'
                : 'text-black hover:bg-customBlack hover:bg-opacity-80 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Password
          </button>
          <button
            onClick={() => handleTabChange('Security')}
            className={`${
              activeTab === 'Security'
                ? 'bg-customBlack text-white'
                : 'text-black hover:bg-customBlack hover:bg-opacity-80 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Security
          </button>
          <button
            onClick={() => handleTabChange('Email')}
            className={`${
              activeTab === 'Email'
                ? 'bg-customBlack text-white'
                : 'text-black hover:bg-customBlack hover:bg-opacity-80 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Email
          </button>
          <button
            onClick={() => handleTabChange('Notifications')}
            className={`${
              activeTab === 'Notifications'
                ? 'bg-customBlack text-white'
                : 'text-black hover:bg-customBlack hover:bg-opacity-80 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Notifications
          </button>
        </nav>
          <div className="p-6">
            {activeTab === 'Profile' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Username</label>
                    <p className="text-gray-600">{name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Consulting Vet</label>
                    <p className="text-gray-600">{consultingVet ? 'Yes' : 'No'}</p>
                  </div>
              </div>
            )}
            {activeTab === 'Password' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Password Settings</h2>
                {passwordSuccess && (
                  <p className="text-green-500 mb-4">Password updated successfully!</p>
                )}
                {passwordError && (
                  <p className="text-red-500 mb-4">{passwordError}</p>
                )}
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      onPaste={handlePastePrevent}
                      required
                    />
                  </div>
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
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}
            {activeTab === 'Security' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                <form onSubmit={handleSecurityUpdate}>
                  <div className="flex items-center mb-4">
                    <label htmlFor="twoFactorAuth" className="text-gray-700 font-bold mr-4">
                      Two-Factor Authentication
                    </label>
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    />
                  </div>
                </form>
              </div>
            )}
            {activeTab === 'Notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                <form onSubmit={handleNotificationUpdate}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Notification Preferences
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={notificationPreferences.email}
                        onChange={(e) =>
                          setNotificationPreferences({
                            ...notificationPreferences,
                            email: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="notificationFrequency" className="block text-gray-700 font-bold mb-2">
                      Notification Frequency
                    </label>
                    <select
                      id="notificationFrequency"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={notificationFrequency}
                      onChange={(e) => setNotificationFrequency(e.target.value)}
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;