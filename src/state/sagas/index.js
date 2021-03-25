import { all } from '@redux-saga/core/effects';

import { modelsSaga } from './models.sagas';
import { usersSaga } from './users.sagas';

export default function* rootSaga() {
  yield all([modelsSaga(), usersSaga()]);
}
