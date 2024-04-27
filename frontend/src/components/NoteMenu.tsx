import { FunctionComponent, useState, useEffect } from 'react';

import { getGlobalContext } from '../context/AppContext';
import { Note } from '../App';
import LogOutButton from './buttons/LogOutButton';

import NoteBanner from './NoteBanner';

interface NoteListProps {}

const NoteMenu: FunctionComponent<NoteListProps> = () => {
  const { loadedNotes } = getGlobalContext();
  const [searchString, setSearchString] = useState('');
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>(loadedNotes);

  const noteBanners = displayedNotes.map((note: Note) => {
    return <NoteBanner note={note} key={note.index} />;
  });

  const filterNotes = (search: string, notes: Note[]) => {
    let notesToFilter = notes;
    const searchArr = search.split(' ');
    const searchTags = searchArr.filter((word) => word.startsWith('@'));
    const searchWords = searchArr
      .filter((word) => !word.startsWith('@'))
      .join(' ');

    if (searchTags.length > 0) {
      notesToFilter = loadedNotes.filter((note: Note) => {
        for (let i = 0; i < searchTags.length; i++) {
          const searchTag = searchTags[i];
          if (!note.tags!.toLowerCase().includes(searchTag.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
    }

    if (!searchWords) {
      return notesToFilter;
    }

    const fullyFilteredNotes = notesToFilter.filter((note: Note, i) => {
      if (
        note.content.toLowerCase().includes(searchWords.toLowerCase()) ||
        note.title.toLowerCase().includes(searchWords.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    return fullyFilteredNotes;
  };
  const handleSearchChange = (event: any) => {
    setSearchString(event.target.value);
  };
  useEffect(() => {
    if (!searchString) {
      return setDisplayedNotes(loadedNotes);
    }

    const filteredNotes = filterNotes(searchString, loadedNotes);
    setDisplayedNotes(filteredNotes);
  }, [searchString, loadedNotes]);

  return (
    <ul className="menu">
      <input
        autoFocus
        className="searchBar"
        type="text"
        placeholder="Example filter: @yourtag @memo words to search for"
        onChange={(event) => handleSearchChange(event)}
      />
      <ul className="noteList">{noteBanners}</ul>
      <LogOutButton />
    </ul>
  );
};

export default NoteMenu;
