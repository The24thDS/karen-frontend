import { Map } from 'immutable';
import {
  FETCH_MODELS,
  FETCH_MODELS_SUCCESS,
  FETCH_MODELS_FAILURE,
} from '../actions/models.actions';

const INITIAL_STATE = Map({
  items: [],
  loading: false,
  error: null,
});

const modelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MODELS:
      return state.merge({ loading: true, error: null });
    case FETCH_MODELS_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        items: action.data.records,
      });
    case FETCH_MODELS_FAILURE:
      return state.merge({ loading: false, error: action.message });
    default:
      return state;
  }
};

export default modelsReducer;
