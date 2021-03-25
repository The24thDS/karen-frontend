import { Map } from 'immutable';

import { types } from '../actions/example.actions';

const INITIAL_STATE = Map({
  counter: 0,
});

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return state.merge({ counter: state.counter + 1 });
    case types.DECREMENT:
      return state.merge({ counter: state.counter - 1 });
    default:
      return state;
  }
};

export default exampleReducer;
