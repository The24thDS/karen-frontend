import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchModels as fetchModelsApi,
  searchModels as searchModelsApi,
} from '../../api/models.api';
import {
  FETCH_MODELS,
  FETCH_MODELS_FAILURE,
  FETCH_MODELS_SUCCESS,
  SEARCH_MODELS,
  SEARCH_MODELS_FAILURE,
  SEARCH_MODELS_SUCCESS,
} from '../actions/models.actions';

function* fetchModels(_action) {
  try {
    const data = yield call(fetchModelsApi);
    yield put({ type: FETCH_MODELS_SUCCESS, data });
  } catch (e) {
    yield put({ type: FETCH_MODELS_FAILURE, message: e.message });
  }
}

function* searchModels(action) {
  try {
    const data = yield call(searchModelsApi, { searchString: action.payload });
    yield put({ type: SEARCH_MODELS_SUCCESS, data });
  } catch (e) {
    yield put({ type: SEARCH_MODELS_FAILURE, message: e.message });
  }
}

export function* modelsSaga() {
  yield takeLatest(FETCH_MODELS, fetchModels);
  yield takeLatest(SEARCH_MODELS, searchModels);
}
