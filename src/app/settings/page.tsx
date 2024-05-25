"use client";
import React, { useState } from 'react';

type Tab = 'Profile' | 'Password' | 'Security' | 'Email' | 'Notifications';

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [email, setEmail] = useState('');

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false
  });
  const [notificationFrequency, setNotificationFrequency] = useState('immediate');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Password Change
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Profile
    console.log('Name:', name);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Phone Number:', phoneNumber);
  };

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 2FA
    console.log('Two-Factor Authentication:', twoFactorAuth);
  };

  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update Email
    console.log('Email:', email);
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Notif
    console.log('Notification Preferences:', notificationPreferences);
    console.log('Notification Frequency:', notificationFrequency);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg max-w-8xl mx-auto">
          <nav className="flex space-x-4 px-6 py-4">
            <button
              onClick={() => handleTabChange('Profile')}
              className={`${
                activeTab === 'Profile'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange('Password')}
              className={`${
                activeTab === 'Password'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Password
            </button>
            <button
              onClick={() => handleTabChange('Security')}
              className={`${
                activeTab === 'Security'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Security
            </button>
            <button
              onClick={() => handleTabChange('Email')}
              className={`${
                activeTab === 'Email'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Email
            </button>
            <button
              onClick={() => handleTabChange('Notifications')}
              className={`${
                activeTab === 'Notifications'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Notifications
            </button>
          </nav>
          <div className="p-6">
            {activeTab === 'Profile' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-gray-700 font-bold mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
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
            {activeTab === 'Password' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Password Settings</h2>
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
                  <div className="mb-4">
                    <label htmlFor="twoFactorAuth" className="block text-gray-700 font-bold mb-2">
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
            {activeTab === 'Email' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Email Settings</h2>
                <form onSubmit={handleEmailUpdate}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
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