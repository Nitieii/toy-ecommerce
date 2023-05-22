import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Routes from './routes';
import { useUser, useProduct } from './hooks';
import { useEffect, useState } from 'react';
import handleTokenExpired from './utils/jwt.ts';

function App() {
  const { handleAuthenticated } = useUser();

  const { searchMode } = useProduct();

  const [expiredTimer, setExpiredTimer] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    handleAuthenticated();

    const expiresAt = Number(localStorage.getItem('expires_at'));

    if (expiredTimer) {
      clearTimeout(Number(expiresAt));
    }

    const timer = handleTokenExpired(expiresAt);
    setExpiredTimer(timer);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('search-wrapper-on');
  }, [searchMode]);

  // Check if token is expires
  // If token is expired, redirect to login page
  // If token is not expired, redirect to home page

  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
