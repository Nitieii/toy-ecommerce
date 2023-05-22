import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/authenticate/login';
import Signup from '../components/authenticate/signup';

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token && children === <Signup />) return navigate('/signup');

    if (!token && children !== <Signup />) return navigate('/login');

    if (token && (children === <Login /> || children === <Signup />))
      return navigate('/');
  }, []);

  return <>{children}</>;
};

export default GuestGuard;
