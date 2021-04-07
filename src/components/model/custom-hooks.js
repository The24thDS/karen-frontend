import { useEffect, useState } from 'react';
import { fetchModel } from '../../api/models.api';

export const useModel = (modelId) => {
  const [model, setModel] = useState({});

  useEffect(() => {
    let mounted = true;
    fetchModel(modelId).then((data) => {
      if (mounted) {
        setModel(data);
      }
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return model;
};
