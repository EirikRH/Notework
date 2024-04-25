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
  const NewNoteButton = (
    <button id="NewNoteButton" onClick={() => handleNewNoteClick()}>
      +
    </button>
  );
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
    <form className="editNote">
      <input
        className="editTitleArea"
        placeholder="Title.."
        type="text"
        onChange={(event) => handleTitleChange(event)}
        value={currentTitle}
      />
      <textarea
        placeholder="Here you can type anything..."
        className="editTextArea"
        onChange={(event) => handleContentChange(event)}
        value={currentContent}
      />
      <div className='editButtonHolder'>
        <button
          type="button"
          className="saveButton"
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
          className="exitButton"
          onClick={() => {
            !changed ? handleNoteDeselection() : handleSaveClick(true);
          }}
        >
          Exit
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
