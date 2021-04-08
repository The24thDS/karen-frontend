export const USER_LOGIN = 'USER_LOGIN_REQUESTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCEEDED';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILED';
export const USER_CHECK_TOKEN = 'USER_CHECK_TOKEN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function logUserIn(userData) {
  return {
    type: USER_LOGIN,
    payload: userData,
  };
}

export function checkToken() {
  return {
    type: USER_CHECK_TOKEN,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}
