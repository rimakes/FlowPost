'use client';
import { useEffect, useRef, useState } from 'react';
import { defaultEditorContent } from './default-editor-content';
// TODO: change to mantine
import { useDebouncedCallback } from 'use-debounce';
import {
    Editor as TipTapEditor,
    EditorContent,
    useEditor,
} from '@tiptap/react';
import { defaultExtensions } from './extensions/default-extensions';
import { defaultEditorProps } from './default-props';
import { getPrevText } from '@/lib/get-prev-text';
import { EditorBubbleMenu } from './bubble-menu/buble-menu';
import TopMenu from './top-menu/top-menu';
import useLocalStorage from '@/hooks/use-local-storage';
import useFullScreen from '@/hooks/use-full-screen';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import FullScreenToolBar from '../full-screen-toolbar/FullScreenToolBar';
import { LinkedinPost } from '@/app/app/post-writter/[postId]/_components/LinkedinPost';

type TSlideElement = 'title' | 'tagline' | 'paragraph';

const defaultStylesMap = {
    title: 'overflow-hidden text-[1.8rem] leading-[1.1]',
    tagline: 'text-lg',
    paragraph: 'text-base',
};

export default function SimpleEditor({
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg".
     */
    className = 'relative min-h-full w-full sm:mb-[calc(20vh)] p-8',
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue = '...',
    /**
     * A list of extensions to use for the editor, in addition to the default Novel extensions.
     * Defaults to [].
     */
    extensions = [],
    /**
     * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
     * Defaults to {}.
     */
    editorProps = {},

    /**
     * A callback function that is called whenever the editor is updated.
     * Defaults to () => {}.
     */
    // eslint-disable-next-line no-unused-vars
    onUpdate = () => {},

    /**
     * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
     * Defaults to () => {}.
     */
    // eslint-disable-next-line no-unused-vars
    onDebouncedUpdate = (editor: TipTapEditor | undefined) => {},

    /**
     * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
     * Defaults to 750.
     */
    debounceDuration = 750,

    /**
     * The key to use for storing the editor's value in local storage.
     * Defaults to "novel__content".
     */
    storageKey = 'editor__content',

    /**
     * Disable local storage read/save.
     * Defaults to false.
     */
    disableLocalStorage = true,

    slideElement = 'paragraph' as TSlideElement,
    isShown = true,

    style = {},
}) {
    // TODO: change to mantine
    const [content, setContent] = useLocalStorage(storageKey, defaultValue);

    const [hydrated, setHydrated] = useState(false);

    const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
        const json = editor.getJSON();
        onDebouncedUpdate(editor);

        if (!disableLocalStorage) {
            setContent(json);
        }
    }, debounceDuration);

    const editor = useEditor({
        extensions: [...defaultExtensions, ...extensions],
        editorProps: {
            ...defaultEditorProps,
            ...editorProps,
        },
        onUpdate: (e) => {
            const selection = e.editor.state.selection;
            const lastTwo = getPrevText(e.editor, {
                chars: 2,
            });
            onUpdate();
            debouncedUpdates(e);
            // }
        },
        autofocus: 'end',
    });

    // Default: Hydrate the editor with the content from localStorage.
    // If disableLocalStorage is true, hydrate the editor with the defaultValue.
    useEffect(() => {
        if (!editor || hydrated) return;

        const value = disableLocalStorage ? defaultValue : content;

        if (value) {
            editor.commands.setContent(value);
            setHydrated(true);
        }
    }, [editor, defaultValue, content, hydrated, disableLocalStorage]);

    const editorRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {editor && <EditorBubbleMenu editor={editor} />}
            <div className={cn(``, className)}>
                <EditorContent
                    editor={editor}
                    ref={editorRef}
                    className={` ${defaultStylesMap[slideElement]}`}
                    style={{
                        display: isShown ? 'block' : 'none',
                        ...style,
                    }}
                />
            </div>
        </>
    );
}
