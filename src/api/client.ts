
const BASE_URL = '/api'; // Assuming a relative path for the proxy or direct API

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('worknext_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
