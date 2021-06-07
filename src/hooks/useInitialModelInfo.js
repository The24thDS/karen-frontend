import { useEffect } from 'react';

const useInitialModelInfo = (setValue, initialModel) => {
  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { name, description },
        tags,
      } = initialModel;
      const selectedTags = tags.map((tag) => ({
        label: tag,
        value: tag,
      }));
      if (mounted) {
        setValue('name', name);
        setValue('description', description);
        setValue('tags', selectedTags);
      }
    }
    return () => {
      mounted = false;
    };
  }, [setValue, initialModel]);
};

export default useInitialModelInfo;
