import { FunctionComponent } from 'react';

interface NavbarProps {
  loginCheck: () => void;
  loggedIn: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ loginCheck, loggedIn }) => {
  const logoutButton = loggedIn && (
    <a href="/">
      <button
        onClick={() => {
          localStorage.removeItem('loginToken');
          loginCheck;
        }}
      >
        Log Out
      </button>
    </a>
  );
  return <nav>{logoutButton}</nav>;
};

export default Navbar;
