import { FunctionComponent, useState, useEffect } from 'react';
import { getGlobalContext } from '../context/AppContext';
import NewNoteButton from './buttons/NewNoteButton';
import SaveNoteButton from './buttons/SaveNoteButton';
import CloseNoteButton from './buttons/CloseNoteButton';
import DiscardButton from './buttons/DiscardButton';

interface NoteEditorProps {}

const NoteEditor: FunctionComponent<NoteEditorProps> = () => {
  const {
    isUserEditing,
    selectedNote,
    isCurrentNoteSaved,
    setIsCurrentNoteSaved,
    setDisplayNoteMenu,
  } = getGlobalContext();

  if (!selectedNote) {
    return <NewNoteButton/>;
  }
  const [currentTitle, setCurrentTitle] = useState(selectedNote.title);
  const [currentTags, setCurrentTags] = useState(selectedNote.tags);
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

  function handleTagsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedTags = event.target.value;
    const formattedTags = addAtsToTags(updatedTags);

    setCurrentTags(formattedTags);
    setIsCurrentNoteSaved(false);
    setDisplayNoteMenu(false);
  }

  function addAtsToTags(tags: string): string {
    if (!tags) {
      return '';
    }

    if (tags.endsWith(' ')) {
      return tags;
    }

    const tagsArray = tags.split(' ');

    const updatedWords = tagsArray.map((word) => {
      if (word.startsWith('@')) {
        return word;
      }
      return `@${word}`;
    });
    const updatedString = updatedWords.join(' ');
    return updatedString;
  }

  useEffect(() => {
    if (selectedNote) {
      setCurrentTitle(selectedNote.title);
      setCurrentContent(selectedNote.content);
      setCurrentTags(selectedNote.tags);
      setIsCurrentNoteSaved(true);
    }
  }, [selectedNote]);

  const currentNote = {
    ...selectedNote,
    title: currentTitle,
    content: currentContent,
    tags: currentTags,
  };

  useEffect(() => {
    const isCurrentNoteEmpty =
      currentTags === '' && currentTitle === '' && currentContent === '';
    const isCurrentNoteUnchanged =
      currentTags === selectedNote.tags &&
      currentTitle === selectedNote.title &&
      currentContent === selectedNote.content;

    if (isCurrentNoteEmpty || isCurrentNoteUnchanged) {
      return setIsCurrentNoteSaved(true);
    }
  }, [currentNote]);

  const closeDiscardSwitch = isCurrentNoteSaved ? <CloseNoteButton /> : <DiscardButton/>;
  return (
    <div className="editNote">
      <input
        autoFocus
        className="editTagsArea"
        placeholder="@tag @your @idea"
        type="text"
        onChange={(event) => handleTagsChange(event)}
        value={currentTags}
      />
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
        {isUserEditing ? (
          <>
            <SaveNoteButton alteredNote={currentNote} />
            {closeDiscardSwitch}
          </>
        ) : (
          <NewNoteButton />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
