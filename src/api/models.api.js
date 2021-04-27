const API_URL = process.env.API_URL || 'http://localhost:3001';

export const fetchModels = async () => {
  const res = await fetch(`${API_URL}/models`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};

export const fetchModel = async (slug) => {
  const res = await fetch(`${API_URL}/models/${slug}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};

export const uploadModel = async (data) => {
  const res = await fetch(`${API_URL}/models`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('json-wt')}`,
    },
    method: 'POST',
    body: data,
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};

export const searchModels = async (data) => {
  const res = await fetch(`${API_URL}/models/search`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};
