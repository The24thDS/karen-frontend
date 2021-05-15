import { removeTempFile } from 'api/assets.api';
import { getBearerToken } from 'utils/general';

const API_URL = process.env.API_URL || 'http://localhost:3001';

const headers = {
  Authorization: getBearerToken(),
};

export const imagesFileInputServerConfig = (getValues) => ({
  process: {
    url: `${API_URL}/assets/images`,
    headers: {
      ...headers,
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

export const modelsFileInputServerConfig = (getValues) => ({
  process: {
    url: `${API_URL}/assets/models`,
    headers: {
      ...headers,
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
  load: null,
  restore: null,
  fetch: null,
});

export const gltfFileInputServerConfig = (getValues) => ({
  process: {
    url: `${API_URL}/assets/gltf`,
    headers: {
      ...headers,
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
  load: null,
  restore: null,
  fetch: null,
});
