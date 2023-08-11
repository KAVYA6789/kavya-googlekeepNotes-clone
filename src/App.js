import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notes, { id: Date.now(), text: newNote }];
      setNotes(updatedNotes);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Keep Notes Clone</h1>
      </header>
      <div className="note-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={handleAddNote}>Add</button>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <p>{note.text}</p>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
