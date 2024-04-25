import { FunctionComponent, useState, useEffect } from 'react';
import { Note } from './NoteList';

interface NoteEditorProps {
  selectedNote?: Note;
  handleNoteSave: (note: Note, exitNote: boolean) => void;
  handleNoteDeselection: () => void;
}

const NoteEditor: FunctionComponent<NoteEditorProps> = ({ selectedNote, handleNoteSave, handleNoteDeselection }) => {
  if (!selectedNote) {
    return <button>+</button>;
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
      <input type="text" onChange={(event) => handleTitleChange(event)} value={currentTitle} />
      <textarea onChange={(event) => handleContentChange(event)} value={currentContent} />

      <button
        type="button"
        onClick={() => {
          changed && handleNoteSave(currentNote, false);
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => {
          !changed ? handleNoteDeselection() : handleNoteSave(currentNote, true);
        }}
      >
        X
      </button>
    </form>
  );
};

export default NoteEditor;
