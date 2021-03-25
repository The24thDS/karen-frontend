import { useEffect, useState } from 'react';
import { fetchTags } from '../../api/tags.api';

export function useTagsOptions() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchTags().then((tags) => {
      const options = tags.map(({ name }) => ({ value: name, label: name }));
      if (mounted) {
        setOptions(options);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return options;
}
