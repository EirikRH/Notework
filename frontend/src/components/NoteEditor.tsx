import { FunctionComponent, useState } from 'react';
import { Note } from './NoteList';

interface NoteEditorProps {
  note?: Note;
  handleNoteSave: (note: Note, exitNote: boolean) => void;
}

const NoteEditor: FunctionComponent<NoteEditorProps> = ({ note, handleNoteSave }) => {
  if (!note) {
    return <h1>Create a new note</h1>;
  }

  const [currentTitle, setCurrentTitle] = useState(note!.title || '');
  const [currentContent, setCurrentContent] = useState(note!.content || '');

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentTitle(event.target.value);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCurrentContent(event.target.value);
  }

  const currentNote = { ...note, title: currentTitle, content: currentContent };

  return (
    <form>
      <input type="text" onChange={(event) => handleTitleChange(event)} value={currentTitle} />
      <textarea onChange={(event) => handleContentChange(event)} value={currentContent} />

      <button type="button" onClick={() => handleNoteSave(currentNote, false)}>
        Save
      </button>
      <button type="button" onClick={() => handleNoteSave(currentNote, true)}>
        X
      </button>
    </form>
  );
};

export default NoteEditor;
