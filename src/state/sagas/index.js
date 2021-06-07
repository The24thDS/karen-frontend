import { all } from '@redux-saga/core/effects';

import { modelsSaga } from './models.sagas';

export default function* rootSaga() {
  yield all([modelsSaga()]);
}
