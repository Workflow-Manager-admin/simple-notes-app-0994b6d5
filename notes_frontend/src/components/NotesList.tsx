import { Note } from "@/lib/notesStore";
import { SearchBar } from "./SearchBar";

type NotesListProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

// PUBLIC_INTERFACE
export function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  searchTerm,
  setSearchTerm,
}: NotesListProps) {
  return (
    <aside className="w-full sm:w-80 max-w-full border-b sm:border-b-0 sm:border-r border-gray-200 bg-white flex flex-col min-h-0">
      <div className="flex-shrink-0 p-2">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {notes.length === 0 && (
          <li className="py-8 px-4 text-gray-400 text-center">No notes found.</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            tabIndex={0}
            className={`group flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all ${
              note.id === selectedId
                ? "bg-blue-100 border-l-4 border-[#2563eb]"
                : ""
            }`}
            onClick={() => onSelect(note.id)}
            aria-selected={note.id === selectedId}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(note.id);
              if (e.key === "Delete") onDelete(note.id);
            }}
          >
            <div className="flex-grow min-w-0">
              <div className="font-semibold truncate text-[#2563eb]">{note.title || "Untitled"}</div>
              <div
                className="text-xs text-gray-500 truncate mt-1"
                dangerouslySetInnerHTML={{
                  __html:
                    note.content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ") || "No content",
                }}
              />
              <span className="text-[10px] text-gray-400">
                {new Date(note.updated).toLocaleString()}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              aria-label="Delete note"
              className="ml-4 opacity-0 group-hover:opacity-100 transition focus:opacity-100"
              tabIndex={-1}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill="#64748b" className="group-hover:fill-[#facc15]" />
                <path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
