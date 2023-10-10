import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // If user is logged in, redirect to home page
    if (token) {
      navigate('/', { replace: true });
    } else {
      if (window.location.pathname === '/login') {
        navigate('/login', { replace: true });
      } else if (window.location.pathname === '/signup') {
        navigate('/signup', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, []);

  return <>{children}</>;
};

export default GuestGuard;
