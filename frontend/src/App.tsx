import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import NoteEditor from './components/NoteEditor';

import { sendNotesRequest } from './assets/server-requests';

export interface Note {
  user_ID?: number;
  note_ID?: number;
  title: string;
  content: string;
  index?: number;
  tags?: string[];
}

import { getGlobalContext } from './context/AppContext';
import NoteMenu from './components/NoteMenu';

function App() {
  const {
    displayNoteMenu,
    loggedIn,
    setLoggedIn,
    setLoadedNotes,
    saveMessage,
    setSaveMessage,
  } = getGlobalContext();

  const loginToken: string = localStorage.getItem('loginToken')!;

  useEffect(() => {
    if (loginToken) {
      setLoggedIn(true);
    }
  }, [loginToken]);

  useEffect(() => {
    if (!loggedIn) {
      return setLoadedNotes([]);
    }
    getUserNotes(loginToken);
  }, [loggedIn]);

  async function getUserNotes(loginToken: string): Promise<void> {
    const storedNotes = await sendNotesRequest(loginToken);

    const indexedNotes = storedNotes.map((note: Note, index: number) => {
      return { index, ...note };
    });
    setLoadedNotes(indexedNotes);
  }

  useEffect(() => {
    setTimeout(() => {
      setSaveMessage('');
    }, 1000);
  }, [saveMessage]);

  const landingPage = !loggedIn ? (
    <Login />
  ) : (
    <>
      {displayNoteMenu && <NoteMenu />}
      <NoteEditor />
    </>
  );

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={landingPage} />
          <Route path="/createUser" element={<CreateUser />} />
        </Routes>
      </main>
      {saveMessage && <p className="saveMessage">{saveMessage}</p>}
    </>
  );
}

export default App;