/*
 * Portfolio Actions
 */

import {
  FETCH_DATA,
  LOADING,
  SAVE_DATA_TO_REDUCER,
  SHOW_ERROR_WHILE_FETCHING_DATA,
} from './constants';
/**
 * Calls saga to make an api call to fetch investment data
 *
 * @param {} investmentId
 */

export function makeApiCallToFetchData(id) {
  return {
    type: FETCH_DATA,
    id,
  };
}

/**
 * Set the result fro api call to reducer
 *
 * @param {array} investment data from api call
 *
 * @return {array} An action object with a type of SAVE_DATA_TO_REDUCER
 */

export function saveDataToReducer(data) {
  return {
    type: SAVE_DATA_TO_REDUCER,
    data: data,
  };
}

/**
 * Set the error from api call to reducer
 *
 * @param  {object} err The new text of the input field
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_DATA
 */

export function showErrorWhileFetchingData(err) {
  return {
    type: SHOW_ERROR_WHILE_FETCHING_DATA,
    err,
  };
}

/**
 * Set the loading state
 *
 * @param  {boolean} isLoading State to check whether it is loading
 *
 * @return {object} An action object with a type of SHOW_ERROR_WHILE_FETCHING_DATA
 */

export function setLoadingState(isLoading) {
  return {
    type: LOADING,
    isLoading,
  };
}
