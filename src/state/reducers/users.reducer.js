import { Map } from 'immutable';
import { USER_LOGIN, USER_LOGOUT } from '../actions/users.actions';

const INITIAL_STATE = Map({
  currentUser: null,
});

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return state.merge({
        currentUser: action.payload,
      });
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default usersReducer;
