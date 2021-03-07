import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

// Import custom components
import PrivateRoute from './PrivateRoute';
import RestrictRoute from './RestrictRoute';
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import Message from '../components/test/Message';

const AsyncLoginForm = loadable(() => import('../containers/auth/LoginContainer'));
const AsyncSignUpForm = loadable(() => import('../containers/auth/SignUpContainer'));
const AsyncDashboard = loadable(() => import('../containers/dashboard/DashboardContainer'));

const Router = () => (
  <Fragment>
    <Switch>
      <RestrictRoute exact path="/" component={AsyncLoginForm} />
      <RestrictRoute exact path="/signup" component={AsyncSignUpForm} />
      <RestrictRoute exact path="/message" component={Message} />
      <PrivateRoute exact path="/dashboard" layout={MainLayout} component={AsyncDashboard} />

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
