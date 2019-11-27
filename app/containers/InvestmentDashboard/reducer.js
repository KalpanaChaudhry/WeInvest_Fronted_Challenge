import {
  LOADING,
  SAVE_INVESTMENT_DATA_TO_REDUCER,
  SHOW_ERROR_WHILE_FETCHING_INVESTMENT_DATA,
} from './constants';

import produce from 'immer';

export const initialState = {
  isLoading: false,
  err: null,
  investmentData: [],
};

const InvestmentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_INVESTMENT_DATA_TO_REDUCER:
        draft.investmentData = action.investmentData;
        draft.isLoading = false;
        break;
      case SHOW_ERROR_WHILE_FETCHING_INVESTMENT_DATA:
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

export default InvestmentReducer;
