import { FunctionComponent } from 'react';

import { getGlobalContext } from '../context/AppContext';
import { Note } from '../App';

import NoteBanner from './NoteBanner';

interface NoteListProps {}

const NoteList: FunctionComponent<NoteListProps> = () => {
  const { activeUser, loadedNotes } = getGlobalContext();

  const noteBanners = loadedNotes.map((note: Note) => {
    return <NoteBanner note={note} key={note.index} />;
  });

  return (
    <div className="noteMenu">
      <ul className="noteList">{noteBanners}</ul>
      <p>{activeUser}</p>
    </div>
  );
};

export default NoteList;
