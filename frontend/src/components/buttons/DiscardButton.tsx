import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';

interface DiscardButtonProps {}

const DiscardButton: FunctionComponent<DiscardButtonProps> = () => {
  const { discardChanges, isCurrentNoteNew, setDisplayNoteMenu } =
    getGlobalContext();
  return (
    <button
      onClick={() => {
        discardChanges();
        setDisplayNoteMenu(true);
      }}
    >
      Discard {!isCurrentNoteNew && 'Edit'}
    </button>
  );
};

export default DiscardButton;
