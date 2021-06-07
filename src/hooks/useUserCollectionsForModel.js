import { useState, useEffect } from 'react';
import { fetchUserCollectionsForModel } from 'api/collections.api';

const useUserCollectionsForModel = (
  username,
  slug,
  dispatch,
  trigger = null
) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetchUserCollectionsForModel(
        username,
        slug,
        dispatch
      );
      if (!mounted) {
        return;
      }
      setCollections(response);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch, username, slug, trigger]);

  return collections;
};

export default useUserCollectionsForModel;
