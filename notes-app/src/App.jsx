import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [view, setView] = useState("notes");

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addnote() {
    if (text.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: text,
      archived: false,
      date: new Date().toLocaleDateString(),
    };

    setNotes([...notes, newNote]);
    setText("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((item) => item.id !== id));
  }

  function toggleArchive(id) {
    setNotes(
      notes.map((item) =>
        item.id === id ? { ...item, archived: !item.archived } : item
      )
    );
  }

  const activeNotes = notes.filter((item) => !item.archived);
  const archivedNotes = notes.filtlo076rx5rger((item) => item.archived);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">📝 My Note App</h1>
        <p className="subtitle">write and save</p>
      </header>

      <nav className="tabs">
        <button
          className={view === "notes" ? "tab active" : "tab"}
          onClick={() => setView("notes")}
        >
          Notes ({activeNotes.length})
        </button>
        <button
          className={view === "archived" ? "tab active" : "tab"}
          onClick={() => setView("archived")}
        >
          Archived ({archivedNotes.length})
        </button>
      </nav>

      {view === "notes" && (
        <section className="section">
          <div className="add-box">
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts..."
              rows={4}
            />
            <div className="add-footer">
              <span className="counter">{text.length} characters</span>
              <button
                className="add-btn"
                onClick={addnote}
                disabled={text.trim() === ""}
              >
                ➕ Add Note
              </button>
            </div>
          </div>

          {activeNotes.length === 0 && (
            <p className="empty">create an note</p>
          )}

          {activeNotes.map((item) => (
            <article className="note" key={item.id}>
              <p className="note-text">{item.text}</p>
              <div className="note-footer">
                <span className="note-date">{item.date}</span>
                <div className="actions">
                  <button
                    className="archive-btn"
                    onClick={() => toggleArchive(item.id)}
                  >
                    📦 Archive
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {view === "archived" && (
        <section className="section">
          {archivedNotes.length === 0 && (
            <p className="empty">thereis no any archived notes.</p>
          )}

          {archivedNotes.map((item) => (
            <article className="note archived" key={item.id}>
              <p className="note-text">{item.text}</p>
              <div className="note-footer">
                <span className="note-date">{item.date}</span>
                <div className="actions">
                  <button
                    className="unarchive-btn"
                    onClick={() => toggleArchive(item.id)}
                  >
                    ♻️ Unarchive
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default App;