import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import NoteList from './components/NoteList';
import Navbar from './components/Navbar';

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

  const landingPage = !loggedIn ? <Login /> : <NoteList loginToken={loginToken} />;

  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={landingPage} />
        </Routes>
      </main>
    </>
  );
}

export default App;
