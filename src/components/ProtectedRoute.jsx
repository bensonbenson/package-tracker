import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import App from '../App';
import Login from './Login';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <App /> : <Login />;
}

export default ProtectedRoute;
