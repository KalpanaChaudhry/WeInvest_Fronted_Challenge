/*
 * Portfolio reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import {
  LOADING,
  SAVE_DATA_TO_REDUCER,
  SHOW_ERROR_WHILE_FETCHING_DATA,
} from './constants';

import produce from 'immer';

// The initial state of the App
export const initialState = {
  portfolioData: [],
  err: null,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const portfolioReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_DATA_TO_REDUCER:
        draft.portfolioData = action.data;

        draft.isLoading = false;
        break;
      case SHOW_ERROR_WHILE_FETCHING_DATA:
        draft.err = action.err;
        draft.isLoading = false;
        break;
      case LOADING:
        draft.isLoading = action.isLoading;
        break;

      default:
        break;
    }
  });

export default portfolioReducer;
