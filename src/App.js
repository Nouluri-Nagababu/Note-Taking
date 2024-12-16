import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle text area input change
  const handleChange = (e) => {
    setCurrentNote(e.target.value);
  };

  // Add or update a note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = currentNote;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, currentNote]);
    }
    setCurrentNote("");
  };

  // Edit a note
  const handleEdit = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  // Delete a note
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <h1>Note Taking App</h1>

      {/* Note input form */}
      <form onSubmit={handleSubmit} className="note-form">
        <textarea
          placeholder="Write your note here..."
          value={currentNote}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Display Notes */}
      <div className="notes-container">
        {notes.length === 0 ? (
          <p>No notes available. Start adding some!</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note">
              <p>{note}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
