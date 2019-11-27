/**
 * Portfolio selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const portfolioState = state => state.portfolio || initialState;

// get investment list
const getInvestmentList = () =>
  createSelector(
    portfolioState,
    portfolio => portfolio.portfolioData,
  );

// get error occurred
const getPortfolioError = () =>
  createSelector(
    portfolioState,
    portfolio => portfolio.err,
  );

// get loading state
const getLoadingState = () =>
  createSelector(
    portfolioState,
    portfolio => portfolio.isLoading,
  );

export { getInvestmentList, getPortfolioError, getLoadingState };
