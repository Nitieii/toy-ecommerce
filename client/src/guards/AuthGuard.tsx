import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// hooks
import { useUser } from '../hooks';
// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { pathname } = useLocation();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const requestedLocation = localStorage.getItem('path');

    if (!isAuthenticated) {
      localStorage.setItem('path', pathname || '');
      return navigate('/login');
    }

    setLoading(false);
    if (requestedLocation && requestedLocation !== pathname) {
      localStorage.removeItem('path');
      return navigate(requestedLocation);
    }

    return navigate('/');
  }, [isAuthenticated]);

  if (loading) {
    return <div>loading auth</div>;
  }

  return <>{children}</>;
}
