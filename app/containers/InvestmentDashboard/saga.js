/**
 * Gets all investment details
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  saveInvestmentDataToReducer,
  showErrorWhileFetchingInvestmentData,
} from './actions';

import { FETCH_INVESTMENT_DETAILS } from './constants';
import request from 'utils/request';

/**
 * Get InvestmentData
 */
export function* fetchInvestmentdetails() {
  const requestURL = `https://wi-recruitment.herokuapp.com/strategies`;

  try {
    // Call our request helper (see 'utils/request')
    const investmentData = yield call(request, requestURL);
    yield put(saveInvestmentDataToReducer(investmentData));
  } catch (err) {
    yield put(showErrorWhileFetchingInvestmentData(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* investmentData() {
  // Watches for FETCH_INVESTMENT_DETAILS actions and calls fetchInvestmentdetails when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_INVESTMENT_DETAILS, fetchInvestmentdetails);
}
