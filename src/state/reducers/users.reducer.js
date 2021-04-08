import { Map } from 'immutable';
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
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
          data: null,
          loading: false,
          error: action.data,
        },
      });
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default usersReducer;
