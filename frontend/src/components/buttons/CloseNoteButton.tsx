import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';
interface CloseNoteButtonProps {}

const CloseNoteButton: FunctionComponent<CloseNoteButtonProps> = () => {
  const { isCurrentNoteSaved, setSelectedNote, setDisplayNoteMenu } =
    getGlobalContext();
  return (
    <button
      type="button"
      className="exitButton"
      disabled={!isCurrentNoteSaved}
      onClick={() => {
        setSelectedNote(undefined);
        setDisplayNoteMenu(true);
      }}
    >
      Close
    </button>
  );
};

export default CloseNoteButton;
