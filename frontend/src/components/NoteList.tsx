import { FunctionComponent } from 'react';

export interface Note {
  note_ID: number;
  title: string;
  content: string;
}
interface NoteListProps {
  notes: Note[];
}

const NoteList: FunctionComponent<NoteListProps> = ({ notes }: NoteListProps) => {
  const noteBanners = notes.map((note: Note) => {
    return (
      <li key={note.note_ID}>
        <h4>{note.title}</h4>
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
