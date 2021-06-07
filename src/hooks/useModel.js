import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchModel } from 'api/models.api';

const useModel = (slug) => {
  const [model, setModel] = useState({
    model: { metadata: {} },
    user: {},
    tags: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const content = await fetchModel(slug, dispatch);
      if (content) {
        const hasGltfFile = content.model.gltf?.length ? true : false;
        if (mounted) {
          setModel({
            ...content,
            model: {
              ...content.model,
              useGltfViewer: hasGltfFile,
              metadata: JSON.parse(content.model.metadata ?? '{}'),
            },
          });
        }
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return model;
};

export default useModel;
