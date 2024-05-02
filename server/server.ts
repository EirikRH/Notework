const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.DEV_PORT || 80;

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());

import {
  JwtTokenHandler,
  TokenHandler,
} from './Controllers/userControllers/tokenHandler';
import {
  DatabaseUserAuthenticator,
  UserAuthenticator,
} from './Controllers/userControllers/userAuthenticator';
import {
  DatabaseUserHandler,
  UserHandler,
} from './Controllers/userControllers/databaseUserHandler';
import {
  DatabaseNoteHandler,
  NoteHandler,
} from './Controllers/noteControllers/databaseNoteHandler';

const tokenHandler: TokenHandler = new JwtTokenHandler(process.env.SECRET_KEY!);
const userAuthenticator: UserAuthenticator = new DatabaseUserAuthenticator();
const userHandler: UserHandler = new DatabaseUserHandler();
const noteHandler: NoteHandler = new DatabaseNoteHandler();

app.post('/createUser', async (req, res) => {
  const { username, password } = req.body;
  try {
    await userHandler.createUser(username, password);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send('User creation failed');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const login = await userAuthenticator.authenticateLoginAttempt(
      username,
      password
    );
    const loginToken = tokenHandler.createToken(login);

    res.status(200).json({ loginToken });
  } catch (error: any) {
    if (error.code == 'P2025') {
      res.status(401).send({ error: 'Invalid username or password' });
    } else {
      res.status(500).send({ error: 'internal server error' });
    }
  }
});

app.post('/saveNewNote', async (req, res) => {
  const { newNote, loginToken } = req.body;

  const tokenData = tokenHandler.decodeToken(loginToken);
  const validator = await userAuthenticator.authenticateUserFromTokenID(
    tokenData.user_ID
  );

  if (!validator) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const note = await noteHandler.createNote(newNote, validator.user_ID);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).send('Note creation failed');
  }
});

app.post('/userNotes', async (req, res) => {
  const { user_ID } = tokenHandler.decodeToken(req.body.loginToken);
  try {
    const notes = await noteHandler.getUserNotes(user_ID);
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).send('Failed to get notes');
  }
});

app.put('/updateNote', async (req, res) => {
  const { updatedNote, loginToken } = req.body;

  const tokenData = tokenHandler.decodeToken(loginToken);
  const validator = await userAuthenticator.authenticateUserFromTokenID(
    tokenData.user_ID
  );

  if (validator.user_ID !== updatedNote.user_ID) {
    return res.status(401).send('Unauthorized');
  }

  try {
    await noteHandler.updateNote(updatedNote);
    res.status(200).send('Note updated successfully');
  } catch (error) {
    res.status(400).send('Failed to update note');
  }
});

app.delete('/deleteNote', async (req, res) => {
  const { note_ID, loginToken } = req.body;
  const { user_ID } = tokenHandler.decodeToken(loginToken);
  try {
    await noteHandler.deleteNote(note_ID, user_ID);
    res.status(200).send('Note deleted successfully');
  } catch (error) {
    res.status(400).send('Note delete failed');
  }
});

app.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
