import React, { memo, useEffect } from 'react';
import {
  fetchInvestmentDetails,
  getInvestmentError,
  getLoadingState,
} from './selectors';
import { makeApiCallToFetchInvestmentData, setLoadingState } from './actions';

import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import InvestmentCard from 'components/InvestmentCard';
import LoadingIndicator from 'components/LoadingIndicator';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

const key = 'investment';

export function InvestmentDashboard({
  isLoading,
  fetchData,
  setLoading,
  investmentData,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  setLoading(false);

  useEffect(() => {
    fetchData();
    setLoading(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Investment Dashboard" />
      </Helmet>
      {!isLoading && (
        <Grid container spacing={3} style={{ marginTop: 0 }}>
          {investmentData &&
            investmentData.length &&
            investmentData.map(data => (
              <InvestmentCard investment={data} key={data.id} />
            ))}
        </Grid>
      )}
      {isLoading && <LoadingIndicator />}
    </>
  );
}

InvestmentDashboard.PropTypes = {
  isLoading: PropTypes.bool,
  fetchData: PropTypes.func,
  setLoading: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  investmentData: fetchInvestmentDetails() || [],
  error: getInvestmentError(),
  isLoading: getLoadingState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(makeApiCallToFetchInvestmentData()),
    setLoading: isLoading => dispatch(setLoadingState(isLoading)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InvestmentDashboard);
