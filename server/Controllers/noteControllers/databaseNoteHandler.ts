import {
  createNewNote,
  updateExistingNote,
  getNotesByUserID,
  deleteNote,
} from '../../database-utils/noteCRUD';

export interface NoteHandler {
  createNote: (newNote: NewNote, user_ID: number) => Promise<ExistingNote>;
  getUserNotes: (userID: number) => Promise<ExistingNote[] | null>;
  updateNote: (updatedNote: ExistingNote) => Promise<void>;
  deleteNote: (noteID: number, userID: number) => Promise<void>;
}

export interface NewNote {
  title?: string;
  tags?: string;
  content?: string;
  userID: number;
}
export interface ExistingNote {
  note_ID: number;
  user_ID: number;
  title: string | null;
  content?: string | null;
  tags?: string | null;
}

export class DatabaseNoteHandler implements NoteHandler {
  public async createNote(newNote: NewNote, user_ID: number) {
    try {
      return await createNewNote(newNote, user_ID);
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

  public async updateNote(updatedNote: ExistingNote) {
    
    try {
      await updateExistingNote(updatedNote);
    } catch (error) {
      throw error;
    }
  }

  public async deleteNote(note_ID: number, user_ID: number) {
    try {
      await deleteNote(note_ID, user_ID);
    } catch (error) {
      throw error;
    }
  }
}
