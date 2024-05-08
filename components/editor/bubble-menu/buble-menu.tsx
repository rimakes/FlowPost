import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { Bold, BoldIcon, Italic, Strikethrough, Underline } from 'lucide-react';

import { EditorState } from '@tiptap/pm/state';
import { cn } from '@/lib/utils';

export type BubbleMenuItem = {
    name: string;
    isActive: () => boolean;
    command: () => void;
    icon: typeof BoldIcon;
};

export const EditorBubbleMenu = (props: Omit<BubbleMenuProps, 'children'>) => {
    const items: BubbleMenuItem[] = [
        // {
        //     name: 'bold',
        //     isActive: () => props.editor!.isActive('bold'),
        //     command: () => props.editor!.chain().focus().toggleBold().run(),
        //     icon: BoldIcon,
        // },
        // {
        //     name: 'italic',
        //     isActive: () => props.editor!.isActive('italic'),
        //     command: () => props.editor!.chain().focus().toggleItalic().run(),
        //     icon: ItalicIcon,
        // },
        {
            name: 'bold',
            isActive: () => props.editor!.chain().isCustomBold().run(),
            command: () => props.editor!.chain().focus().customBold().run(),
            icon: Bold,
        },
        {
            name: 'italic',
            isActive: () => props.editor!.chain().isCustomItalic().run(),
            command: () => props.editor!.chain().focus().customItalic().run(),
            icon: Italic,
        },
        {
            name: 'strike-through',
            isActive: () => props.editor!.chain().isStrikeThrough().run(),
            command: () =>
                props.editor!.chain().focus().customStrikeThrough().run(),
            icon: Strikethrough,
        },
        {
            name: 'underline',
            isActive: () => props.editor!.chain().isTextUnderline().run(),
            command: () =>
                props.editor!.chain().focus().customUnderline().run(),
            icon: Underline,
        },
    ];

    const bubbleMenuProps = {
        ...props,

        shouldShow: ({
            state,
            editor,
        }: {
            state: EditorState;
            editor: any;
        }) => {
            const { selection } = state;
            const { empty } = selection;

            if (
                editor.isActive('image') ||
                empty ||
                isNodeSelection(selection)
            ) {
                return false;
            }
            return true;
        },

        tippyOptions: {
            moveTransition: 'transform 0.15s ease-out',
            onHidden: () => {},
        },
    };

    return (
        <BubbleMenu
            {...bubbleMenuProps}
            className='flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl'
        >
            {}
            <div className='flex'>
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.command}
                        className='p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200'
                        type='button'
                    >
                        <item.icon
                            className={cn('h-4 w-4', {
                                'text-blue-500': item.isActive(),
                            })}
                        />
                    </button>
                ))}
            </div>
            {}
        </BubbleMenu>
    );
};
