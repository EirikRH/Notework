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

export async function sendNoteRequest(loginToken: string) {
  try {
    const response = await fetch(`${API_URL}/userNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginToken }),
    });

    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    throw error;
  }
}
