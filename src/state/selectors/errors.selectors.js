import { createSelector } from 'reselect';

const getErrorsContainer = (state) => state.errors;

export const getHasError = createSelector(getErrorsContainer, (container) =>
  container.get('hasError')
);

export const getErrorsData = createSelector(getErrorsContainer, (container) =>
  container.get('data')
);
