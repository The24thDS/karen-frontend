import { handleApiCall } from 'utils/general';

export const fetchUserCollections = async (username) => {
  const path = `collections/user/${username}`;
  const content = await handleApiCall(path);
  return content;
};

export const fetchUserCollectionsForModel = async (username, slug) => {
  const path = `collections/model/${slug}/user/${username}`;
  const content = await handleApiCall(path);
  return content;
};

export const fetchCollectionWithModels = async (slug) => {
  const path = `collections/${slug}/models`;
  const content = await handleApiCall(path);
  return content;
};

export const storeCollection = async (data) => {
  const path = `collections`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const content = await handleApiCall(path, params);
  return content;
};

export const updateCollection = async (slug, data) => {
  const path = `collections/${slug}`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const content = await handleApiCall(path, params);
  return content;
};

export const deleteCollection = async (slug) => {
  const path = `collections/${slug}`;
  const content = await handleApiCall(path, { method: 'delete' });
  return content;
};
