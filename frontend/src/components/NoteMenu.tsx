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
    const searchArr = search.split(' ');
    const searchTags = searchArr.filter((word) => word.startsWith('@'));
    const searchWords = searchArr
      .filter((word) => !word.startsWith('@'))
      .join(' ');

    const filteredNotes = loadedNotes.filter((note: Note) => {
      for (let i = 0; i < searchTags.length; i++) {
        if (note.tags!.toLowerCase().includes(searchTags[i].toLowerCase())) {
          return true;
        }
      }
      note.content.toLowerCase().includes(searchWords.toLowerCase()) ||
        note.title.toLowerCase().includes(searchWords.toLowerCase());
    });
    setDisplayedNotes(filteredNotes);
  }, [search, loadedNotes]);

  return (
    <ul className="menu">
      <input
        autoFocus
        className="searchBar"
        type="text"
        placeholder="Example search: @yourtag @memo words to search for"
        onChange={(event) => setSearch(event.target.value)}
      />
      <ul className="noteList">{noteBanners}</ul>
      <LogOutButton />
    </ul>
  );
};

export default NoteMenu;
