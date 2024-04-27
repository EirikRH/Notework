import { FunctionComponent} from 'react';
import { getGlobalContext } from '../context/AppContext';
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { loggedIn, displayNoteMenu, setDisplayNoteMenu } = getGlobalContext();

  return (
    <nav>
      <p className='logo'>Notework</p>
      {loggedIn && (
        <button
          className={`menuButton ${displayNoteMenu && 'toggled'}`}
          onClick={() => setDisplayNoteMenu(!displayNoteMenu)}
        >
          Menu
        </button>
      )}
    </nav>
  );
};

export default Navbar;
