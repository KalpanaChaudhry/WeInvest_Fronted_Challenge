/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import GlobalStyle from '../../global-styles';
import { Helmet } from 'react-helmet';
import InvestmentDashboard from '../InvestmentDashboard';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Portfolio from '../PortfolioConstituents';
import React from 'react';

export default function App() {
  return (
    <Container maxWidth="lg">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={InvestmentDashboard} />
        <Route path="/:id" component={Portfolio} />
        <Route path="" component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </Container>
  );
}
