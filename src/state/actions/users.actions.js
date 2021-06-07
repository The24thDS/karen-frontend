export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function logUserIn(userData) {
  return {
    type: USER_LOGIN,
    payload: userData,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}
