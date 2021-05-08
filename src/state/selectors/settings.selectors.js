import { createSelector } from 'reselect';

const getSettingsContainer = (state) => state.settings;

export const getSidepanelOpened = createSelector(
  getSettingsContainer,
  (container) => container.get('sidepanelOpened')
);
