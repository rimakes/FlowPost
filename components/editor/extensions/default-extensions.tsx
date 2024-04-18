import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import SlashCommand from './slash-command/slash-command';
import StarterKit from '@tiptap/starter-kit';
import HardBreak from '@tiptap/extension-hard-break';
// import SlashCommand from './slash-command/slash-command';
// import TiptapImage from "@tiptap/extension-image";

export const defaultExtensions = [
    // Includes the following extensions:
    //     Blockquote
    // BulletList
    // CodeBlock
    // Document
    // HardBreak
    // Heading
    // HorizontalRule
    // ListItem
    // OrderedList
    // Paragraph
    // Text
    // #Marks
    // Bold
    // Code
    // Italic
    // Strike
    // #Extensions
    // Dropcursor
    // Gapcursor
    // History
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc list-outside leading-3 -mt-2',
            },
        },
        orderedList: false,
        listItem: {
            HTMLAttributes: {
                class: 'leading-normal -mb-2',
            },
        },
        blockquote: {
            HTMLAttributes: {
                class: 'border-l-4 border-stone-700',
            },
        },
        codeBlock: {
            HTMLAttributes: {
                class: 'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800',
            },
        },
        code: {
            HTMLAttributes: {
                class: 'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900',
                spellcheck: 'false',
            },
        },
        horizontalRule: false,
        dropcursor: {
            color: '#DBEAFE',
            width: 4,
        },
        gapcursor: false,
        hardBreak: false,
    }),
    HardBreak.extend({
        addKeyboardShortcuts() {
            return {
                Enter: () => this.editor.commands.setHardBreak(),
            };
        },
    }),
    //   ### End of StarterKit
    //
    //
    //   // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
    //   HorizontalRule.extend({
    //     addInputRules() {
    //       return [
    //         new InputRule({
    //           find: /^(?:---|—-|___\s|\*\*\*\s)$/,
    //           handler: ({ state, range }) => {
    //             const attributes = {};

    //             const { tr } = state;
    //             const start = range.from;
    //             let end = range.to;

    //             tr.insert(start - 1, this.type.create(attributes)).delete(
    //               tr.mapping.map(start),
    //               tr.mapping.map(end),
    //             );
    //           },
    //         }),
    //       ];
    //     },
    //   }).configure({
    //     HTMLAttributes: {
    //       class: "mt-4 mb-6 border-t border-stone-300",
    //     },
    //   }),
    //   //   Custom extension
    //   TiptapLink.configure({
    //     HTMLAttributes: {
    //       class:
    //         "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
    //     },
    //   }),
    //   //   Custom extension
    //   TiptapImage.extend({
    //     addProseMirrorPlugins() {
    //       return [UploadImagesPlugin()];
    //     },
    //   }).configure({
    //     allowBase64: true,
    //     HTMLAttributes: {
    //       class: "rounded-lg border border-stone-200",
    //     },
    //   }),
    //   UpdatedImage.configure({
    //     HTMLAttributes: {
    //       class: "rounded-lg border border-stone-200",
    //     },
    //   }),
    //   Placeholder.configure({
    //     placeholder: ({ node }) => {
    //       if (node.type.name === "heading") {
    //         return `Heading ${node.attrs.level}`;
    //       }
    //       return "Press '/' for commands, or '++' for AI autocomplete...";
    //     },
    //     includeChildren: true,
    //   }),
    // Document,
    // Paragraph,
    // Text,
    SlashCommand,
    //   TiptapUnderline,
    //   TextStyle,
    //   Color,
    //   Highlight.configure({
    //     multicolor: true,
    //   }),
    //   TaskList.configure({
    //     HTMLAttributes: {
    //       class: "not-prose pl-2",
    //     },
    //   }),
    //   TaskItem.configure({
    //     HTMLAttributes: {
    //       class: "flex items-start my-4",
    //     },
    //     nested: true,
    //   }),
    //   //  Custom extension
    //   Markdown.configure({
    //     html: false,
    //     transformCopiedText: true,
    //   }),
    //   //  Custom extension
    //   CustomKeymap,

    //   // Custom extension
    //   DragAndDrop,
];
