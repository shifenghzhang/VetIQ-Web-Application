"use client";
import React, { useState } from 'react';

type Tab = 'Profile' | 'Password' | 'Email' | 'Notifications';

function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('Profile');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="bg-white shadow rounded-lg">
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
                {/* Add profile settings form fields */}
              </div>
            )}
            {activeTab === 'Password' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Password Settings</h2>
                {/* Add password change form fields */}
              </div>
            )}
            {activeTab === 'Email' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Email Settings</h2>
                {/* Add email settings */}
              </div>
            )}
            {activeTab === 'Notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                {/* Add notification settings */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;