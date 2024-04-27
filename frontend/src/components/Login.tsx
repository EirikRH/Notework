import { useState, FunctionComponent } from 'react';
import {
  Credentials,
  LoginResponse,
  sendLoginRequest,
} from '../assets/server-requests';
import { getGlobalContext } from '../context/AppContext';

const Login: FunctionComponent = () => {
  const { setContextAtLogin, setCreatingUser} = getGlobalContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMesage] = useState('');
  const credentials: Credentials = { username, password };

  async function handleLoginClick(event: any, credentials: Credentials) {
    event.preventDefault();
    setLoginErrorMesage('');
    const login: LoginResponse = await sendLoginRequest(credentials);

    if (login.status !== 200) {
      return setLoginErrorMesage(`${login.data.error}`);
    }

    const token = login.data.loginToken;
    localStorage.setItem('loginToken', token!);
    setContextAtLogin(username);
  }
  return (
    <div className="loginContainer">
      <input
        autoFocus
        className="loginInput"
        type="text"
        name="username"
        placeholder="Username..."
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className="loginInput"
        type="password"
        name="password"
        placeholder="Password..."
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        type="submit"
        onClick={(event) => handleLoginClick(event, credentials)}
      >
        Login
      </button>
      <button
        onClick={() => {
          setCreatingUser(true);          
        }}
      >
        New User
      </button>
      {loginErrorMessage && <h3>{loginErrorMessage}</h3>}
    </div>
  );
};

export default Login;
