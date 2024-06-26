import { users } from '@prisma/client';
import { createNewUser, changePassword } from '../../database-utils/userCRUD';

export interface UserHandler {
  createUser(username: string, password: string): Promise<users>;
  setNewPassword(userID: number, newPassword: string): Promise<void>;
}

export class DatabaseUserHandler implements UserHandler {
  public async createUser(username: string, password: string): Promise<users> {
    try {
      return await createNewUser(username, password);
    } catch (error) {
      throw error;
    }
  }

  public async setNewPassword(userID: number, newPassword: string): Promise<void> {
    try {
      await changePassword(userID, newPassword);
    } catch (error) {
      throw error;
    }
  }
}
