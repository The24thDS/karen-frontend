import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getModelRecommendations } from 'api/models.api';

const useModelRecommendations = (slug) => {
  const [models, setModels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (slug) {
      (async () => {
        const response = await getModelRecommendations(slug, dispatch);
        if (response && mounted) {
          setModels(response);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, slug]);

  return models;
};

export default useModelRecommendations;
