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

export async function updateNoteTitle(noteID: number, newTitle: string) {
  try {
    await databaseClient.notes.update({
      where: {
        note_ID: noteID,
      },
      data: {
        title: newTitle,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}

export async function updateNoteContent(noteID: number, newContent: string) {
  try {
    await databaseClient.notes.update({
      where: {
        note_ID: noteID,
      },
      data: {
        content: newContent,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}
