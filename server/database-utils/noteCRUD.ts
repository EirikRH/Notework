import { databaseClient } from './dbClient';

export async function getNotesByUserID(userID: number) {
  try {
    const notes = await databaseClient.notes.findMany({
      where: {
        user_ID: userID,
      },
    });
    return notes;
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}

export async function createNewNote(title: string, content: string, userID: number) {
  try {
    const newNote = await databaseClient.notes.create({
      data: {
        user_ID: userID,
        title,
        content,
      },
    });
    return newNote;
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}

export async function updateNote(noteID: number, newTitle: string, newContent: string) {
  try {
    await databaseClient.notes.update({
      where: {
        note_ID: noteID,
      },
      data: {
        title: newTitle,
        content: newContent,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}
export async function deleteNote(noteID: number) {
  try {
    await databaseClient.notes.delete({
      where: {
        note_ID: noteID,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}
