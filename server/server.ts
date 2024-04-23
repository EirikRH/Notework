const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = 3001

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createUser', async (req, res) => {
  const { username, password } = req.body.newUserData;
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body.credentials;
});

app.post('/newNote', async (req, res) => {
  const { title, content} = req.body.newNote;
  const loginToken = req.body.loginToken;
})

app.get('/userNotes', async (req, res) => {
  const loginToken = req.body.loginToken;
})

app.put('/updateNote', async (req, res) => {
  const { noteID, newTitle, newContent } = req.body.updatedNote;
  const loginToken = req.body.loginToken;
});

app.listen({port}, () => {
  console.log(`Server is running at http://localhost:${port}`);
});