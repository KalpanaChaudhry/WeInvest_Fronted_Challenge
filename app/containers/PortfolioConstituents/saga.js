import { call, put, takeLatest } from 'redux-saga/effects';
import { saveDataToReducer, showErrorWhileFetchingData } from './actions';

import { FETCH_DATA } from './constants';
import request from 'utils/request';

/**
 * Get data
 */
export function* getData(action) {
  try {
    const requestURL = `https://wi-recruitment.herokuapp.com/strategies/${
      action.id
    }`;

    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(saveDataToReducer(data));
  } catch (err) {
    yield put(showErrorWhileFetchingData(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* investmentData() {
  // Watches for FETCH_DATA actions and calls getData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_DATA, getData);
}
