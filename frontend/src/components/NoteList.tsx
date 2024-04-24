import { FunctionComponent, useEffect, useState } from 'react';
import { sendNoteRequest } from '../assets/server-requests';
export interface Note {
  note_ID: number;
  title: string;
  content: string;
}
interface NoteListProps {
  loginToken: string;
}

const NoteList: FunctionComponent<NoteListProps> = ({ loginToken }: NoteListProps) => {
  const [loadedNotes, setloadedNotes] = useState<Note[]>([]);

  async function getUserNotes(loginToken: string): Promise<Note[]> {
    const storedNotes = await sendNoteRequest(loginToken);

    return storedNotes;
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const userNotes = await getUserNotes(loginToken);
      setloadedNotes(userNotes);
    };
    fetchNotes();
  }, [loginToken]);

  const noteBanners = loadedNotes.map((note: Note) => {
    return (
      <li key={note.note_ID}>
        <h3>{note.title}</h3>
      </li>
    );
  });

  return (
    <>
      <h3 className="noteMenuTitle">My notes</h3>
      <ul className="noteList">{noteBanners}</ul>
    </>
  );
};

export default NoteList;
