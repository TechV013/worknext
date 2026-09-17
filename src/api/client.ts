export const API_BASE_URL = ((import.meta.env.VITE_API_URL ?? 'https://empowering-workforcebackend.vercel.app').replace(/\/$/, '')) + '/api';
const BASE_URL = API_BASE_URL;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('worknext_token');
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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