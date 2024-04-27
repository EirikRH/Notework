import { FunctionComponent, useState, useEffect } from 'react';

import { getGlobalContext } from '../context/AppContext';
import { Note } from '../App';
import LogOutButton from './buttons/LogOutButton';

import NoteBanner from './NoteBanner';

interface NoteListProps {}

const NoteMenu: FunctionComponent<NoteListProps> = () => {
  const { loadedNotes } = getGlobalContext();
  const [search, setSearch] = useState('');
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>(loadedNotes);

  const noteBanners = displayedNotes.map((note: Note) => {
    return <NoteBanner note={note} key={note.index} />;
  });

  useEffect(() => {
    if (!search) {
      return setDisplayedNotes(loadedNotes);
    }
    const filteredNotes = loadedNotes.filter((note: Note) => {
      return (
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.title.toLowerCase().includes(search.toLowerCase())
      );
    });

    setDisplayedNotes(filteredNotes);
  }, [search, loadedNotes]);

  return (
    <ul className="menu">
      <input
        autoFocus
        className="searchBar"
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <ul className="noteList">{noteBanners}</ul>
      <LogOutButton />
    </ul>
  );
};

export default NoteMenu;
