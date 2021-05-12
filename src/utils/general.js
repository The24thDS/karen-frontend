const API_URL = process.env.API_URL || 'http://localhost:3001';

export const getImagePath = (modelSlug, username, imageName) =>
  encodeURI(`${API_URL}/assets/images/${username}/${modelSlug}/${imageName}`);

export const getModelFilePath = (modelSlug, username, fileName) =>
  encodeURI(`${API_URL}/assets/models/${username}/${modelSlug}/${fileName}`);

export const getGltfFilePath = (modelSlug, username, fileName) =>
  encodeURI(`${API_URL}/assets/gltf/${username}/${modelSlug}/${fileName}`);
