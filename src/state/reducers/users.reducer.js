import { Map } from 'immutable';
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from '../actions/users.actions';

const INITIAL_STATE = Map({
  currentUser: Map({
    data: null,
    loading: false,
    error: null,
  }),
});

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return state.mergeDeep({
        currentUser: {
          data: null,
          loading: true,
          error: null,
        },
      });
    case USER_LOGIN_SUCCESS:
      return state.mergeDeep({
        currentUser: {
          data: action.data,
          loading: false,
          error: null,
        },
      });
    case USER_LOGIN_FAILURE:
      return state.mergeDeep({
        currentUser: {
          loading: false,
          error: action.data,
        },
      });
    default:
      return state;
  }
};

export default usersReducer;
