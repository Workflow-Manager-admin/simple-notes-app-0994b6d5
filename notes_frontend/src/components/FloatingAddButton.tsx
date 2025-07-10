type FloatingAddButtonProps = {
  onClick: () => void;
  label?: string;
};

// PUBLIC_INTERFACE
export function FloatingAddButton({ onClick, label }: FloatingAddButtonProps) {
  return (
    <button
      aria-label={label || "Add note"}
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-[#facc15] text-neutral-800 font-bold text-lg hover:bg-yellow-300 transition-all border-2 border-[#facc15] outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <svg width={24} height={24} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill="#facc15" />
        <path d="M10 6v8M6 10h8" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
