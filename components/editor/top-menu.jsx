"use client";

import { Button } from "@/components/ui/button";

export default function TopMenu({ editor, handleDownload }) {
  if (!editor) {
    return null;
  }

  //   Change the below buttons to objects in an array. each object has: label, variant, onClick, disable, className

  const buttonsConfig = [
    {
      label: "bold",
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      label: "italic",
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      label: "strike",
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      label: "code",
      command: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      label: "clear marks",
      command: () => editor.chain().focus().unsetAllMarks().run(),
    },
    {
      label: "clear nodes",
      command: () => editor.chain().focus().clearNodes().run(),
    },
    {
      label: "paragraph",
      command: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      label: "h1",
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      label: "h2",
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      label: "h3",
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      label: "h4",
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
    },
    {
      label: "h5",
      command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.isActive("heading", { level: 5 }),
    },
    {
      label: "h6",
      command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: () => editor.isActive("heading", { level: 6 }),
    },
    {
      label: "code block",
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      label: "blockquote",
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      label: "horizontal rule",
      command: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "hard break",
      command: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      label: "undo",
      command: () => editor.chain().focus().undo().run(),
      //   can: () => editor.can().undo().run(),
    },
    {
      label: "redo",
      command: () => editor.chain().focus().redo().run(),
      //   can: () => editor.can().redo().run(),
    },
    {
      label: "purple",
      command: () => editor.chain().focus().setColor("#958DF1").run(),
      isActive: () => editor.isActive("textStyle", { color: "#958DF1" }),
    },
    {
      label: "Download",
      command: handleDownload,
      isActive: () => editor.isActive("textStyle", { color: "#958DF1" }),
    },
  ];
  return (
    <>
      {buttonsConfig.map((button, idx) => (
        <Button
          key={idx}
          variant="ghost"
          onClick={button.command}
          disabled={button.can ? !button.can() : false}
          className={
            button.isActive ? (button.isActive() ? "is-active" : "") : ""
          }
        >
          {button.label}
        </Button>
      ))}
    </>
  );
}
