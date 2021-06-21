import { getBearerToken } from 'utils/general';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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

export const removeFile = async ({ name, slug, username }, type) => {
  const res = await fetch(
    `${API_URL}/assets/${type}/${username}/${slug}/${name}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: getBearerToken(),
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};
