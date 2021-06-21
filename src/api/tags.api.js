const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchTags = async () => {
  const res = await fetch(`${API_URL}/tags`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('Server did not return OK');
  }
};
