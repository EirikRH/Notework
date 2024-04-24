import { FunctionComponent } from 'react';
import NoteBanner from './NoteBanner';

export interface Note {
  note_ID: number;
  title: string;
  content: string;
  index?: number;
}
interface NoteListProps {
  notes: Note[];
  editRequest: (note: Note) => void;
}

const NoteList: FunctionComponent<NoteListProps> = ({ notes, editRequest }: NoteListProps) => {
  const noteBanners = notes.map((note: Note) => {
    return <NoteBanner editRequest={editRequest} note={note} />;
  });

  return (
    <>
      <h3 className="noteMenuTitle">My notes</h3>
      <ul className="noteList">{noteBanners}</ul>
    </>
  );
};

export default NoteList;
