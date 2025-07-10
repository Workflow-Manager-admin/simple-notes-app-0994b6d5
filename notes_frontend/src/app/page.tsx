'use client';
import { useCallback, useState, useEffect, useRef } from "react";
import { NotesList } from "@/components/NotesList";
import { NoteEditor } from "@/components/NoteEditor";
import { FloatingAddButton } from "@/components/FloatingAddButton";
import { Header } from "@/components/Header";
import { useNotesStore, Note } from "@/lib/notesStore";

// PUBLIC_INTERFACE
export default function NotesApp() {
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    loadNotesFromStorage,
  } = useNotesStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNotesFromStorage();
    // eslint-disable-next-line
  }, []);

  // Filter notes by searchTerm in title or content
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content
        .replace(/<[^>]+>/g, "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  // Find currently selected note object
  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  // Select or unselect a note
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    // Focus on editor when opening a note (desktop)
    if (mainRef.current && window.innerWidth > 640) {
      const editorArea = mainRef.current.querySelector(
        '[data-testid="note-editor"] textarea, [contenteditable]'
      ) as HTMLElement | null;
      if (editorArea) editorArea.focus();
    }
  }, []);

  const handleCreate = useCallback(() => {
    const id = createNote();
    setSelectedId(id);
    setTimeout(() => {
      if (mainRef.current) {
        const editorArea = mainRef.current.querySelector(
          '[data-testid="note-editor"] textarea, [contenteditable]'
        ) as HTMLElement | null;
        if (editorArea) editorArea.focus();
      }
    }, 50);
  }, [createNote]);

  const handleDelete = useCallback((id: string) => {
    deleteNote(id);
    if (id === selectedId) setSelectedId(null);
  }, [deleteNote, selectedId]);

  const handleUpdate = useCallback((id: string, updated: Partial<Note>) => {
    updateNote(id, updated);
  }, [updateNote]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <Header />
      <main
        ref={mainRef}
        className="flex flex-1 flex-col sm:flex-row max-h-[calc(100vh-3.5rem)] overflow-hidden relative"
      >
        <NotesList
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <section className="flex-1 min-h-0 border-t sm:border-t-0 sm:border-l border-gray-200 bg-neutral-50">
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              onChange={handleUpdate}
              key={selectedNote.id}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-2xl mb-2">📝</span>
              <span className="text-lg font-medium">Select or create a note</span>
            </div>
          )}
        </section>
        <FloatingAddButton onClick={handleCreate} label="Add Note" />
      </main>
    </div>
  );
}
