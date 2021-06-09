import { createSelector } from 'reselect';

const getModelsContainer = (state) => state.models;

export const getModelsIndexContainer = createSelector(
  getModelsContainer,
  (container) => container.get('index')
);
export const getModelsSearchContainer = createSelector(
  getModelsContainer,
  (container) => container.get('search')
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

export const selectSearchModels = createSelector(
  getModelsSearchContainer,
  (container) => container.get('items')
);

export const selectSearchModelsPage = createSelector(
  getModelsSearchContainer,
  (container) => container.get('page')
);

export const selectSearchModelsTerm = createSelector(
  getModelsSearchContainer,
  (container) => container.get('term')
);
