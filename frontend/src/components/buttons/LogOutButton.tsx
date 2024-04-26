import { FunctionComponent } from 'react';
import { getGlobalContext } from '../../context/AppContext';

interface LogutButtonProps {}

const LogOutButton: FunctionComponent<LogutButtonProps> = () => {
  const { isCurrentNoteSaved, resetGlobalContext, setSaveMessage } =
    getGlobalContext();

  const handleLogoutClick = () => {
    if (!isCurrentNoteSaved) {
      return setSaveMessage('Please save your note before logging out');
    }

    resetGlobalContext();
    localStorage.removeItem('loginToken');
  };

  return (
    <button
      onClick={() => {
        handleLogoutClick();
      }}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
