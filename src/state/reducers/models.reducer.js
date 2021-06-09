import { Map } from 'immutable';
import {
  SET_SELECTED_MODEL,
  SET_MODELS,
  SET_MODELS_PAGE,
  SET_SEARCHED_MODELS,
  SET_SEARCHED_MODELS_PAGE,
  SET_SEARCHED_MODELS_TERM,
  CLEAR_SEARCHED_MODELS,
} from '../actions/models.actions';

const INITIAL_STATE = Map({
  selectedModel: {},
  index: Map({
    items: [],
    page: 0,
  }),
  search: Map({
    items: [],
    page: 0,
    term: null,
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
    case SET_SEARCHED_MODELS:
      return state.mergeDeep({
        search: {
          items: action.payload,
        },
      });
    case CLEAR_SEARCHED_MODELS:
      return state.updateIn(['search', 'items'], (items) => (items = []));
    case SET_SEARCHED_MODELS_PAGE:
      return state.mergeDeep({
        search: {
          page: action.payload,
        },
      });
    case SET_SEARCHED_MODELS_TERM:
      return state.mergeDeep({
        search: {
          term: action.payload,
        },
      });
    case SET_SELECTED_MODEL:
      return state.merge({ selectedModel: action.payload });
    default:
      return state;
  }
};

export default modelsReducer;
