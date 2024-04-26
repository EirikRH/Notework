import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';
import { sendNoteCreationRequest, sendNoteUpdateRequest } from '../../assets/server-requests';
import { Note } from '../../App';

interface SaveNoteButtonProps {
  alteredNote: Note;
}

const SaveNoteButton: FunctionComponent<SaveNoteButtonProps> = ({ alteredNote }) => {
  const {
    setSelectedNote,
    loadedNotes,
    setLoadedNotes,
    isCurrentNoteSaved,
    setIsCurrentNoteSaved,
    isCurrentNoteNew,
    setIsCurrentNoteNew,
    setSaveMessage,
  } = getGlobalContext();

  const loginToken = localStorage.getItem('loginToken')!;

  const handleSaveClick = async (note: Note) => {
    if (!isCurrentNoteNew) {
      return await handleNoteUpdate(note);
    }

    handleSaveNewNote(note);
  };

  const handleNoteUpdate = async (updatedNote: Note) => {
    const updateRequestStatus = await sendNoteUpdateRequest(updatedNote, loginToken);

    if (updateRequestStatus !== 200) {
      return setSaveMessage('Failed to save update');
    }
    const updatedLoadedNotes = [...loadedNotes];
    updatedLoadedNotes[updatedNote.index!].title = updatedNote.title;
    updatedLoadedNotes[updatedNote.index!].content = updatedNote.content;

    setLoadedNotes(updatedLoadedNotes);
    setIsCurrentNoteSaved(true);
    setSaveMessage('Saved');
  };

  const handleSaveNewNote = async (newNote: Note) => {
    const saveNoteResponse = await sendNoteCreationRequest(newNote, loginToken);

    if (saveNoteResponse.status !== 201) {
      return setSaveMessage('Failed to save new note');
    }

    const savedNote = await saveNoteResponse.json();
    savedNote.index = loadedNotes.length;
    const updatedLoadedNotes = loadedNotes.concat(savedNote);

    setLoadedNotes(updatedLoadedNotes);
    setSelectedNote(savedNote);
    setIsCurrentNoteSaved(true);
    setIsCurrentNoteNew(false);
    setSaveMessage('Saved');
  };
  return (
    <button
      type="button"
      className="saveButton"
      disabled={isCurrentNoteSaved}
      onClick={() => {
        handleSaveClick(alteredNote);
      }}
    >
      Save
    </button>
  );
};

export default SaveNoteButton;
