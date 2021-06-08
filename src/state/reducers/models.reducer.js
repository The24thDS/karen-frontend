import { Map } from 'immutable';
import {
  FETCH_MODELS,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_FAILURE,
  SEARCH_MODELS,
  SEARCH_MODELS_FAILURE,
  SEARCH_MODELS_SUCCESS,
  SET_SELECTED_MODEL,
  SET_MODELS,
  SET_MODELS_PAGE,
} from '../actions/models.actions';

const INITIAL_STATE = Map({
  items: [],
  loading: false,
  error: null,
  searchTerm: null,
  selectedModel: {},
  index: Map({
    items: [],
    page: 0,
  }),
});

const modelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODELS:
      return state.mergeDeep({
        index: {
          items: action.payload,
        },
      });
    case SET_MODELS_PAGE:
      return state.mergeDeep({
        index: {
          page: action.payload,
        },
      });
    case SEARCH_MODELS:
      return state.merge({
        loading: true,
        error: null,
        searchTerm: action.payload,
      });
    case FETCH_MODELS:
      return state.merge({ loading: true, error: null, searchTerm: null });
    case SEARCH_MODELS_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        items: action.data,
      });
    case FETCH_MODELS_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        items: [...state.get('items'), ...action.data],
      });
    case SEARCH_MODELS_FAILURE:
    case FETCH_MODELS_FAILURE:
      return state.merge({ loading: false, error: action.message });
    case SET_SELECTED_MODEL:
      return state.merge({ selectedModel: action.payload });
    default:
      return state;
  }
};

export default modelsReducer;
