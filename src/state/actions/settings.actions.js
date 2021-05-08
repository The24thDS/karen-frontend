export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_SIDEPANEL_OPENED = 'SET_SIDEPANEL_OPENED';

export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    payload: settings,
  };
}

export function setSidepanelOpened(sidepanelOpened) {
  return {
    type: SET_SIDEPANEL_OPENED,
    payload: sidepanelOpened,
  };
}
