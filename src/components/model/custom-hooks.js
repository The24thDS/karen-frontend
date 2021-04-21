import { useEffect, useState } from 'react';
import { fetchModel } from '../../api/models.api';

const checkIfModelHasFileWithExtension = (files, extension) => {
  return files.reduce((acc, item) => {
    if (item.endsWith(extension)) return true;
    else return acc;
  }, false);
};

export const useModel = (modelId) => {
  const [model, setModel] = useState({ model: {}, user: {}, tags: [] });

  useEffect(() => {
    let mounted = true;
    fetchModel(modelId).then((data) => {
      const hasObjFile = checkIfModelHasFileWithExtension(
        data.model.files,
        '.obj'
      );
      const hasMtlFile = checkIfModelHasFileWithExtension(
        data.model.files,
        '.mtl'
      );
      const hasDaeFile = checkIfModelHasFileWithExtension(
        data.model.files,
        '.dae'
      );
      const hasGltfFile = data.model.gltf?.length ? true : false;
      if (mounted) {
        setModel({
          ...data,
          model: {
            ...data.model,
            useMtlViewer: hasMtlFile && hasObjFile,
            useObjViewer: hasObjFile, // && !hasMtlFile,
            useDaeViewer: hasDaeFile,
            useGltfViewer: hasGltfFile,
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
