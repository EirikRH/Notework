import { useState, FunctionComponent } from 'react';
import { sendLoginRequest, LoginAttempt } from '../assets/server-requests';

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  async function handleLoginClick(event: any) {
    event.preventDefault();

    setLoginError('');

    await attemptLogin({ username, password });
  }

  async function attemptLogin(formData: LoginAttempt): Promise<void> {
    const login = await sendLoginRequest(formData);

    if (login.status === 200) {
      localStorage.setItem('loginToken', login.data.loginToken);
      window.location.href = '/';
    } else {
      setLoginError(`${login.status}, ${login.data.error}`);
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
      {loginError && <h3>{loginError}</h3>}
    </>
  );
};

export default Login;
