import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Note type
export type Note = {
  id: string;
  title: string;
  content: string;
  created: number;
  updated: number;
};

function getLocalStorageNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("notes-app-notes") || "[]") as Note[];
  } catch {
    return [];
  }
}

function saveLocalStorageNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("notes-app-notes", JSON.stringify(notes));
}

export function useNotesStore() {
  const [notes, setNotes] = useState<Note[]>([]);

  // PUBLIC_INTERFACE
  function loadNotesFromStorage() {
    setNotes(getLocalStorageNotes());
  }

  // PUBLIC_INTERFACE
  function createNote(): string {
    const n: Note = {
      id: uuidv4(),
      title: "",
      content: "",
      created: Date.now(),
      updated: Date.now(),
    };
    const updated = [n, ...notes];
    setNotes(updated);
    saveLocalStorageNotes(updated);
    return n.id;
  }

  // PUBLIC_INTERFACE
  function updateNote(id: string, updatedFields: Partial<Note>) {
    setNotes((old) => {
      const updatedArr = old.map((n) =>
        n.id === id
          ? { ...n, ...updatedFields, updated: Date.now() }
          : n
      );
      saveLocalStorageNotes(updatedArr);
      return updatedArr;
    });
  }

  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    setNotes((old) => {
      const updatedArr = old.filter((n) => n.id !== id);
      saveLocalStorageNotes(updatedArr);
      return updatedArr;
    });
  }

  return {
    notes,
    setNotes,
    loadNotesFromStorage,
    createNote,
    updateNote,
    deleteNote,
  };
}
