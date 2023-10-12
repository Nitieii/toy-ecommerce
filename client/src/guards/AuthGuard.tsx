import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const { isAdmin } = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !isAdmin) return navigate('/login');
  }, []);

  return <>{children}</>;
};

export default GuestGuard;
