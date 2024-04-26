import { FunctionComponent, useState, useEffect } from 'react';

import { getGlobalContext } from '../context/AppContext';
import { Note } from '../App';
import LogOutButton from './buttons/LogOutButton';

import NoteBanner from './NoteBanner';

interface NoteListProps {}

const NoteList: FunctionComponent<NoteListProps> = () => {
  const { activeUser, loadedNotes } = getGlobalContext();
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
    console.log(search);

    setDisplayedNotes(filteredNotes);
  }, [search, loadedNotes]);

  return (
    <div className="noteMenu">
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <ul className="noteList">{noteBanners}</ul>
      <p>{activeUser}</p>
      <LogOutButton />
    </div>
  );
};

export default NoteList;
