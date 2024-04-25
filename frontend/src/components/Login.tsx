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
    <div className='loginContainer'>
      
        <input
          type="text"
          name="username"
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" onClick={(event) => handleLoginClick(event)}>
          Login
        </button>
      {loginErrorMessage && <h3>{loginErrorMessage}</h3>}
      <a href="/createUser">
        <button>New User</button>
      </a>
    </div>
  );
};

export default Login;
