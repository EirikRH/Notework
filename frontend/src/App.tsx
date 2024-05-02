import './App.css';
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import NoteEditor from './components/NoteEditor';

import { sendNotesRequest } from './assets/server-requests';

import { getGlobalContext } from './context/AppContext';

import NoteMenu from './components/NoteMenu';
export interface Note {
  user_ID?: number;
  note_ID?: number;
  title: string;
  content: string;
  tags?: string;
}

function App() {
  const {
    displayNoteMenu,
    creatingUser,
    loggedIn,
    setLoggedIn,
    setLoadedNotes,
    saveMessage,
    setSaveMessage,
  } = getGlobalContext();
  const [saveMessageTimeout, setSaveMessageTimeout] = useState<NodeJS.Timeout | null>(null);
  const loginToken: string = localStorage.getItem('loginToken')!;

  useEffect(() => {
    if (!loggedIn) {
      return setLoadedNotes([]);
    }
    getUserNotes(loginToken);
  }, [loggedIn]);

  useEffect(() => {
    if (loginToken) {
      setLoggedIn(true);
    }
  }, [loginToken]);

  async function getUserNotes(loginToken: string): Promise<void> {
    const storedNotes = await sendNotesRequest(loginToken);
    setLoadedNotes(storedNotes);
  }

  useEffect(() => {
    if (!saveMessage) {
      return;
    }

    clearTimeout(saveMessageTimeout!);
    setSaveMessageTimeout(null);

    const newTimeout = setTimeout(() => {
      setSaveMessage('');
    }, 1500);
    setSaveMessageTimeout(newTimeout);
    
  }, [saveMessage]);

  const landingPage = !loggedIn ? (
    <>
      {!creatingUser && <Login />}
      {creatingUser && <CreateUser />}
    </>
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
        {saveMessage && <p className="saveMessage">{saveMessage}</p>}
        {landingPage}
      </main>
    </>
  );
}

export default App;
