import { FunctionComponent, useState, useEffect } from 'react';
import { getGlobalContext } from '../context/AppContext';
import LogOutButton from './buttons/LogOutButton';
import NoteList from './NoteList';
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { loggedIn, isUserEditing } = getGlobalContext();
  const [displayNoteList, setDisplayNoteList] = useState(false);

  useEffect(() => {
    if(isUserEditing){
      setDisplayNoteList(false);
    }
  }, [isUserEditing]);

  return (
    <nav>
      <p>Notework</p> 
      {loggedIn && <LogOutButton />}
      <button onClick={() => setDisplayNoteList(!displayNoteList)}>Menu</button>
      {displayNoteList && <NoteList />}
    </nav>
  );
};

export default Navbar;
