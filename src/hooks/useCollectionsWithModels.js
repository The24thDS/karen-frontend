import { useState, useEffect } from 'react';
import { fetchCollectionWithModels } from 'api/collections.api';

const useCollectionWithModels = (slug, dispatch, trigger = null) => {
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetchCollectionWithModels(slug, dispatch);
      if (!mounted) {
        return;
      }
      setCollection(response);
    })();
    return () => {
      mounted = false;
    };
  }, [slug, dispatch, trigger]);

  return collection;
};

export default useCollectionWithModels;
