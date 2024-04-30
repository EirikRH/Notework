import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';
interface CloseNoteButtonProps {}

const CloseNoteButton: FunctionComponent<CloseNoteButtonProps> = () => {
  const { setSelectedNote, setDisplayNoteMenu } =
    getGlobalContext();
  return (
    <button
      type="button"
      className="exitButton"
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
