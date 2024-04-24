import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const token = localStorage.getItem('loginToken');

  function loginCheck() {
    if (token) {
      setLoggedIn(true);
      setLoginToken(token);
    }
  }

  useEffect(() => {
    loginCheck();
  }, [loginToken]);

  return (
    <>
      {!loggedIn ? (
        <Login />
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem('loginToken');
            setLoggedIn(false);
          }}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default App;
