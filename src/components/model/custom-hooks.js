import { useEffect, useState } from 'react';
import { fetchModel } from '../../api/models.api';

export const useModel = (modelId, modelAuthor) => {
  const [model, setModel] = useState({ model: {}, user: {}, tags: [] });

  useEffect(() => {
    let mounted = true;
    fetchModel(modelId, modelAuthor).then((data) => {
      const hasGltfFile = data.model.gltf?.length ? true : false;
      if (mounted) {
        setModel({
          ...data,
          model: {
            ...data.model,
            useGltfViewer: hasGltfFile,
            metadata: JSON.parse(data.model.metadata ?? '{}'),
            files: data.model.files.map((item) => JSON.parse(item)),
          },
        });
      }
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return model;
};
