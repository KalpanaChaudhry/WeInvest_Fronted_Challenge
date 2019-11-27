import { createSelector } from 'reselect';
import { initialState } from './reducer';

const investmentState = state => state.investment || initialState;

// get investment list
const fetchInvestmentDetails = () =>
  createSelector(
    investmentState,
    investmentState => investmentState.investmentData,
  );

// get error occurred
const getInvestmentError = () =>
  createSelector(
    investmentState,
    investment => investment.err,
  );

// get loading state
const getLoadingState = () =>
  createSelector(
    investmentState,
    investment => investment.isLoading,
  );

export { fetchInvestmentDetails, getInvestmentError, getLoadingState };
