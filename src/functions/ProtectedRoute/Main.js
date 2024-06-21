import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from './useAuthentication'; // Adjust the path as necessary

export const ProtectedRouteDisConnected = ({ element }) => {
  const { authenticated, loading } = useAuthentication();



  return !authenticated ? element : <Navigate to="/profile" replace />;
};

export default ProtectedRouteDisConnected;
