import React, { createContext, useState, useContext } from 'react';

import { Note } from '../App';

export interface GlobalContextProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  activeUser: string;
  setActiveUser: React.Dispatch<React.SetStateAction<string>>;
  loadedNotes: Note[] | [];
  setLoadedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNote: Note | undefined;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
  isUserEditing: boolean;
  setIsUserEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentNoteNew: boolean;
  setIsCurrentNoteNew: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentNoteSaved: boolean;
  setIsCurrentNoteSaved: React.Dispatch<React.SetStateAction<boolean>>;
  saveMessage: string;
  setSaveMessage: React.Dispatch<React.SetStateAction<string>>;
  resetGlobalContext: () => void;
  setContextAtLogin: (username: string) => void;
}

const GlobalContext = createContext<GlobalContextProps>({});

export const getGlobalContext = (): GlobalContextProps => {
  return useContext(GlobalContext);
};

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<string>('');
  const [loadedNotes, setLoadedNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [isUserEditing, setIsUserEditing] = useState<boolean>(false);
  const [isCurrentNoteNew, setIsCurrentNoteNew] = useState<boolean>(false);
  const [isCurrentNoteSaved, setIsCurrentNoteSaved] = useState<boolean>(true);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const resetGlobalContext = () => {
    setLoggedIn(false);
    setActiveUser('');
    setLoadedNotes([]);
    setSelectedNote(undefined);
    setIsUserEditing(false);
    setIsCurrentNoteNew(false);
    setIsCurrentNoteSaved(true);
    setSaveMessage('');
  };

  const setContextAtLogin = (username: string) => {
    setLoggedIn(true);
    setActiveUser(username);
  };

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        activeUser,
        setActiveUser,
        loadedNotes,
        setLoadedNotes,
        selectedNote,
        setSelectedNote,
        isUserEditing,
        setIsUserEditing,
        isCurrentNoteNew,
        setIsCurrentNoteNew,
        isCurrentNoteSaved,
        setIsCurrentNoteSaved,
        saveMessage,
        setSaveMessage,
        resetGlobalContext,
        setContextAtLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
