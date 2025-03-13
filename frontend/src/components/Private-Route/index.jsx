import { Outlet, Navigate } from 'react-router-dom';

import { checkToken } from '../../utils/check-token';

const PrivateRoute = () => {
  //   return checkToken() ? <Outlet /> : <Navigate to="/login" />;

  const isAuthenticated = checkToken(); // Get true or false

  if (!isAuthenticated) {
    alert('You must login first!');

    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
