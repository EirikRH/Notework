import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';

interface NewNoteButtonProps {}

const NewNoteButton: FunctionComponent<NewNoteButtonProps> = () => {
  const { setIsCurrentNoteNew, setIsUserEditing, setSelectedNote, isUserEditing, loadedNotes } = getGlobalContext();

  const handleNewNoteClick = () => {
    setIsCurrentNoteNew(true);
    if (!isUserEditing) {
      setIsUserEditing(true);
    }
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
