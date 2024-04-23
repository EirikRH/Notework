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

export async function getUserByCredentials(username: string, password: string) {
  try {
    const user = await databaseClient.users.findUniqueOrThrow({
      where: {
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByID(userID: number) {
  try {
    const user = await databaseClient.users.findUniqueOrThrow({
      where: {
        ID: userID,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
