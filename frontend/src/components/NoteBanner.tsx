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
    setIsCurrentNoteNew,
    isUserEditing,
    isCurrentNoteSaved,
  } = getGlobalContext();

  const [certain, setCertain] = useState(false);

  const handleNoteDelete = async (note: Note) => {
    const loginToken: string = localStorage.getItem('loginToken')!;
    const deleteRequestStatus = await sendNoteDeletionRequest(note, loginToken);

    if (selectedNote?.note_ID === note.note_ID) {
      setSelectedNote(undefined);
    }

    if (deleteRequestStatus !== 200) {
      return setSaveMessage('Failed to delete note');
    }
    const updatedLoadedNotes = loadedNotes.filter(
      (loadedNote) => loadedNote.note_ID !== note.note_ID
    );

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
    if (isCurrentNoteSaved && selectedNote?.note_ID === note.note_ID) {
      return handleSavedNoteDeselection();
    }

    setSelectedNote(note);
    setIsCurrentNoteNew(false);
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
      key={note.note_ID}
    >
      <div className="previewHolder">
        <p className="titlePreview">{note.title}</p>
        <p className="tagsPreview">{note.tags}</p>
        <p className="contentPreview">{note.content}</p>
      </div>
      <button
        className="deleteButton"
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
