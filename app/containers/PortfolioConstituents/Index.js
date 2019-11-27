import React, { memo, useEffect, useState } from 'react';
import { findIndex, get, groupBy, round, sumBy } from 'lodash';
import {
  getInvestmentList,
  getLoadingState,
  getPortfolioError,
} from './selectors';
import { makeApiCallToFetchData, setLoadingState } from './actions';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import Loadingindicator from '../../components/LoadingIndicator';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useParams } from 'react-router-dom';

const key = 'portfolio';

const modelWeightSum = arr =>
  round(sumBy(arr, obj => parseFloat(obj['model_weight'])), 2);
const actualWeightSum = arr =>
  round(sumBy(arr, obj => parseFloat(obj['actual_weight'])), 2);

export function Portfolio({
  fetchData,
  setLoading,
  investmentData,
  err,
  isLoading,
}) {
  const [textValue, changeTextValue] = useState({});
  const { id } = useParams();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (!investmentData || investmentData.length === 0) {
      setLoading(true);
      fetchData(id);
    }
  }, []);

  const list = groupBy(
    get(investmentData, 'constituents[0].instruments', {}),
    'asset_class',
  );
  if (Object.keys(textValue).length === 0 && Object.keys(list).length > 0) {
    changeTextValue({ ...list });
  }

  const addClickedHandler = param => {
    const obj = { ...param };
    const temp = { ...textValue };
    const index = findIndex(temp[obj.asset_class], ['id', obj.id]);
    temp[obj.asset_class][index].actual_weight =
      parseFloat(temp[obj.asset_class][index].actual_weight) + 1;
    changeTextValue(temp);
  };

  const subtractClickedHandler = obj => {
    const temp = { ...textValue };
    const index = findIndex(temp[obj.asset_class], ['id', obj.id]);
    const reduced = parseFloat(temp[obj.asset_class][index].actual_weight) - 1;
    temp[obj.asset_class][index].actual_weight = reduced >= 0 ? reduced : 0;
    changeTextValue(temp);
  };

  const deleteHandler = ob => {
    const newObj = { ...textValue };
    const index = findIndex(newObj[ob.asset_class], ['id', ob.id]);
    const newList = newObj[ob.asset_class].filter((a, i) => i !== index);
    newObj[ob.asset_class] = newList;
    changeTextValue(newObj);
  };

  const addRowHandler = assests => {
    const newLists = {
      id: textValue[assests].length + 1,
      name: '',
      model_weight: null,
      asset_class: assests,
      actual_weight: '',
    };
    const newObjects = { ...textValue };
    newObjects[assests] = [...newObjects[assests], newLists];
    changeTextValue(newObjects);
  };

  const reset = () => {
    changeTextValue(list);
  };

  if (isLoading) {
    return <Loadingindicator />;
  }
  return (
    <>
      <Helmet>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio Constituents" />
      </Helmet>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Typography variant="h4">Portfolio Constituents</Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={() => reset()}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="outlined" fullWidth>
                Rebalance
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button color="primary" variant="outlined" fullWidth>
                Save & Continue
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category/Stock</TableCell>
            <TableCell />
            <TableCell align="right">Model Weight(%)</TableCell>
            <TableCell align="right">Weight(100%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(textValue).map(assests => (
            <>
              <TableRow
                id="myTable"
                key={assests}
                style={{ backgroundColor: '#d3d3d3' }}
              >
                <TableCell>{assests}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => addRowHandler(assests)}
                  >
                    +Add {assests}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {modelWeightSum(textValue[assests])}%
                </TableCell>
                <TableCell align="right" style={{ paddingRight: 65 }}>
                  {actualWeightSum(textValue[assests])}%
                </TableCell>
              </TableRow>

              {textValue[assests] &&
                Array.isArray(textValue[assests]) &&
                textValue[assests].map((obj, i) => (
                  <TableRow key={obj.id}>
                    <TableCell>
                      {' '}
                      <DeleteForeverSharpIcon
                        onClick={() => deleteHandler(obj)}
                      />
                      {obj.name}
                    </TableCell>
                    <TableCell />
                    <TableCell align="right">{obj.model_weight}%</TableCell>
                    <TableCell align="right">
                      <Icon color="action" style={{ cursor: 'pointer' }}>
                        <RemoveCircleIcon
                          onClick={() => subtractClickedHandler(obj)}
                        />
                      </Icon>
                      <InputBase
                        style={{
                          width: '50px',
                          border: 'solid 1px',
                          height: 25,
                          padding: '16px 5px',
                          borderRadius: 5,
                        }}
                        value={obj.actual_weight}
                        onChange={e => {
                          e.preventDefault();
                          const temp = { ...textValue };
                          const index = findIndex(temp[obj.asset_class], [
                            'id',
                            obj.id,
                          ]);
                          temp[obj.asset_class][index].actual_weight =
                            parseFloat(e.target.value) >= 0
                              ? parseFloat(e.target.value)
                              : 0;
                          changeTextValue(temp);
                        }}
                      />
                      <Icon color="action" style={{ cursor: 'pointer' }}>
                        <AddCircleIcon onClick={() => addClickedHandler(obj)} />
                      </Icon>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  investmentData: getInvestmentList() || [],
  err: getPortfolioError(),
  isLoading: getLoadingState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchData: id => dispatch(makeApiCallToFetchData(id)),
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
)(Portfolio);
