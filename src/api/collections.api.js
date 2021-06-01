import { handleApiCall } from 'utils/general';

export const fetchUserCollections = async (username, dispatch) => {
  const path = `collections/user/${username}`;
  const content = await handleApiCall(path, dispatch);
  return content;
};

export const fetchUserCollectionsForModel = async (
  username,
  slug,
  dispatch
) => {
  const path = `collections/model/${slug}/user/${username}`;
  const content = await handleApiCall(path, dispatch);
  return content;
};

export const fetchCollectionWithModels = async (slug, dispatch) => {
  const path = `collections/${slug}/models`;
  const content = await handleApiCall(path, dispatch);
  return content;
};

export const storeCollection = async (data, dispatch) => {
  const path = `collections`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const content = await handleApiCall(path, dispatch, params);
  return content;
};

export const updateCollection = async (slug, data, dispatch) => {
  const path = `collections/${slug}`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const content = await handleApiCall(path, dispatch, params);
  return content;
};

export const deleteCollection = async (slug, dispatch) => {
  const path = `collections/${slug}`;
  const content = await handleApiCall(path, dispatch, { method: 'delete' });
  return content;
};
