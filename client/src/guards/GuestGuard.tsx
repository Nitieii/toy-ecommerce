import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from "hooks/useAuth";
// import { PATH_AUTH } from "../routes/path.js";

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  // const { isLoading, isAuthenticated } = useAuth();
  const isLoading = false;

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // if (!isAuthenticated) return;
  //
  //   return navigate('/');
  // }, [navigate]);

  if (isLoading) {
    return <div>loading auth login</div>;
  }

  return <>{children}</>;
};

export default GuestGuard;
