import { createSelector } from 'reselect';

const getModelsContainer = (state) => state.models;

export const getModelsIndexContainer = createSelector(
  getModelsContainer,
  (container) => container.get('index')
);

export const getSelectedModel = createSelector(
  getModelsContainer,
  (container) => container.get('selectedModel')
);

export const selectIndexModels = createSelector(
  getModelsIndexContainer,
  (container) => container.get('items')
);

export const selectIndexModelsPage = createSelector(
  getModelsIndexContainer,
  (container) => container.get('page')
);

export const selectModels = createSelector(getModelsContainer, (container) =>
  container.get('items')
);

export const selectModelsLoading = createSelector(
  getModelsContainer,
  (container) => container.get('loading')
);

export const selectModelsError = createSelector(
  getModelsContainer,
  (container) => container.get('error')
);

export const selectModelsSearchTerm = createSelector(
  getModelsContainer,
  (container) => container.get('searchTerm')
);
