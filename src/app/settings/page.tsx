"use client";
import React, { useState } from 'react';

type Tab = 'Profile' | 'Password' | 'Security' | 'Email' | 'Notifications';

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO Add change password logic
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    // Reset form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
                {/* TODO */}
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
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
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
                {/* TODO */}
              </div>
            )}
            {activeTab === 'Email' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Email Settings</h2>
                {/* TODO */}
              </div>
            )}
            {activeTab === 'Notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                {/* TODO */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;