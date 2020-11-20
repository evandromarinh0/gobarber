import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Router from './Router';

const Routes: React.FC = () => {
  return(
    <Switch>
      <Router exact path="/" component={SignIn} />
      <Router path="/sign-up" component={SignUp} />
      <Router path="/forgot-password" component={ForgotPassword} />
      <Router path="/reset-password" component={ResetPassword} />

      <Router path="/dashboard" component={Dashboard} privateRoute />
    </Switch>
  );
}

export default Routes;