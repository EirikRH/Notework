import { FunctionComponent } from 'react';
import { Note } from './NoteList';

interface NoteBannerProps {
  note: Note;
  setNoteToEdit: (note: Note) => void;
}

const NoteBanner: FunctionComponent<NoteBannerProps> = ({ note, setNoteToEdit, }) => {
  return (
    <li
      onClick={() => {
        setNoteToEdit(note);
      }}
      className="noteBanner"
      key={note.index}
    >
      <h4>{note.title}</h4>
      <h5>{note.content}</h5>
    </li>
  );
};

export default NoteBanner;
