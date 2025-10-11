import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type } from "lucide-react";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  if (!isClient || !editor) return null;

  const buttonBase =
    "p-1.5 rounded transition hover:bg-gray-600 bg-gray-700 flex items-center justify-center";
  const activeStyle = "bg-green-700";

  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-200">
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#111827] rounded-t-md border border-gray-600">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonBase} ${editor.isActive("bold") ? activeStyle : ""}`}
          type="button"
        >
          <Bold className="text-white w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonBase} ${editor.isActive("italic") ? activeStyle : ""}`}
          type="button"
        >
          <Italic className="text-white w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonBase} ${editor.isActive("underline") ? activeStyle : ""}`}
          type="button"
        >
          <UnderlineIcon className="text-white w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-600 mx-1" />

        <button
          onClick={() => setShowHeadings(!showHeadings)}
          className={`${buttonBase} ${showHeadings ? activeStyle : ""}`}
          type="button"
        >
          <Type className="text-white w-4 h-4" />
        </button>

        {showHeadings && (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() =>
                  editor.chain().focus().setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
                }
                className={`${buttonBase} ${editor.isActive("heading", { level: level as 1 | 2 | 3 | 4 | 5 | 6 }) ? activeStyle : ""
                  }`}
                type="button"
              >
                <span className="text-white text-xs font-bold">H{level}</span>
              </button>
            ))}

          </div>
        )}

        <div className="h-6 border-l border-gray-600 mx-1" />

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${buttonBase} ${editor.isActive({ textAlign: "left" }) ? activeStyle : ""
            }`}
          type="button"
        >
          <AlignLeft className="text-white w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${buttonBase} ${editor.isActive({ textAlign: "center" }) ? activeStyle : ""
            }`}
          type="button"
        >
          <AlignCenter className="text-white w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${buttonBase} ${editor.isActive({ textAlign: "right" }) ? activeStyle : ""
            }`}
          type="button"
        >
          <AlignRight className="text-white w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`${buttonBase} ${editor.isActive({ textAlign: "justify" }) ? activeStyle : ""
            }`}
          type="button"
        >
          <AlignJustify className="text-white w-4 h-4" />
        </button>
      </div>

      <div
        className={`p-3 bg-[#1F2937] border ${error ? "border-red-500" : "border-gray-700"
          } text-white rounded-md outline-none`}
      >
        <EditorContent
          editor={editor}
          className="w-full min-h-[200px] prose prose-invert [&_p]:leading-relaxed [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h4]:text-base [&_h5]:text-sm [&_h6]:text-xs"
        />
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
