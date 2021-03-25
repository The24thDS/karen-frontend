import { createSelector } from 'reselect';

const getModelsContainer = (state) => state.models;

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
