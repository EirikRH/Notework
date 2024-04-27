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
      tags: '',
    });
  };

  return (
    <p id="NewNoteButton" onClick={() => handleNewNoteClick()}>
      +
    </p>
  );
};

export default NewNoteButton;
