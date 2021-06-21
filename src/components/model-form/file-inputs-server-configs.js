import { removeTempFile } from 'api/assets.api';
import { getBearerToken } from 'utils/general';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const commonHeaders = () => ({
  Authorization: getBearerToken(),
});

export const imagesFileInputServerConfig = (getValues) => ({
  process: {
    url: `${API_URL}/assets/images`,
    headers: {
      ...commonHeaders(),
    },
  },
  revert: async (imageId, load, error) => {
    const uploadedImages = getValues('images');
    const { name } = uploadedImages.find((img) => img.id === imageId);

    try {
      await removeTempFile({ id: imageId, name });
      load();
    } catch (err) {
      error(err);
    }
  },
  load: null,
  restore: null,
  fetch: null,
});

export const modelsFileInputServerConfig = (getValues, slug, username) => ({
  process: {
    url: `${API_URL}/assets/models`,
    headers: {
      ...commonHeaders(),
    },
  },
  revert: async (fileId, load, error) => {
    const uploadedFiles = getValues('models');
    const { name } = uploadedFiles.find((file) => file.id === fileId);

    try {
      await removeTempFile({ id: fileId, name });
      load();
    } catch (err) {
      error(err);
    }
  },
  load: `${API_URL}/assets/models/inline/${username}/${slug}/`,
  restore: null,
  fetch: null,
});

export const gltfFileInputServerConfig = (getValues, slug, username) => ({
  process: {
    url: `${API_URL}/assets/gltf`,
    headers: {
      ...commonHeaders(),
    },
  },
  revert: async (fileId, load, error) => {
    const uploadedFiles = getValues('gltf');
    const { name } = uploadedFiles.find((file) => file.id === fileId);

    try {
      await removeTempFile({ id: fileId, name });
      load();
    } catch (err) {
      error(err);
    }
  },
  load: `${API_URL}/assets/gltf/inline/${username}/${slug}/`,
  restore: null,
  fetch: null,
});
