type SearchBarProps = {
  value: string;
  onChange: (val: string) => void;
};

// PUBLIC_INTERFACE
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="sr-only">
      <span className="hidden">Search notes</span>
      <input
        className="w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        aria-label="Search notes"
      />
    </label>
  );
}
