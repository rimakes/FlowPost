import { StarterKit } from '@tiptap/starter-kit';
import { HardBreak } from '@tiptap/extension-hard-break';
import SlashCommand from './slash-command/slash-command';
import CustomBold from '@/components/editor/extensions/custom-bold';
import CustomItalic from '@/components/editor/extensions/custom-italic';
import CustomStrikeThrough from '@/components/editor/extensions/custom-strike-through';
import CustomUnderline from '@/components/editor/extensions/custom-underline';

export const defaultExtensions = [
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

    SlashCommand,
    CustomBold,
    CustomItalic,
    CustomStrikeThrough,
    CustomUnderline,
];
