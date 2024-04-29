# Notework
Case - Solv
Complete MVP

------- Description -------


This is an app for creating notes, categorizing them, and saving them for later.

Create a user from the landing-page, or log in with an existing user.
Login will be stored as a token in the browser untill log out or clearing of cookies.

Create new notes with the "+" button.
Save/exit the current note by using the buttons at the bottom of the editor.

Find and filter saved notes in "Menu".
Browse the content of notes by clicking them in the Menu.
If an note is altered one must save it before exiting, or click anothre note in the menu to discard the changes.


------- How to run a test version -------


Both the Bakcend and Frontend is driven by Node.js.
The database is a postgreSQL instance.

 -- ! PostgreSQL and Node.js required ! --

If you want to spin up a  dev version of this app this is how you can do it:

0.5: clone this repo.


--//Backend (Run commands from: **/Notework/server)
  1: Have a running postgres instance or container on your machine.
  2: Run "npm install".
  3: Create an .env file in the "server" root file.
  4: Add token encoding key(as: SECRET_KEY="yourpreferredkey") to the .env file.
  5: Add database URL (as: DATABASE_URL="postgresql://{your DBuser}:{your DBpassword}@{ex: localhost:5432}/notework?schema=public") to the .env file
  6: Run "npx prisma generate" to create the prisma client.
  7: Run "npx prisma migrate dev --name init_0" to create a working Notework database (applies prisma.schema from ./prisma).
  8: Compile the .ts files with tsc. (Run "tsc server.ts"). This creates .js files that can be used by Node.js
  9: Run "node server.js" to start the server on port 3001(Port can be specified in server.ts before compiling wiht tsc).

--//Frontend (Run commands from: **Notework/frontend)
  1: Run "npm install"
  2: In **Notework/frontend/vite.config.ts:
      - Specify desired port to run app in: port:{port: 3000}
      - Specity the url of your running server in: proxy:{target: 'http://localhost:3001'}
  3: Run "npm run dev" and acces the app at localhost:{your specified port}: