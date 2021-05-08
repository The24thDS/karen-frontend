export const FETCH_MODELS = 'MODELS_FETCH_REQUESTED';
export const FETCH_MODELS_SUCCESS = 'MODELS_FETCH_SUCCEEDED';
export const FETCH_MODELS_FAILURE = 'MODELS_FETCH_FAILED';
export const SEARCH_MODELS = 'MODELS_SEARCH_REQUESTED';
export const SEARCH_MODELS_SUCCESS = 'MODELS_SEARCH_SUCCEEDED';
export const SEARCH_MODELS_FAILURE = 'MODELS_SEARCH_FAILED';
export const SET_SELECTED_MODEL = 'SET_SELECTED_MODEL';

export function fetchModels() {
  return {
    type: FETCH_MODELS,
  };
}

export function searchModels(searchTerm) {
  return {
    type: SEARCH_MODELS,
    payload: searchTerm,
  };
}

export function setSelectedModel(selecteModelData) {
  return {
    type: SET_SELECTED_MODEL,
    payload: selecteModelData,
  };
}
