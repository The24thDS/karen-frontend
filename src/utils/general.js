const API_URL = process.env.API_URL || 'http://localhost:3001';

export const getImagePath = (imageName) =>
  encodeURI(`${API_URL}/assets/images/${imageName}`);

export const getModelFilePath = (modelName) =>
  `${API_URL}/assets/models/${modelName}`;
