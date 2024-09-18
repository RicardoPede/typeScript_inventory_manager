declare module 'PrivateRoutes' {
  import { ComponentType } from 'react';
  import { RouteProps } from 'react-router-dom';

  type PrivateRouteProps = RouteProps & {
    component: ComponentType<any>;
  };

  const PrivateRoute: React.FC<PrivateRouteProps>;
  export default PrivateRoute;
}