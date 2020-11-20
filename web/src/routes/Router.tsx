import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthContext } from '../hooks/AuthContext';

interface PrivateRoute extends RouteProps {
  privateRoute?: boolean;
  component: React.ComponentType
}

const Router: React.FC<PrivateRoute> = ({ privateRoute=false, component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return(
    <Route 
      {...rest}
      render={() => {
        return privateRoute === !!user 
        ? <Component /> 
        : <Redirect to={{ pathname: privateRoute ? '/' : '/dashboard' }} />
      }}
    />
  );
}

export default Router;