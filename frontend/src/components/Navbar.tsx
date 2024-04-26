import { FunctionComponent} from 'react';
import { getGlobalContext } from '../context/AppContext';
import NoteList from './NoteList';
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { loggedIn, displayNoteMenu, setDisplayNoteMenu } = getGlobalContext();

  return (
    <nav>
      <p>Notework</p>
      {loggedIn && (
        <button
          className={`menuButton ${displayNoteMenu && 'toggled'}`}
          onClick={() => setDisplayNoteMenu(!displayNoteMenu)}
        >
          Notes
        </button>
      )}
      {displayNoteMenu && <NoteList />}
    </nav>
  );
};

export default Navbar;
