import { createSelector } from 'reselect';

const getUsersContainer = (state) => state.users;

export const selectCurrentUser = createSelector(
  getUsersContainer,
  (container) => container.get('currentUser')
);

export const selectUserLoggedIn = createSelector(
  selectCurrentUser,
  (data) => data !== null
);
