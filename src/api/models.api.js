import { getBearerToken, handleApiCall } from 'utils/general';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export const fetchModels = async (data) => {
  const page = data.page ?? 0;
  const pageSize = data.pageSize ?? 20;
  const res = await fetch(
    `${API_URL}/models?page=${page}&pageSize=${pageSize}`
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};

export const fetchModel = async (slug, dispatch) => {
  const path = `models/${slug}`;
  const content = await handleApiCall(path, dispatch);
  return content;
};

export const uploadModel = async (data) => {
  const res = await fetch(`${API_URL}/models`, {
    headers: {
      Authorization: getBearerToken(),
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    return new Error('Server did not return OK');
  }
};

export const updateModel = async (data, slug) => {
  const res = await fetch(`${API_URL}/models/${slug}`, {
    headers: {
      Authorization: getBearerToken(),
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'PUT',
    body: JSON.stringify(data),
  });
  console.log('result:', res);
  const response = await res.json();
  console.log('api response:', response);
  return response;
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

export const voteModel = async (slug, type, dispatch) => {
  const path = `models/${slug}/vote`;
  const params = {
    method: 'POST',
    body: JSON.stringify({ voteType: type }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };
  const content = await handleApiCall(path, dispatch, params);
  return content;
};

export const addModelToCollection = async (slug, collectionSlug, dispatch) => {
  const path = `models/${slug}/collections/${collectionSlug}`;
  const content = await handleApiCall(path, dispatch, { method: 'post' });
  return content;
};

export const removeModelFromCollection = async (
  slug,
  collectionSlug,
  dispatch
) => {
  const path = `models/${slug}/collections/${collectionSlug}`;
  const content = await handleApiCall(path, dispatch, { method: 'delete' });
  return content;
};

export const deleteModel = async (slug, dispatch) => {
  const path = `models/${slug}`;
  const content = await handleApiCall(path, dispatch, { method: 'delete' });
  return content;
};

export const getModelRecommendations = async (slug, dispatch) => {
  const path = `models/${slug}/recommended`;
  const content = await handleApiCall(path, dispatch);
  return content;
};
