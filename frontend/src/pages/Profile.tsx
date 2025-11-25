import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userAPI, authAPI } from '../services/api';
import { formatDate } from '../utils/auth';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [success, setSuccess] = useState('');

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: authAPI.getProfile,
  });
  const { data: summaryData } = useQuery({
    queryKey: ['userSummary'],
    queryFn: userAPI.getSummary,
  });

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: () => {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      refetch();
    },
  });

  React.useEffect(() => {
    if (profileData?.data?.user) {
      setFormData({
        firstName: profileData.data.user.firstName,
        lastName: profileData.data.user.lastName,
        phone: profileData.data.user.phone,
        address: profileData.data.user.address,
      });
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const user = profileData?.data?.user;
  const summary = summaryData?.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary"
          >
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            </div>
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={user?.email || ''}
                      className="input"
                      disabled
                    />
                    <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Address</h4>
                    <div>
                      <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        id="address.street"
                        name="address.street"
                        type="text"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          id="address.city"
                          name="address.city"
                          type="text"
                          value={formData.address.city}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          id="address.state"
                          name="address.state"
                          type="text"
                          value={formData.address.state}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          id="address.zipCode"
                          name="address.zipCode"
                          type="text"
                          value={formData.address.zipCode}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium">{user?.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{user?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user?.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Address</h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">{user?.address?.street}</p>
                      <p className="text-gray-700">
                        {user?.address?.city}, {user?.address?.state} {user?.address?.zipCode}
                      </p>
                      <p className="text-gray-700">{user?.address?.country}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{user?.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <p className="font-medium">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user?.isVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Account Summary</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary?.totalBalance?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Accounts</span>
                    <span className="font-medium">{summary?.accountSummary?.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Checking</span>
                    <span className="font-medium">{summary?.accountSummary?.checking || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Savings</span>
                    <span className="font-medium">{summary?.accountSummary?.savings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Credit</span>
                    <span className="font-medium">{summary?.accountSummary?.credit || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full btn btn-secondary">
                  Change Password
                </button>
                <button className="w-full btn btn-secondary">
                  Enable Two-Factor Authentication
                </button>
                <button className="w-full btn btn-danger">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
