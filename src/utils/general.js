import { setFetchError } from 'state/actions/errors.actions';
import store from 'store';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export const getImagePath = (modelSlug, username, imageName) =>
  encodeURI(`${API_URL}/assets/images/${username}/${modelSlug}/${imageName}`);

export const getModelFilePath = (modelSlug, username, fileName) =>
  encodeURI(`${API_URL}/assets/models/${username}/${modelSlug}/${fileName}`);

export const getGltfFilePath = (modelSlug, username, fileName) =>
  encodeURI(`${API_URL}/assets/gltf/${username}/${modelSlug}/${fileName}`);

export const getBearerToken = () =>
  localStorage.getItem('json-wt')
    ? `Bearer ${localStorage.getItem('json-wt')}`
    : false;

export const handleApiCall = async (path, params = {}) => {
  const auth = getBearerToken();
  const configuration = {
    ...params,
  };
  if (auth) {
    if (configuration.headers) {
      configuration.headers.Authorization = auth;
    } else {
      configuration.headers = {
        Authorization: auth,
      };
    }
  }
  const response = await fetch(`${API_URL}/${path}`, configuration);
  let content = await response.text();
  try {
    content = JSON.parse(content);
  } catch (e) {
    // response is not json
  }
  if (!response.ok) {
    store.dispatch(setFetchError(content));
    return null;
  }
  return content;
};
