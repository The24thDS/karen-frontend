import { call, put, takeLatest } from 'redux-saga/effects';

import { login } from '../../api/users.api';
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from '../actions/users.actions';

function* loginUser(action) {
  try {
    const { data, ok } = yield call(login, action.payload);
    if (ok) {
      sessionStorage.setItem('json-wt', data.access_token);
      yield put({ type: USER_LOGIN_SUCCESS, data: data.user });
    } else {
      yield put({ type: USER_LOGIN_FAILURE, data: data });
    }
  } catch (e) {
    yield put({ type: USER_LOGIN_FAILURE, data: e.message });
  }
}

export function* usersSaga() {
  yield takeLatest(USER_LOGIN, loginUser);
}
