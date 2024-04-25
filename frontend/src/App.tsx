import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import NoteList, { Note } from './components/NoteList';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import {
  sendLoginRequest,
  sendNotesRequest,
  Credentials,
  LoginResponse,
  sendNoteUpdateRequest,
} from './assets/server-requests';
import NoteEditor from './components/NoteEditor';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [loadedNotes, setLoadedNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [isUserEditing, setIsUserEditing] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

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
    const storedNotes = await sendNotesRequest(loginToken);

    const indexedNotes = storedNotes.map((note: Note, index: number) => {
      return { index, ...note };
    });

    return indexedNotes;
  }

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    const fetchNotes = async () => {
      const userNotes = await getUserNotes(loginToken);
      setLoadedNotes(userNotes);
    };
    fetchNotes();
  }, [loggedIn]);

  const handleNoteSelection = (note: Note) => {
    setNoteToEdit(note);
    setIsUserEditing(true);
  };
  const handleNoteSave = async (updatedNote: Note, exitNote: boolean) => {
    const saveRequestStatus = await sendNoteUpdateRequest(updatedNote, loginToken);

    if (saveRequestStatus !== 200) {
      return setSaveMessage('Failed to save note');
    }

    if (saveRequestStatus === 200 && exitNote) {
      setNoteToEdit(undefined);
      setIsUserEditing(false);
    }
    
    const updatedLoadedNotes = [...loadedNotes];
    updatedLoadedNotes[updatedNote.index!] = updatedNote;
    setLoadedNotes(updatedLoadedNotes);

    return setSaveMessage('Saved');
  };

  useEffect(() => {
    setTimeout(() => {
      setSaveMessage('');
    }, 1500);
  }, [saveMessage]);

  const landingPage = !loggedIn ? (
    <Login attemptLogin={attemptLogin} />
  ) : (
    <>
      <NoteList setNoteToEdit={handleNoteSelection} notes={loadedNotes} />
      {saveMessage && <h3>{saveMessage}</h3>}
      <NoteEditor handleNoteSave={handleNoteSave} note={noteToEdit} />
    </>
  );

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
