import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import NoteList, { Note } from './components/NoteList';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import { sendLoginRequest, sendNoteRequest, Credentials, LoginResponse } from './assets/server-requests';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const token = localStorage.getItem('loginToken');

  async function attemptLogin(credentials: Credentials): Promise<LoginResponse> {
    const login = await sendLoginRequest(credentials);

    if (login.status === 200) {
      localStorage.setItem('loginToken', login.data.loginToken!);
      window.location.href = '/';
    }
    return login;
  }

  function loginCheck() {
    if (token) {
      setLoggedIn(true);
      setLoginToken(token);
    }
  }

  useEffect(() => {
    loginCheck();
  }, [loginToken]);

  async function getUserNotes(loginToken: string): Promise<Note[]> {
    const storedNotes = await sendNoteRequest(loginToken);

    return storedNotes;
  }

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    const fetchNotes = async () => {
      const userNotes = await getUserNotes(loginToken);
      setNotes(userNotes);
    };
    fetchNotes();
  }, [loggedIn]);

  const landingPage = !loggedIn ? <Login attemptLogin={attemptLogin} /> : <NoteList notes={notes} />;

  return (
    <>
      <main>
        <Navbar loginCheck={loginCheck} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={landingPage} />
          <Route path="/createUser" element={<CreateUser attemptLogin={attemptLogin} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
