import { useState, useEffect } from 'react';
import { fetchUserCollectionsForModel } from 'api/collections.api';

const useUserCollectionsForModel = (username, slug, trigger = null) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetchUserCollectionsForModel(username, slug);
      if (!mounted) {
        return;
      }
      setCollections(response);
    })();
    return () => {
      mounted = false;
    };
  }, [username, slug, trigger]);

  return collections;
};

export default useUserCollectionsForModel;
