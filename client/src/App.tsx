import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Routes from './routes';
import { useUser } from './hooks';
import { useEffect } from 'react';

function App() {
  const { handleAuthenticated } = useUser();

  useEffect(() => {
    handleAuthenticated();
  }, []);

  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
