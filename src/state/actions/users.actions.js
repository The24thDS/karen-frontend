export const USER_LOGIN = 'USER_LOGIN_REQUESTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCEEDED';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILED';

export function logUserIn(userData) {
  return {
    type: USER_LOGIN,
    payload: userData,
  };
}
