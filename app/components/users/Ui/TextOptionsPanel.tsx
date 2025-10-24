import React from "react";

interface TextOptionsPanelProps {
  fontSize: number;
  bgColor: string;
  pastelColors: { name: string; color: string }[];
  onFontSizeChange: (size: number) => void;
  onColorSelect: (color: string) => void;
}

export default function TextOptionsPanel({
  fontSize,
  bgColor,
  pastelColors,
  onFontSizeChange,
  onColorSelect,
}: TextOptionsPanelProps) {
  return (
    <div className="absolute top-16 right-16 bg-[var(--bg)] p-4 rounded-lg shadow-lg text-sm space-y-3 z-40">
      <div>
        <label className="block text-gray-300 mb-1">Cỡ chữ</label>
        <input
          type="range"
          min={80}
          max={150}
          value={fontSize || 23}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Màu nền</label>
        <div className="flex gap-3">
          {pastelColors.map((item) => (
            <button
              key={item.color}
              type="button"
              onClick={() => onColorSelect(item.color)}
              className={`w-8 h-8 rounded-md border-2 transition ${
                bgColor === item.color
                  ? "border-[var(--primary)] scale-110"
                  : "border-gray-400"
              }`}
              style={{ backgroundColor: item.color }}
              title={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
