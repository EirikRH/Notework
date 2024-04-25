import { FunctionComponent, useEffect, useState } from 'react';
import { Note } from './NoteList';

interface NoteBannerProps {
  note: Note;
  setNoteToEdit: (note: Note) => void;
  handleNoteDelete: (note: Note) => void;
}

const NoteBanner: FunctionComponent<NoteBannerProps> = ({ note, setNoteToEdit, handleNoteDelete }) => {
  const [certain, setCertain] = useState(false);
  const deleteButtonText = certain ? 'Are you sure?' : 'Delete';

  useEffect(() => {
    if (certain) {
      const timer = setTimeout(() => {
        setCertain(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [certain]);
  return (
    <li
      onClick={() => {
        setNoteToEdit(note);
      }}
      className="noteBanner"
      key={note.index}
    >
      <div className='previewHolder'>
        <p className="noteBannerTitle">{note.title}</p>
        <p className="noteBannerPreview">{note.content}</p>
      </div>
      <button
        type="button"
        className={certain ? 'badButton' : 'neutralButton'}
        onClick={(event) => {
          event.stopPropagation();
          !certain ? setCertain(true) : handleNoteDelete(note);
        }}
      >
        {deleteButtonText}
      </button>
    </li>
  );
};

export default NoteBanner;
