import React from "react";

interface AddNotePopupProps {
  popup: { show: boolean; text: string; x: number; y: number };
  noteText: string;
  noteColor: string;
  setNoteColor: (color: string) => void;
  setNoteText: (text: string) => void;
  onSave: (text: string, note: string, color: string) => void;
  onClose: () => void;
}

export default function AddNotePopup({
  popup,
  noteText,
  noteColor,
  setNoteColor,
  setNoteText,
  onSave,
  onClose,
}: AddNotePopupProps) {
  if (!popup.show) return null;

  const colors = ["#FFF59D", "#FFAB91", "#A5D6A7", "#81D4FA"];

  return (
    <div
      className="absolute z-50 p-3 bg-[var(--bg)] border border-gray-700 rounded-lg shadow-lg note-popup"
      style={{ top: popup.y, left: popup.x }}
    >
      <p className="text-sm text-white/70 mb-2">
        Đoạn: <span className="text-green-400 italic">{popup.text.slice(0, 200)}...</span>
      </p>

      <div className="flex gap-2 mb-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setNoteColor(color)}
            className={`w-8 h-8 rounded border border-white/20 ${
              noteColor === color ? "ring-2 ring-green-400" : ""
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <textarea
        className="w-full bg-gray-800 text-gray-100 p-2 rounded mb-2"
        rows={3}
        placeholder="Viết ghi chú của bạn..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          className="text-xs bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-2 py-1 rounded"
          onClick={() => onSave(popup.text, noteText, noteColor)}
        >
          Lưu
        </button>
        <button
          className="text-xs text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
