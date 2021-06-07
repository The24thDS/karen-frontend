import { handleApiCall } from 'utils/general';

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
  const path = `auth/register`;
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

export const checkToken = async () => {
  const path = `auth/check-token`;
  const content = await handleApiCall(path);
  return content;
};
