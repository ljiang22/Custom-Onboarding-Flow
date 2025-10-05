'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '../../types';
import { userApi } from '../../lib/api';

export default function DataPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    try {
      const usersData = await userApi.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load users:', error);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
      return;
    }

    setDeletingUser(email);
    try {
      await userApi.deleteUser(email);
      setMessage(`User ${email} deleted successfully`);
      setTimeout(() => setMessage(''), 3000);
      // Reload the users list
      await loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError(`Failed to delete user ${email}`);
    } finally {
      setDeletingUser(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayStep = (currentStep: number) => {
    // If currentStep is 4 or higher, it means onboarding is complete
    if (currentStep >= 4) {
      return 'Completed';
    }
    return `Step ${currentStep}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Data</h1>
              <p className="mt-2 text-gray-600">
                View all user data collected through the onboarding process.
              </p>
            </div>
            {users.length > 0 && (
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ALL ${users.length} users? This action cannot be undone.`)) {
                    Promise.all(users.map(user => userApi.deleteUser(user.email)))
                      .then(() => {
                        setMessage('All users deleted successfully');
                        setTimeout(() => setMessage(''), 3000);
                        loadUsers();
                      })
                      .catch(error => {
                        console.error('Failed to delete all users:', error);
                        setError('Failed to delete all users');
                      });
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete All Users
              </button>
            )}
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {users.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-500">No user data available yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      About Me
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Birthdate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.currentStep >= 4
                            ? 'bg-green-100 text-green-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {getDisplayStep(user.currentStep)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <div className="truncate">
                          {user.aboutMe || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.address ? (
                          <div>
                            <div>{user.address.street}</div>
                            <div>{user.address.city}, {user.address.state} {user.address.zip}</div>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          disabled={deletingUser === user.email}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingUser === user.email ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Deleting...
                            </>
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}
