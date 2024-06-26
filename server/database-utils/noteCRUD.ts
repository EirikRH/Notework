import {
  ExistingNote,
  NewNote,
} from '../Controllers/noteControllers/databaseNoteHandler';
import { databaseClient } from './dbClient';

export async function getNotesByUserID(userID: number) {
  try {
    const notes = await databaseClient.notes.findMany({
      where: {
        user_ID: userID,
      },
      orderBy: {
        note_ID: 'desc',
      },
    });
    return notes;
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}

export async function createNewNote(newNote: NewNote, user_ID) {
  const { title, tags, content } = newNote;
  try {
    const newNote = await databaseClient.notes.create({
      data: {
        user_ID: user_ID,
        title,
        content,
        tags,
      },
    });
    return newNote;
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}

export async function updateExistingNote(updatedNote: ExistingNote) {
  const { note_ID, title, content, tags } = updatedNote;
  try {
    await databaseClient.notes.update({
      where: {
        note_ID,
      },
      data: {
        title,
        content,
        tags,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}
export async function deleteNote(noteID: number, userID: number) {
  try {
    await databaseClient.notes.delete({
      where: {
        note_ID: noteID,
        user_ID: userID,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await databaseClient.$disconnect();
  }
}
