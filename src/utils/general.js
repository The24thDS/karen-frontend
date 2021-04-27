const API_URL = process.env.API_URL || 'http://localhost:3001';

export const getImagePath = (modelSlug, username, imageName) =>
  encodeURI(
    `${API_URL}/assets/images/${imageName}?modelAuthor=${username}&modelSlug=${modelSlug}`
  );

export const getModelFilePath = (modelSlug, username, fileName) =>
  encodeURI(
    `${API_URL}/assets/models/${fileName}?modelAuthor=${username}&modelSlug=${modelSlug}`
  );

export const getGltfFilePath = (modelSlug, username, fileName) =>
  `${API_URL}/assets/gltf/${username}/${modelSlug}/${fileName}`;
