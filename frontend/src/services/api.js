// API Configuration and Service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

/**
 * Helper function to make API requests with proper error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle error response
      throw new Error(data.error || data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Authentication API calls
 */
export const authAPI = {
  /**
   * Login user with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{token: string, user: object}>}
   */
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register new user
   * @param {object} userData - User registration data
   * @returns {Promise<{token: string, user: object}>}
   */
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

/**
 * Tasks API calls
 */
export const tasksAPI = {
  getAll: async () => {
    return apiRequest('/tasks', {
      method: 'GET',
    });
  },

  create: async (taskData) => {
    return apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  update: async (id, taskData) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

/**
 * Team API calls
 */
export const teamAPI = {
  getAll: async () => {
    return apiRequest('/team', {
      method: 'GET',
    });
  },

  create: async (memberData) => {
    return apiRequest('/team', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  },

  update: async (id, memberData) => {
    return apiRequest(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/team/${id}`, {
      method: 'DELETE',
    });
  },

  search: async (query) => {
    return apiRequest(`/team/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    });
  },
};

export default {
  auth: authAPI,
  tasks: tasksAPI,
  team: teamAPI,
};
