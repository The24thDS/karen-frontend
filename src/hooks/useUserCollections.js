import { useState, useEffect } from 'react';

import { fetchUserCollections } from 'api/collections.api';

const useUserCollections = (username, dispatch) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetchUserCollections(username, dispatch);
      if (!mounted) {
        return;
      }
      setCollections(response);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);

  return collections;
};

export default useUserCollections;
