import { useEffect, useState } from 'react';

import { getModelRecommendations } from 'api/models.api';

const useModelRecommendations = (slug) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (slug) {
      (async () => {
        const response = await getModelRecommendations(slug);
        if (response && mounted) {
          setModels(response);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [slug]);

  return models;
};

export default useModelRecommendations;
