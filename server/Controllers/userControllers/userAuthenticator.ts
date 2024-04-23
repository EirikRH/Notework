import { getUserByCredentials, getUserByID } from '../../database-utils/userCRUD';

export interface UserAuthenticator {
  authenticateLoginAttempt(username: string, password: string): Promise<ValidatedUser>;
  authenticateUserFromTokenID(tokenID: number): Promise<ValidatedUser>;
}

interface ValidatedUser {
  username: string;
  userID: number;
}

export class DatabaseUserAuthenticator implements UserAuthenticator {
  public async authenticateLoginAttempt(username: string, password: string): Promise<ValidatedUser> {
    try {
      const user = await getUserByCredentials(username, password);
      return { username: user.username, userID: user.ID };
    } catch (error) {
      throw error;
    }
  }
  public async authenticateUserFromTokenID(tokenID: number): Promise<ValidatedUser> {
    try {
      const user = await getUserByID(tokenID);
      return { username: user.username, userID: user.ID };
    } catch (error) {
      throw error;
    }
  }
}
