import { Map } from 'immutable';
import {
  FETCH_MODELS,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_FAILURE,
  SEARCH_MODELS,
  SEARCH_MODELS_FAILURE,
  SEARCH_MODELS_SUCCESS,
} from '../actions/models.actions';

const INITIAL_STATE = Map({
  items: [],
  loading: false,
  error: null,
  searchTerm: null,
});

const modelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_MODELS:
      return state.merge({
        loading: true,
        error: null,
        searchTerm: action.payload,
      });
    case FETCH_MODELS:
      return state.merge({ loading: true, error: null, searchTerm: null });
    case SEARCH_MODELS_SUCCESS:
    case FETCH_MODELS_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        items: action.data,
      });
    case SEARCH_MODELS_FAILURE:
    case FETCH_MODELS_FAILURE:
      return state.merge({ loading: false, error: action.message });
    default:
      return state;
  }
};

export default modelsReducer;
