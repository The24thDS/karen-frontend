import { useEffect } from 'react';

const useCustomMetadataValues = (setValue, initialModel) => {
  useEffect(() => {
    let mounted = true;
    if (initialModel) {
      const {
        model: { metadata },
      } = initialModel;
      if (mounted) {
        Object.keys(metadata).forEach((key) => {
          setValue(`metadata.${key}`, metadata[key]);
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [setValue, initialModel]);
};

export default useCustomMetadataValues;
