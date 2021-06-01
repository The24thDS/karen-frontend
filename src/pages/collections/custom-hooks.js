import {
  fetchCollectionWithModels,
  fetchUserCollections,
  fetchUserCollectionsForModel,
} from 'api/collections.api';
import { useState, useEffect } from 'react';

export const useUserCollections = (username, dispatch) => {
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

export const useCollectionWithModels = (slug, dispatch, trigger = null) => {
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

export const useUserCollectionsForModel = (
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
