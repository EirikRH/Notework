import { FunctionComponent } from 'react';
import NoteBanner from './NoteBanner';

export interface Note {
  user_ID?: number;
  note_ID?: number;
  title: string;
  content: string;
  index?: number;
}
interface NoteListProps {
  notes: Note[];
  setNoteToEdit: (note: Note) => void;
}

const NoteList: FunctionComponent<NoteListProps> = ({ notes, setNoteToEdit }: NoteListProps) => {
  const noteBanners = notes.map((note: Note) => {
    return <NoteBanner setNoteToEdit={setNoteToEdit} note={note} key={note.index} />;
  });

  return (
    <>
      <h3 className="noteMenuTitle">My notes</h3>
      <ul className="noteList">{noteBanners}</ul>
    </>
  );
};

export default NoteList;
