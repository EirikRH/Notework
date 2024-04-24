import { Note } from '../components/NoteList';

const API_URL = '/api';

export interface LoginAttempt {
  username: string;
  password: string;
}

export async function sendLoginRequest({ username, password }: LoginAttempt) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    throw error;
  }
}

export async function sendNoteRequest(loginToken: string): Promise<Note[]> {
  try {
    const response = await fetch(`${API_URL}/userNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginToken }),
    });

    const status = response.status;

    if (status !== 200) {
      throw new Error('Failed to fetch notes');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
