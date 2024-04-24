import { useState, FunctionComponent } from 'react';
import { Credentials, LoginResponse } from '../assets/server-requests';

interface LoginProps {
  attemptLogin: (credentials: Credentials) => Promise<LoginResponse>;
}

const Login: FunctionComponent<LoginProps> = ({ attemptLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMesage] = useState('');

  async function handleLoginClick(event: any) {
    event.preventDefault();

    setLoginErrorMesage('');

    const loginAttempt = await attemptLogin({ username, password });
    if (loginAttempt.status !== 200) {
      setLoginErrorMesage(`${loginAttempt.status}, ${loginAttempt.data.error}`);
    }
  }

  return (
    <>
      <form name="loginForm">
        <input
          type="text"
          name="username"
          placeholder="username.."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password.."
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" onClick={(event) => handleLoginClick(event)}>
          Login
        </button>
      </form>
      {loginErrorMessage && <h3>{loginErrorMessage}</h3>}
      <a href="/createUser">
        <button>New User</button>
      </a>
    </>
  );
};

export default Login;
