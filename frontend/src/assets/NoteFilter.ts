import { Note } from '../App';

export const filterNotes = (search: string, notes: Note[]) => {
    
  const searchArr = search.split(' ');
  const searchTags = searchArr.filter((word) => word.startsWith('@'));
  const searchWords = searchArr
    .filter((word) => !word.startsWith('@'))
    .join(' ');

  const notesContainingTags = notesContainingAllTags(notes, searchTags )
  const notesWithTagsAndWords = notesContainingSearchString(notesContainingTags, searchWords);

  return notesWithTagsAndWords;
};

const notesContainingAllTags = (
  notesList: Note[],
  searchTagArray: string[]
) => {
  if (!searchTagArray.length) {
    return notesList;
  }

  const filteredNotes = notesList.filter((note: Note) => {
    const lowerCaseNoteTags = note.tags!.toLowerCase();
    const lowerCaseSearchTags = searchTagArray.map((searchTag) => {
      return searchTag.toLowerCase();
    });

    for (let i = 0; i < lowerCaseSearchTags.length; i++) {
      const tag = lowerCaseSearchTags[i];
      if (!lowerCaseNoteTags.includes(tag)) {
        return false;
      }
    }
    return true;
  });

  return filteredNotes;
};

const notesContainingSearchString = (
  noteList: Note[],
  searchString: string
) => {
  if (!searchString) {
    return noteList;
  }

  const filteredNotes = noteList.filter((note: Note) => {
    const lowerCaseTitle = note.title.toLowerCase();
    const lowerCaseContent = note.content.toLowerCase();
    const lowerCaseSearch = searchString.toLowerCase();

    if (
      lowerCaseTitle.includes(lowerCaseSearch) ||
      lowerCaseContent.includes(lowerCaseSearch)
    ) {
      return true;
    }
    return false;
  });

  return filteredNotes;
};
