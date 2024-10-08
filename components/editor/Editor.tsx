'use client';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
    Editor as TipTapEditor,
    EditorContent,
    useEditor,
} from '@tiptap/react';
import { toast } from 'sonner';
import FullScreenToolBar from '../full-screen-toolbar/FullScreenToolBar';
import { Separator } from '../ui/separator';
// TODO: change to mantine
import { defaultExtensions } from './extensions/default-extensions';
import { defaultEditorProps } from './default-props';
import { EditorBubbleMenu } from './bubble-menu/buble-menu';
import TopMenu from './top-menu/TopMenu';
import { getPrevText } from '@/lib/get-prev-text';
import useLocalStorage from '@/hooks/use-local-storage';
import useFullScreen from '@/hooks/use-full-screen';
import { cn, getContextText, requestComplete } from '@/lib/utils';

export default function Editor({
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg".
     */
    className = 'relative min-h-full w-full',
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue = '',
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
    storageKey = 'novel__content',

    /**
     * Disable local storage read/save.
     * Defaults to false.
     */
    disableLocalStorage = true,
}) {
    // TODO: change to mantine
    const [content, setContent] = useLocalStorage(storageKey, defaultValue);
    const [elementRef, openFullScreen, closeFullscreen, isFullScreenActive] =
        useFullScreen();

    const [hydrated, setHydrated] = useState(false);

    const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
        const json = editor.getJSON();
        onDebouncedUpdate(editor);

        if (!disableLocalStorage) {
            setContent(json);
        }
    }, debounceDuration);

    const editor = useEditor({
        parseOptions: {
            preserveWhitespace: 'full',
        },
        extensions: [...defaultExtensions, ...extensions],
        editorProps: {
            ...defaultEditorProps,
            ...editorProps,
        },
        onUpdate: async (e) => {
            if (!editor) return;
            const selection = e.editor.state.selection;
            const lastTwo = getPrevText(e.editor, {
                chars: 2,
            });
            if (
                lastTwo === '++'
                //  && !isLoading
            ) {
                e.editor.commands.deleteRange({
                    from: selection.from - 2,
                    to: selection.from,
                });
                try {
                    await requestComplete(
                        {
                            description: getContextText(editor, {
                                chars: 5000,
                                offset: 0,
                            }),
                            instructionsId: 'continue',
                        },
                        editor
                    );
                } catch (error: any) {
                    toast.error(`${error.message}.
                    Por favor, intenta de nuevo.`);
                }

                // complete(e.editor.storage.markdown.getMarkdown());
                // va.track("Autocomplete Shortcut Used");
            } else {
                onUpdate();
                debouncedUpdates(e);
            }
        },
        autofocus: 'start',
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
            {/* <Button onClick={openFullScreen}>Full</Button> */}

            <div
                id='custom-editor'
                ref={elementRef}
                onClick={() => {
                    editor?.chain().focus().run();
                }}
                className={cn(`relative bg-background`, className)}
            >
                <FullScreenToolBar
                    openFullScreen={openFullScreen}
                    closeFullscreen={closeFullscreen}
                    className={isFullScreenActive ? 'flex' : 'hidden'}
                />

                {editor && <EditorBubbleMenu editor={editor} />}
                {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
                <div className={cn(``)}>
                    <TopMenu editor={editor} handleDownload={() => {}} />
                    <Separator className='-ml-2 -mr-2 mb-4 mt-2 w-[100%+1rem]' />
                    <EditorContent
                        editor={editor}
                        ref={editorRef}
                        placeholder='Cinco consejos para mejorar tu copy...'
                        className='min-h-full flex-1 overflow-y-auto '
                    />
                </div>
            </div>
        </>
    );
}
