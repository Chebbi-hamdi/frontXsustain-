import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from './useAuthentication'; // Adjust the path as necessary
import { useSelector } from 'react-redux';
import { getUser } from '../../store/tokenSlice';
import LoaderSpin from '../../drawables/loader/LoaderSpin';

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector(getUser);
  const { authenticated, loading } = useAuthentication();
  const [verified,setverified]=useState('')
  if (loading) {
    return <LoaderSpin />;  }
if (authenticated&&(user?.status==='verified')){
    return  (element) ;
}
if (authenticated&&(user?.status!=='verified')){
  return  (<Navigate to="/VerifierEmail" replace />) 
}
if (!authenticated&&(user?.status!=='verified')){
  return  (<Navigate to="/sign_in" replace />) 
}


};

export default ProtectedRoute;
