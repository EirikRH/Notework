import { FunctionComponent, useEffect, useState } from 'react';
import { Note } from '../App';
import { getGlobalContext } from '../context/AppContext';
import { sendNoteDeletionRequest } from '../assets/server-requests';

interface NoteBannerProps {
  note: Note;
}

const NoteBanner: FunctionComponent<NoteBannerProps> = ({ note }) => {
  const {
    setSelectedNote,
    setLoadedNotes,
    setSaveMessage,
    selectedNote,
    loadedNotes,
    setIsUserEditing,
    isUserEditing,
    isCurrentNoteSaved,
  } = getGlobalContext();

  const [certain, setCertain] = useState(false);

  const handleNoteDelete = async (note: Note) => {
    const loginToken: string = localStorage.getItem('loginToken')!;
    const deleteRequestStatus = await sendNoteDeletionRequest(note, loginToken);

    if (selectedNote?.index === note.index) {
      setSelectedNote(undefined);
    }

    if (deleteRequestStatus !== 200) {
      return setSaveMessage('Failed to delete note');
    }
    const updatedLoadedNotes = loadedNotes.filter((loadedNote) => loadedNote.index !== note.index);

    setLoadedNotes(updatedLoadedNotes);
  };

  const deleteButtonText = certain ? 'Are you sure?' : 'Delete';
  useEffect(() => {
    if (certain) {
      const timer = setTimeout(() => {
        setCertain(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [certain]);

  const handleNoteClick = (note: Note) => {
    if (isCurrentNoteSaved && selectedNote?.index === note.index) {
      return handleSavedNoteDeselection();
    }

    setSelectedNote(note);
    if (!isUserEditing) {
      setIsUserEditing(true);
    }
  };

  const handleSavedNoteDeselection = () => {
    setSelectedNote(undefined);
    setIsUserEditing(false);
  };

  return (
    <li
      onClick={() => {
        handleNoteClick(note);
      }}
      className="noteBanner"
      key={note.index}
    >
      <div className="previewHolder">
        <p className="noteBannerTitle">{note.title}</p>
        <p className="noteBannerPreview">{note.content}</p>
      </div>
      <button
        type="button"
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
