const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

import { JwtTokenHandler, TokenHandler } from './userControllers/tokenHandler';
import { DatabaseUserAuthenticator, UserAuthenticator } from './userControllers/userAuthenticator';
import { DatabaseUserHandler, UserController } from './userControllers/databaseUserHandler';

const tokenHandler: TokenHandler = new JwtTokenHandler(process.env.SECRET_KEY!);
const userAuthenticator: UserAuthenticator = new DatabaseUserAuthenticator();
const userHandler: UserController = new DatabaseUserHandler();

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
    const login = await userAuthenticator.authenticateLoginAttempt(username, password);
    const loginToken = tokenHandler.createToken(login);

    res.status(200).json({ loginToken });
  } catch (error) {}
});

app.post('/newNote', async (req, res) => {
  const { title, content } = req.body;
  const loginToken = req.body.loginToken;
});

app.get('/userNotes', async (req, res) => {
  const loginToken = req.body.loginToken;
});

app.put('/updateNote', async (req, res) => {
  const { noteID, newTitle, newContent } = req.body;
  const loginToken = req.body.loginToken;
});

app.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
