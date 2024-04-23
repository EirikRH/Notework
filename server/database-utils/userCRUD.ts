import { databaseClient } from './dbClient';

export async function createNewUser(username: string, password: string) {
  try {
    const newUser = await databaseClient.users.create({
      data: {
        username,
        password,
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(userID: number, newPassword: string) {
  try {
    await databaseClient.users.update({
      where: {
        ID: userID,
      },
      data: {
        password: newPassword,
      },
    });
  } catch (error) {
    throw error;
  }
}
