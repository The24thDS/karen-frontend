import { useEffect, useState } from 'react';
import { fetchTags } from '../../api/tags.api';

export const useTagsOptions = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchTags().then((tags) => {
      const options = tags.map((tag) => ({ value: tag, label: tag }));
      if (mounted) {
        setOptions(options);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return options;
};

export const useInitialModel = (setValue, initialModel) => {
  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { name, description },
        tags,
      } = initialModel;
      const selectedTags = tags.map((tag) => ({
        label: tag,
        value: tag,
      }));
      if (mounted) {
        setValue('name', name);
        setValue('description', description);
        setValue('tags', selectedTags);
      }
    }
    return () => {
      mounted = false;
    };
  }, [setValue, initialModel]);
};

export const useInitialModelImages = (initialModel) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { images },
      } = initialModel;
      const uploadedImages = images?.map((img) => ({
        source: img,
        options: { type: 'local' },
      }));
      if (mounted) {
        setImages(uploadedImages);
      }
    }
    return () => {
      mounted = false;
    };
  }, [initialModel]);

  return images;
};

export const useInitialModelFiles = (initialModel) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { files },
      } = initialModel;
      const uploadedFiles = files.map((file) => ({
        source: file.name,
        options: { type: 'local' },
      }));
      if (mounted) {
        setFiles(uploadedFiles);
      }
    }
    return () => {
      mounted = false;
    };
  }, [initialModel]);

  return files;
};

export const useInitialModelGltf = (initialModel) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { gltf },
      } = initialModel;
      if (mounted) {
        setFiles([{ source: gltf, options: { type: 'local' } }]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [initialModel]);

  return files;
};

export const useCustomMetadataVales = (setValue, initialModel) => {
  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { metadata },
      } = initialModel;
      if (mounted) {
        Object.keys(metadata).forEach((key) => {
          setValue(`metadata.${key}`, metadata[key]);
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [setValue, initialModel]);
};
