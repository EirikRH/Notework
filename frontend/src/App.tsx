import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import NoteList, { Note } from './components/NoteList';
import Navbar from './components/Navbar';
import CreateUser from './components/CreateUser';
import NoteEditor from './components/NoteEditor';

import {
  sendLoginRequest,
  sendNotesRequest,
  Credentials,
  LoginResponse,
  sendNoteUpdateRequest,
  sendNoteCreationRequest,
  sendNoteDeletionRequest,
} from './assets/server-requests';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  const [loadedNotes, setLoadedNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [isUserEditing, setIsUserEditing] = useState<boolean>(false);
  const [iscurrentNoteNew, setIsCurrentNoteNew] = useState<boolean>(false);

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

  async function getUserNotes(loginToken: string): Promise<void> {
    const storedNotes = await sendNotesRequest(loginToken);

    const indexedNotes = storedNotes.map((note: Note, index: number) => {
      return { index, ...note };
    });
    setLoadedNotes(indexedNotes);
  }

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    getUserNotes(loginToken);
  }, [loggedIn]);

  const handleNoteSelection = (note: Note) => {
    if (
      note.index === selectedNote?.index &&
      note.title === selectedNote?.title &&
      note.content === selectedNote?.content
    ) {
      return handleSavedNoteDeselection();
    }

    setSelectedNote(note);
    if (!isUserEditing) {
      setIsUserEditing(true);
    }
  };

  const handleSavedNoteDeselection = () => {
    setSelectedNote(undefined);
    setIsUserEditing(false);
  };

  const handleNewNoteClick = () => {
    setIsCurrentNoteNew(true);
    if (!isUserEditing) {
      setIsUserEditing(true);
    }
    setSelectedNote({
      index: loadedNotes.length,
      title: '',
      content: '',
    });
  };

  const handleSaveNewNote = async (newNote: Note) => {
    const saveNoteResponse = await sendNoteCreationRequest(newNote, loginToken);

    if (saveNoteResponse.status !== 201) {
      return setSaveMessage('Failed to save new note');
    }

    const savedNote = await saveNoteResponse.json();
    savedNote.index = loadedNotes.length;
    const updatedLoadedNotes = loadedNotes.concat(savedNote);

    setLoadedNotes(updatedLoadedNotes);
    setIsCurrentNoteNew(false);
    setSelectedNote(savedNote);
    setSaveMessage('Saved');
  };

  const handleNoteUpdate = async (updatedNote: Note, exitNote: boolean) => {
    const updateRequestStatus = await sendNoteUpdateRequest(updatedNote, loginToken);

    if (updateRequestStatus !== 200) {
      return setSaveMessage('Failed to save update');
    }

    if (updateRequestStatus === 200 && exitNote) {
      setSelectedNote(undefined);
      setIsUserEditing(false);
    }

    const updatedLoadedNotes = [...loadedNotes];
    updatedLoadedNotes[updatedNote.index!].title = updatedNote.title;
    updatedLoadedNotes[updatedNote.index!].content = updatedNote.content;
    setLoadedNotes(updatedLoadedNotes);

    setSaveMessage('Saved');
  };
  const handleNoteDelete = async (note: Note) => {
    if (selectedNote?.index === note.index) {
      setSelectedNote(undefined);
    }
    const deleteRequestStatus = await sendNoteDeletionRequest(note, loginToken);

    if (deleteRequestStatus !== 200) {
      return setSaveMessage('Failed to delete note');
    }
    const updatedLoadedNotes = loadedNotes.filter((loadedNote) => loadedNote.index !== note.index);

    setLoadedNotes(updatedLoadedNotes);
  };

  useEffect(() => {
    setTimeout(() => {
      setSaveMessage('');
    }, 1000);
  }, [saveMessage]);

  const landingPage = !loggedIn ? (
    <Login attemptLogin={attemptLogin} />
  ) : (
    <>
      <NoteList setNoteToEdit={handleNoteSelection} handleNoteDelete={handleNoteDelete} notes={loadedNotes} />
      {saveMessage && <p className="saveMessage">{saveMessage}</p>}
      <NoteEditor
        isCurrentNoteNew={iscurrentNoteNew}
        selectedNote={selectedNote}
        handleNewNoteClick={handleNewNoteClick}
        handleSaveNewNote={handleSaveNewNote}
        handleNoteUpdate={handleNoteUpdate}
        handleNoteDeselection={handleSavedNoteDeselection}
      />
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
