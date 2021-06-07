import { useState, useEffect } from 'react';

import { fetchUserCollections } from 'api/collections.api';

const useUserCollections = (username) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const response = await fetchUserCollections(username);
      if (!mounted) {
        return;
      }
      setCollections(response);
    })();
    return () => {
      mounted = false;
    };
  }, [username]);

  return collections;
};

export default useUserCollections;
