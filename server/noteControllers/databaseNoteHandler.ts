import { createNewNote, updateExistingNote, getNotesByUserID, deleteNote } from '../database-utils/noteCRUD';

export interface NoteHandler {
  createNote: (newNote: NewNote) => Promise<void>;
  getUserNotes: (userID: number) => Promise<ExistingNote[] | null>;
  updateNote: (noteID: number, newTitle: string, newContent: string) => Promise<void>;
  deleteNote: (noteID: number) => Promise<void>;
}

interface NewNote {
  title: string;
  content: string;
  userID: number;
}
interface ExistingNote {
  note_ID: number;
  user_ID: number;
  title: string | null;
  content: string | null;
}

export class DatabaseNoteHandler implements NoteHandler {
  public async createNote(newNote: NewNote) {
    try {
      await createNewNote(newNote.title, newNote.content, newNote.userID);
    } catch (error) {
      throw error;
    }
  }

  public async getUserNotes(userID: number): Promise<ExistingNote[] | null> {
    try {
      return await getNotesByUserID(userID);
    } catch (error) {
      throw error;
    }
  }

  public async updateNote(noteID: number, newTitle: string, newContent: string) {
    try {
      await updateExistingNote(noteID, newTitle, newContent);
    } catch (error) {
      throw error;
    }
  }

  public async deleteNote(noteID: number) {
    try {
      await deleteNote(noteID);
    } catch (error) {
      throw error;
    }
  }
}
