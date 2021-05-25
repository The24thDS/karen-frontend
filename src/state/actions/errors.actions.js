export const types = {
  SET_FETCH_ERROR: 'SET_FETCH_ERROR',
  CLEAR_FETCH_ERROR: 'CLEAR_FETCH_ERROR',
  HIDE_FETCH_ERROR: 'HIDE_FETCH_ERROR',
};

export function setFetchError(payload) {
  return {
    type: types.SET_FETCH_ERROR,
    payload,
  };
}

export function clearFetchError() {
  return {
    type: types.CLEAR_FETCH_ERROR,
  };
}

export function hideFetchError() {
  return {
    type: types.HIDE_FETCH_ERROR,
  };
}
