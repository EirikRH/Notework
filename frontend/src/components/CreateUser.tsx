import { FunctionComponent, useEffect, useState } from 'react';
import {
  LoginResponse,
  sendLoginRequest,
  sendUserCreationRequest,
} from '../assets/server-requests';
import { getGlobalContext, GlobalContextProps } from '../context/AppContext';

interface CreateUserProps {}

const CreateUser: FunctionComponent<CreateUserProps> = () => {
  const { setContextAtLogin, setCreatingUser }: GlobalContextProps = getGlobalContext();

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
    if (
      password.length < 1 ||
      validatorPassword.length < 1 ||
      username.length < 1
    ) {
      setCreationError('Please fill out all fields correctly');
      return;
    }

    if (password !== validatorPassword) {
      setCreationError('Passwords do not match');
      return;
    }

    const creationStatus = await sendUserCreationRequest({
      username,
      password,
    });

    if (creationStatus !== 201) {
        return setCreationError('User creation failed, username might be taken');
    }

      const login: LoginResponse = await sendLoginRequest({
        username,
        password,
      });

      if (login.status !== 200) {
        return setCreationError(`${login.data.error}`);
      }
      const token = login.data.loginToken;
      localStorage.setItem('loginToken', token!);
      setContextAtLogin(username);
      setCreatingUser(false);
    }
  

  return (
    <div className="newUserContainer">
      <input
        autoFocus
        className="loginInput"
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
        className="loginInput"
        placeholder="Set Password"
        type="password"
        name="password1"
        onChange={(event) => {
          setPassword(event.target.value);
          setCreationError('');
        }}
      />
      <input
        className="loginInput"
        placeholder="Repeat Password"
        type="password"
        name="ValidatorPassword"
        onChange={(event) => {
          setValidatorPassword(event.target.value);
          setCreationError('');
        }}
      />
      {!passwordMatch && <p>Passwords do not match</p>}
      {creationError && <p className="creationError">{creationError}</p>}
      <button
        onClick={(event) => {
          handleRegistrationClick(event);
          setCreationError('');
        }}
      >
        Register User
      </button>
      <button
        onClick={() => {
          setCreatingUser(false);
        }}
      >
        Already have an account?
      </button>
    </div>
  );
};

export default CreateUser;
