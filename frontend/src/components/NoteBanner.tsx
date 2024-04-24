import { FunctionComponent } from 'react';
import { Note } from './NoteList';

interface NoteBannerProps {
  note: Note;
  editRequest: (note: Note) => void;
}

const NoteBanner: FunctionComponent<NoteBannerProps> = ({ note, editRequest }) => {
  return (
    <li onClick={() => editRequest(note)} className="noteBanner">
      <h4>{note.title}</h4>
      <h5>{note.content}</h5>
    </li>
  );
};

export default NoteBanner;
