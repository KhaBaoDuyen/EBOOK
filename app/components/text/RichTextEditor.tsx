import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
} from "lucide-react";

export default function RichTextEditor({
  label = "Nội dung mô tả",
  value = "",
  onChange,
  error,
  helperText,
}: {
  label?: string;
  value?: string;
  onChange?: (content: string) => void;
  error?: boolean;
  helperText?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const [showHeadings, setShowHeadings] = useState(false);

  useEffect(() => setIsClient(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!isClient || !editor) return null;

  const buttonBase =
    "p-1.5 rounded transition flex items-center justify-center";
  const activeStyle = "bg-[var(--input-border-focus)] text-white";

  return (
    <div className="w-full">
      <label
        className="block mb-1 text-sm font-medium"
        style={{ color: error ? "var(--input-label-error)" : "var(--input-label-default)" }}
      >
        {label}
      </label>

       <div
        className="flex flex-wrap items-center gap-2 p-2 rounded-t-md border"
        style={{
          backgroundColor: "var(--input-bg)",
          borderColor: error ? "var(--input-border-error)" : "var(--input-border)",
        }}
      >
        {[
          { icon: Bold, command: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive("bold") },
          { icon: Italic, command: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive("italic") },
          { icon: UnderlineIcon, command: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive("underline") },
        ].map(({ icon: Icon, command, isActive }, i) => (
          <button
            key={i}
            onClick={command}
            className={`${buttonBase} ${isActive ? activeStyle : "hover:bg-[var(--input-border-hover)]/20"}`}
            type="button"
          >
            <Icon
              className="w-4 h-4"
              style={{
                color: error
                  ? "var(--input-label-error)"
                  : "var(--input-text)",
              }}
            />
          </button>
        ))}

        <div className="h-6 border-l mx-1" style={{ borderColor: "var(--input-border)" }} />

         <button
          onClick={() => setShowHeadings(!showHeadings)}
          className={`${buttonBase} ${showHeadings ? activeStyle : "hover:bg-[var(--input-border-hover)]/20"}`}
          type="button"
        >
          <Type className="w-4 h-4" style={{ color: "var(--input-text)" }} />
        </button>

        {showHeadings && (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() =>
                  editor.chain().focus().setHeading({ level }).run()
                }
                className={`${buttonBase} ${
                  editor.isActive("heading", { level })
                    ? activeStyle
                    : "hover:bg-[var(--input-border-hover)]/20"
                }`}
                type="button"
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--input-text)" }}
                >
                  H{level}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="h-6 border-l mx-1" style={{ borderColor: "var(--input-border)" }} />

         {[
          { icon: AlignLeft, align: "left" },
          { icon: AlignCenter, align: "center" },
          { icon: AlignRight, align: "right" },
          { icon: AlignJustify, align: "justify" },
        ].map(({ icon: Icon, align }) => (
          <button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`${buttonBase} ${
              editor.isActive({ textAlign: align })
                ? activeStyle
                : "hover:bg-[var(--input-border-hover)]/20"
            }`}
            type="button"
          >
            <Icon
              className="w-4 h-4"
              style={{ color: "var(--input-text)" }}
            />
          </button>
        ))}
      </div>

       <div
        className={`p-3 border rounded-b-md min-h-[200px] prose max-w-none`}
        style={{
          backgroundColor: "var(--input-bg)",
          color: "var(--input-text)",
          borderColor: error
            ? "var(--input-border-error)"
            : "var(--input-border)",
        }}
      >
        <EditorContent
          editor={editor}
          className="w-full prose-sm [&_p]:leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg"
        />
      </div>

      {helperText && (
        <p
          className="text-sm mt-1"
          style={{
            color: error
              ? "var(--input-helper-error)"
              : "var(--input-helper-default)",
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
