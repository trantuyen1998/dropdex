import useAuthStore from 'pages/Login/store/auth';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequiredAuth({ children }) {
  const { token } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log({ token });
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
