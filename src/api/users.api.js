import { getBearerToken, handleApiCall } from 'utils/general';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export const login = async (userData) => {
  const path = `auth/login`;
  const params = {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const content = await handleApiCall(path, params);
  return content;
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  const data = await res.json();
  return { data, status: res.status, ok: res.ok };
};

export const checkToken = async () => {
  const res = await fetch(`${API_URL}/auth/check-token`, {
    headers: {
      Authorization: getBearerToken(),
    },
  });
  const data = await res.json();
  return { data, status: res.status, ok: res.ok };
};
