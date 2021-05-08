import { Map } from 'immutable';
import {
  SET_SETTINGS,
  SET_SIDEPANEL_OPENED,
} from 'state/actions/settings.actions';

const INITIAL_STATE = Map({
  sidepanelOpened: false,
});

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return state.merge({ ...action.payload });
    case SET_SIDEPANEL_OPENED:
      return state.merge({ sidepanelOpened: action.payload });
    default:
      return state;
  }
};

export default settingsReducer;
