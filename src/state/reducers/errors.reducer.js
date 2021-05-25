import { Map } from 'immutable';

import { types } from '../actions/errors.actions';

const INITIAL_STATE = Map({
  hasError: false,
  data: null,
});

const errorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_FETCH_ERROR:
      return state.merge({ hasError: true, data: action.payload });
    case types.CLEAR_FETCH_ERROR:
      return state.merge({ hasError: false, data: null });
    default:
      return state;
  }
};

export default errorsReducer;
