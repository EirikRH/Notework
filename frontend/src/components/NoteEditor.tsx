import { FunctionComponent, useState, useEffect } from 'react';
import { Note } from './NoteList';

interface NoteEditorProps {
  isCurrentNoteNew: boolean;
  selectedNote?: Note | undefined;
  handleNewNoteClick: () => void;
  handleSaveNewNote: (note: Note) => void;
  handleNoteUpdate: (note: Note, exitNote: boolean) => void;
  handleNoteDeselection: () => void;
}

const NoteEditor: FunctionComponent<NoteEditorProps> = ({
  selectedNote,
  isCurrentNoteNew,
  handleNewNoteClick,
  handleSaveNewNote,
  handleNoteUpdate,
  handleNoteDeselection,
}) => {
  const NewNoteButton = <button onClick={() => handleNewNoteClick()}>+</button>;
  if (!selectedNote) {
    return NewNoteButton;
  }
  const [currentTitle, setCurrentTitle] = useState(selectedNote.title);
  const [currentContent, setCurrentContent] = useState(selectedNote.content);
  const [changed, setChanged] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentTitle(event.target.value);
    setChanged(true);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCurrentContent(event.target.value);
    setChanged(true);
  }

  function handleSaveClick(exitNote: boolean) {
    if (!isCurrentNoteNew) {
      return handleNoteUpdate(currentNote, exitNote);
    }

    handleSaveNewNote(currentNote);
    setChanged(false);
  }

  useEffect(() => {
    if (selectedNote) {
      setCurrentTitle(selectedNote.title);
      setCurrentContent(selectedNote.content);
      setChanged(false);
    }
  }, [selectedNote]);

  const currentNote = { ...selectedNote, title: currentTitle, content: currentContent };

  return (
    <form>
      <input
        className={'note-title-area'}
        type="text"
        onChange={(event) => handleTitleChange(event)}
        value={currentTitle}
      />
      <textarea className="note-text-area" onChange={(event) => handleContentChange(event)} value={currentContent} />

      <button
        type="button"
        className="goodButton"
        disabled={!changed}
        onClick={() => {
          changed && handleSaveClick(false);
          setChanged(false);
        }}
      >
        Save
      </button>
      <button
        type="button"
        className="neutralButton"
        onClick={() => {
          !changed ? handleNoteDeselection() : handleSaveClick(true);
        }}
      >
        X
      </button>
    </form>
  );
};

export default NoteEditor;
