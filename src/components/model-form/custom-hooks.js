import { useEffect, useState } from "react";
import { fetchTags } from "../../api/tags.api";

export const useTagsOptions = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchTags().then((tags) => {
      const options = tags.map((tag) => ({ value: tag, label: tag }));
      if (mounted) {
        setOptions(options);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return options;
};

export const useInitialModelInfo = (setValue, initialModel) => {
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
        setValue("name", name);
        setValue("description", description);
        setValue("tags", selectedTags);
      }
    }
    return () => {
      mounted = false;
    };
  }, [setValue, initialModel]);
};

export const useCustomMetadataVales = (setValue, initialModel) => {
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
