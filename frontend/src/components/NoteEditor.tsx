import { FunctionComponent, useState, useEffect } from 'react';
import { getGlobalContext } from '../context/AppContext';
import NewNoteButton from './buttons/NewNoteButton';
import SaveNoteButton from './buttons/SaveNoteButton';
import CloseNoteButton from './buttons/CloseNoteButton';

interface NoteEditorProps {}

const NoteEditor: FunctionComponent<NoteEditorProps> = () => {
  const { selectedNote, setIsCurrentNoteSaved, setDisplayNoteMenu } =
    getGlobalContext();

  if (!selectedNote) {
    return <NewNoteButton />;
  }
  const [currentTitle, setCurrentTitle] = useState(selectedNote.title);
  const [currentContent, setCurrentContent] = useState(selectedNote.content);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentTitle(event.target.value);
    setIsCurrentNoteSaved(false);
    setDisplayNoteMenu(false);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCurrentContent(event.target.value);
    setIsCurrentNoteSaved(false);
    setDisplayNoteMenu(false);
  }

  useEffect(() => {
    if (selectedNote) {
      setCurrentTitle(selectedNote.title);
      setCurrentContent(selectedNote.content);
      setIsCurrentNoteSaved(true);
    }
  }, [selectedNote]);

  const currentNote = {
    ...selectedNote,
    title: currentTitle,
    content: currentContent,
  };

  return (
    <div className="editNote">
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
      <div className="editButtonHolder">
        <SaveNoteButton alteredNote={currentNote} />
        <CloseNoteButton />
      </div>
    </div>
  );
};

export default NoteEditor;
