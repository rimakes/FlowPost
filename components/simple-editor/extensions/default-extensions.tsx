import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
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
                class: 'list-disc leading-8',
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal list-outside leading-3 -mt-2',
            },
        },
        listItem: {
            HTMLAttributes: {
                class: 'leading-normal',
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
    }),

    TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
    }),
];
