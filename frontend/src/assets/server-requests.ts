import { Note } from '../App';

const API_URL = 'http://localhost:3001';

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  data: {
    loginToken?: string;
    error?: string;
  };
}
export interface NewNoteResponse {
  status: number;
  data: {
    note: Note;
  };
}
export async function sendLoginRequest({
  username,
  password,
}: Credentials): Promise<LoginResponse> {
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

export async function sendNotesRequest(loginToken: string): Promise<Note[]> {
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

export async function sendUserCreationRequest(newUser: Credentials) {
  const { username, password } = newUser;
  try {
    const response = await fetch(`${API_URL}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return response.status;
  } catch (error) {
    throw error;
  }
}

export async function sendNoteUpdateRequest(
  updatedNote: Note,
  loginToken: string
) {
  try {
    const response = await fetch(`${API_URL}/updateNote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginToken,
        updatedNote,
      }),
    });

    return response.status;
  } catch (error) {
    throw error;
  }
}

export async function sendNoteCreationRequest(
  newNote: Note,
  loginToken: string
): Promise<Response> {
  newNote;
  try {
    const response = await fetch(`${API_URL}/saveNewNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newNote, loginToken }),
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendNoteDeletionRequest(note: Note, loginToken: string) {
  const { note_ID } = note;
  try {
    const response = await fetch(`${API_URL}/deleteNote`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginToken, note_ID }),
    });

    return response.status;
  } catch (error) {
    throw error;
  }
}
