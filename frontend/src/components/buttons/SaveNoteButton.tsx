import { FunctionComponent, useState } from 'react';
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

  const[waitingForSave, setWaitingForSave] = useState(false);

  const loginToken = localStorage.getItem('loginToken')!;

  const handleSaveClick = async (note: Note) => {
    if (waitingForSave) {
      setSaveMessage('Not so fast');
      return;
    }
    if (!isCurrentNoteNew) {
      return await handleNoteUpdate(note);
    }
    await handleSaveNewNote(note);
  };

  const handleNoteUpdate = async (updatedNote: Note) => {
    const updateRequestStatus = await sendNoteUpdateRequest(updatedNote, loginToken);

    if (updateRequestStatus !== 200) {
      return setSaveMessage('Failed to save update');
    }

    const indexOfUpdatedNote: number = loadedNotes.findIndex(note => note.note_ID === updatedNote.note_ID)
    const updatedLoadedNotes = [...loadedNotes];
    updatedLoadedNotes[indexOfUpdatedNote].title = updatedNote.title;
    updatedLoadedNotes[indexOfUpdatedNote].content = updatedNote.content;
    updatedLoadedNotes[indexOfUpdatedNote].tags = updatedNote.tags;

    setLoadedNotes(updatedLoadedNotes);
    setIsCurrentNoteSaved(true);
    setSaveMessage('Saved');
    setWaitingForSave(false);
  };

  const handleSaveNewNote = async (newNote: Note) => {
    const saveNoteResponse = await sendNoteCreationRequest(newNote, loginToken);

    if (saveNoteResponse.status !== 201) {
      return setSaveMessage('Failed to save new note');
    }

    const savedNote: Note = await saveNoteResponse.json();
    const updatedLoadedNotes: Note[] = [...loadedNotes]
    updatedLoadedNotes.unshift(savedNote);

    setLoadedNotes(updatedLoadedNotes);
    setSelectedNote(savedNote);
    setIsCurrentNoteSaved(true);
    setIsCurrentNoteNew(false);
    setSaveMessage('Saved');
    setWaitingForSave(false);
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
