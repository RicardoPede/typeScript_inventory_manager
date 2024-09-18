import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from './types';

interface PrivateRouteProps {
  component: ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state: AppState ) => state.auth.isAuthenticated);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
};

export default PrivateRoute;