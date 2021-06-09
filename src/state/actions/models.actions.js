export const SET_SELECTED_MODEL = 'SET_SELECTED_MODEL';
export const SET_MODELS = 'SET_MODELS';
export const SET_MODELS_PAGE = 'SET_MODELS_PAGE';
export const SET_SEARCHED_MODELS = 'SET_SEARCHED_MODELS';
export const CLEAR_SEARCHED_MODELS = 'CLEAR_SEARCHED_MODELS';
export const SET_SEARCHED_MODELS_PAGE = 'SET_SEARCHED_MODELS_PAGE';
export const SET_SEARCHED_MODELS_TERM = 'SET_SEARCHED_MODELS_TERM';

export function setModels(data) {
  return {
    type: SET_MODELS,
    payload: data,
  };
}
export function setModelsPage(data) {
  return {
    type: SET_MODELS_PAGE,
    payload: data,
  };
}

export function setSearchedModels(data) {
  return {
    type: SET_SEARCHED_MODELS,
    payload: data,
  };
}
export function clearSearchedModels() {
  return {
    type: CLEAR_SEARCHED_MODELS,
  };
}
export function setSearchedModelsPage(data) {
  return {
    type: SET_SEARCHED_MODELS_PAGE,
    payload: data,
  };
}
export function setSearchedModelsTerm(data) {
  return {
    type: SET_SEARCHED_MODELS_TERM,
    payload: data,
  };
}

export function setSelectedModel(selecteModelData) {
  return {
    type: SET_SELECTED_MODEL,
    payload: selecteModelData,
  };
}
