import { getBearerToken } from 'utils/general';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export const removeTempFile = async (data) => {
  const res = await fetch(`${API_URL}/assets/temp`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: getBearerToken(),
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};
