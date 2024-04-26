import { FunctionComponent, useEffect, useState } from 'react';
import { LoginResponse, sendLoginRequest, sendUserCreationRequest } from '../assets/server-requests';
import { getGlobalContext, GlobalContextProps } from '../context/AppContext';

interface CreateUserProps {}

const CreateUser: FunctionComponent<CreateUserProps> = () => {
  const { setLoggedIn, setLoginToken, setActiveUser }: GlobalContextProps = getGlobalContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatorPassword, setValidatorPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [creationError, setCreationError] = useState('');

  useEffect(() => {
    if (validatorPassword === password) {
      return setPasswordMatch(true);
    }
    return setPasswordMatch(false);
  }, [validatorPassword]);

  async function handleRegistrationClick(event: any) {
    event.preventDefault();
    setCreationError('');

    if (!passwordMatch) {
      return;
    }

    const creationStatus = await sendUserCreationRequest({ username, password });

    if (creationStatus === 201) {
      const login: LoginResponse = await sendLoginRequest({ username, password });

      if (login.status !== 200) {
        return setCreationError(`${login.status}, ${login.data.error}`);
      }
      const token = login.data.loginToken;

      localStorage.setItem('loginToken', token!);
      setLoggedIn(true);
      setActiveUser(username);
      setLoginToken(token!);
      window.location.href = '/';
      return;
    }
    return setCreationError('User creation failed, username might be taken');
  }

  return (
    <>
      <div className="newUserContainer">
        <input
          placeholder="Set Username"
          type="text"
          name="username"
          onChange={(event) => {
            setUsername(event.target.value.split(' ').join(''));
            setCreationError('');
          }}
          value={username}
        />
        <input
          placeholder="Set Password"
          type="password"
          name="password1"
          onChange={(event) => {
            setPassword(event.target.value);
            setCreationError('');
          }}
        />
        <input
          placeholder="Repeat Password"
          type="password"
          name="ValidatorPassword"
          onChange={(event) => setValidatorPassword(event.target.value)}
        />
        {!passwordMatch && <p>Passwords do not match</p>}
        {creationError && <p className="creationError">{creationError}</p>}
        <button disabled={!passwordMatch || (username.length < 1 && true)} onClick={handleRegistrationClick}>
          Register User
        </button>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Already have an account?
        </button>
      </div>
    </>
  );
};

export default CreateUser;
