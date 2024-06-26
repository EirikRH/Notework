import { FunctionComponent, useState, useEffect } from 'react';

import { getGlobalContext } from '../context/AppContext';
import { Note } from '../App';
import LogOutButton from './buttons/LogOutButton';

import NoteBanner from './NoteBanner';
import { filterNotes } from '../assets/NoteFilter';

interface NoteListProps {}

const NoteMenu: FunctionComponent<NoteListProps> = () => {
  const { loadedNotes } = getGlobalContext();
  const [searchString, setSearchString] = useState('');
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>(loadedNotes);

  const noteBanners = displayedNotes.map((note: Note) => {
    return <NoteBanner note={note} key={note.note_ID} />;
  });

  const handleSearchChange = (event: any) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (searchString.endsWith(' ')) {
      return;
    }

    if (
      !searchString ||
      (searchString.length < 2 && searchString.startsWith('@'))
    ) {
      const shouldReRender = displayedNotes.length !== loadedNotes.length;
      shouldReRender && setDisplayedNotes(loadedNotes);
      return;
    }

    const filteredNotes = filterNotes(searchString, loadedNotes);
    setDisplayedNotes(filteredNotes);
  }, [searchString, loadedNotes]);

  return (
    <ul className="menu">
      <input
        className="searchBar"
        type="text"
        placeholder="@tags @first then words to search for"
        onChange={(event) => handleSearchChange(event)}
      />
      <ul className="noteList">{noteBanners}</ul>
      <LogOutButton />
    </ul>
  );
};

export default NoteMenu;
