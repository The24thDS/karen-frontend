export const FETCH_MODELS = 'MODELS_FETCH_REQUESTED';
export const FETCH_MODELS_SUCCESS = 'MODELS_FETCH_SUCCEEDED';
export const FETCH_MODELS_FAILURE = 'MODELS_FETCH_FAILED';

export function fetchModels() {
  return {
    type: FETCH_MODELS,
  };
}
