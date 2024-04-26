import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';
interface CloseNoteButtonProps {}

const CloseNoteButton: FunctionComponent<CloseNoteButtonProps> = () => {
  const { isCurrentNoteSaved, setSelectedNote } = getGlobalContext();
  return (
    <button
      type="button"
      className="exitButton"
      disabled={!isCurrentNoteSaved}
      onClick={() => {
        setSelectedNote(undefined);
      }}
    >
      Close
    </button>
  );
};

export default CloseNoteButton;
