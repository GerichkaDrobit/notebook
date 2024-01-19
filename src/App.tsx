import React, { useState, useEffect } from 'react';
import { Note } from './types/data';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteTitle.trim() !== '' && noteContent.trim() !== '') {
      const newNote: Note = { id: Date.now(), title: noteTitle, content: noteContent };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteTitle('');
      setNoteContent('');
    } else {
      alert('Please fill in both title and content fields.');
    }
  };

  const updateNote = () => {
    if (selectedNote) {
      if (noteTitle.trim() !== '' && noteContent.trim() !== '') {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNote.id ? { ...note, title: noteTitle, content: noteContent } : note
          )
        );

        // Сброс значений полей после обновления заметки
        setNoteTitle('');
        setNoteContent('');
        setSelectedNote(null);
      } else {
        alert('Please fill in both title and content fields.');
      }
    }
  };

  const deleteNote = () => {
    if (selectedNote) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== selectedNote.id));
      setNoteTitle('');
      setNoteContent('');
      setSelectedNote(null);
    }
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  return (
    <div className="notes-book">
      <div className="notes-menu">
        <h2>Notes</h2>
        <ul className='notes-list'>
          {notes.map((note) => (
            <li className='notes-item' key={note.id} onClick={() => selectNote(note)}>
              {note.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="note-editor">
        <h2>Note Editor</h2>
        <div className='note-input'>
        <input
          type="text"
          placeholder="Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        </div>
        <div className='note-btn'>
          <button onClick={addNote}>Add Note</button>
          <button onClick={updateNote} disabled={!selectedNote}>
            Update Note
          </button>
          <button onClick={deleteNote} disabled={!selectedNote}>
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

export {App};