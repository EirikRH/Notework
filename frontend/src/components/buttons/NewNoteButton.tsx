import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';

interface NewNoteButtonProps {}

const NewNoteButton: FunctionComponent<NewNoteButtonProps> = () => {
  const {
    setDisplayNoteMenu,
    setIsCurrentNoteNew,
    setIsUserEditing,
    setSelectedNote,
    loadedNotes,
  } = getGlobalContext();

  const handleNewNoteClick = () => {
    setIsCurrentNoteNew(true);
    setIsUserEditing(true);
    setDisplayNoteMenu(false);
    setSelectedNote({
      index: loadedNotes.length,
      title: '',
      content: '',
    });
  };

  return (
    <button id="NewNoteButton" onClick={() => handleNewNoteClick()}>
      +
    </button>
  );
};

export default NewNoteButton;
