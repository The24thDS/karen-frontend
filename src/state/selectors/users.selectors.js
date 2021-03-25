import { createSelector } from 'reselect';

const getUsersContainer = (state) => state.users;

export const selectCurrentUser = createSelector(
  getUsersContainer,
  (container) => container.get('currentUser')
);

export const selectCurrentUserData = createSelector(selectCurrentUser, (cu) =>
  cu.get('data')
);

export const selectCurrentUserLoading = createSelector(
  selectCurrentUser,
  (cu) => cu.get('loading')
);

export const selectCurrentUserError = createSelector(selectCurrentUser, (cu) =>
  cu.get('error')
);

export const selectUserLoggedIn = createSelector(
  selectCurrentUserData,
  (data) => data !== null
);
