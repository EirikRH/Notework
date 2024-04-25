import { FunctionComponent, useEffect, useState } from 'react';
import { Credentials, LoginResponse, sendUserCreationRequest } from '../assets/server-requests';
interface CreateUserProps {
  attemptLogin: (credentials: Credentials) => Promise<LoginResponse>;
}

const CreateUser: FunctionComponent<CreateUserProps> = ({ attemptLogin }) => {
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
      return await attemptLogin({ username, password });
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
        <button onClick={()=>{
          window.location.href = '/'
        }}>Already have an account?</button>
      </div>
    </>
  );
};

export default CreateUser;
