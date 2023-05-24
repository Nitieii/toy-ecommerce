import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const { is_admin } = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !is_admin) return navigate('/login');
  }, []);

  return <>{children}</>;
};

export default GuestGuard;
