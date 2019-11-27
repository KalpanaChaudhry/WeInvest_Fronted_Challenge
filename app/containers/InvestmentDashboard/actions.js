/*
 * Investment Actions
 */
import {
  CLICKED,
  FETCH_INVESTMENT_DETAILS,
  LOADING,
  SAVE_INVESTMENT_DATA_TO_REDUCER,
  SHOW_ERROR_WHILE_FETCHING_INVESTMENT_DATA,
} from './constants';

/**
 * Calls saga to make an api call to fetch investmentData
 *
 * @param {} username
 */

export function makeApiCallToFetchInvestmentData() {
  return {
    type: FETCH_INVESTMENT_DETAILS,
  };
}

/**
 * Set the result fro api call to reducer
 *
 * @param {array} investmentData List of investments from api call
 *
 * @return {array} An action object with a type of SAVE_INVESTMENT_TO_REDUCER
 */

export function saveInvestmentDataToReducer(investmentData) {
  return {
    type: SAVE_INVESTMENT_DATA_TO_REDUCER,
    investmentData,
  };
}

/**
 * Set the error from api call to reducer
 *
 * @param  {object} err The new text of the input field
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_INVESTMENT
 */

export function showErrorWhileFetchingInvestmentData(err) {
  return {
    type: SHOW_ERROR_WHILE_FETCHING_INVESTMENT_DATA,
    err,
  };
}

/**
 * Set the loading state
 *
 * @param  {boolean} isLoading State to check whether it is loading
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_INVESTMENT
 */

export function setLoadingState(isLoading) {
  return {
    type: LOADING,
    isLoading,
  };
}

/**
 * Set the investment strategy state
 *
 * @param  {string}  State to check whether it is loading
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_INVESTMENT
 */

export function investmentStrategyState(clicked) {
  return {
    type: LOADING,
    clicked,
  };
}
