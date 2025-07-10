import { useState, useRef, useEffect } from "react";
import { Note } from "@/lib/notesStore";

type NoteEditorProps = {
  note: Note;
  onChange: (id: string, updated: { title?: string; content?: string }) => void;
};

// PUBLIC_INTERFACE
export function NoteEditor({ note, onChange }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]); // reset input on new note

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onChange(note.id, { title: e.target.value });
  }

  function handleContentInput(e: React.FormEvent<HTMLDivElement>) {
    const html = e.currentTarget.innerHTML;
    setContent(html);
    onChange(note.id, { content: html });
  }

  // Basic formatting controls
  function format(cmd: string) {
    document.execCommand(cmd);
  }

  return (
    <div
      data-testid="note-editor"
      className="flex flex-col gap-1 h-full p-5 pb-8"
      tabIndex={-1}
    >
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Note title"
        className="text-xl font-bold rounded mb-2 bg-transparent px-2 py-1 outline-none focus:bg-blue-50 border-none text-[#2563eb] placeholder:text-gray-300"
        aria-label="Note title"
        maxLength={100}
        autoFocus
      />
      <div className="flex gap-2 mb-2">
        <button
          title="Bold"
          className="rounded px-2 py-1 bg-[#e2e8f0] text-sm hover:bg-[#facc15] transition outline-none focus:ring-2"
          onMouseDown={e => { e.preventDefault(); format("bold"); }}
          tabIndex={-1}
        >
          <b>B</b>
        </button>
        <button
          title="Italic"
          className="rounded px-2 py-1 bg-[#e2e8f0] text-sm hover:bg-[#facc15] transition outline-none focus:ring-2"
          onMouseDown={e => { e.preventDefault(); format("italic"); }}
          tabIndex={-1}
        >
          <i>I</i>
        </button>
        <button
          title="Bullet List"
          className="rounded px-2 py-1 bg-[#e2e8f0] text-sm hover:bg-[#facc15] transition outline-none focus:ring-2"
          onMouseDown={e => { e.preventDefault(); format("insertUnorderedList"); }}
          tabIndex={-1}
        >
          • List
        </button>
      </div>
      <div
        className="flex-1 w-full rounded border border-gray-200 bg-white px-3 py-2 text-base min-h-[180px] focus:outline-[#2563eb] outline-none transition overflow-auto"
        contentEditable
        ref={ref}
        aria-label="Note content"
        spellCheck
        suppressContentEditableWarning
        onInput={handleContentInput}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ resize: "vertical", minHeight: 140 }}
        tabIndex={0}
        role="textbox"
      />
    </div>
  );
}
