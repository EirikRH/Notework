import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const token = localStorage.getItem('loginToken');

  function loginCheck() {
    if (token) {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    loginCheck();
  });

  return <>{!loggedIn ? <h1>Not logged in</h1> : <h1>Logged in</h1>}</>;
}

export default App;
