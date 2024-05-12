'use client';

import { Dispatch, createContext, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import { PostRequest } from './PostWritterForm';
import { WritterReq } from '@/app/api/post-writter/route';
import { TBrand, TLinkedinPost } from '@/types/types';

const INITIAL_STATE = {
    post: {
        id: 'new',
        content: '',
        author: {
            handle: 'Ricardo Sala',
            name: 'Ricardo Sala',
            pictureUrl: '/images/placeholders/user.png', // placeholder or the image of the user
        },
        publishedAt: new Date(),
        published: false,
    } as TLinkedinPost,
    postRequest: {
        description: ``,
        toneId: 1,
        templateId: '',
    } as PostRequest,
    createCarouselButtonRef: null as React.RefObject<HTMLButtonElement> | null,
    setPost: ((post: TLinkedinPost) => {}) as Dispatch<
        React.SetStateAction<TLinkedinPost>
    >,
    updatePost: (editor: Editor | undefined) => {},
};

// REVIEW: I think exporting this is causing a full reload of the app.
// Something I didn't noticed before is that it only force full reload when you save the problematic file.
export const PostWritterContext = createContext({
    ...INITIAL_STATE,
    requestPost: (data: PostRequest) => Promise.resolve(''),
});

type PostWritterContextProviderProps = {
    children: React.ReactNode;
    initialPost?: TLinkedinPost;
    firstBrand?: TBrand;
};
export function PostWritterContextProvider({
    children,
    initialPost,
    firstBrand,
}: PostWritterContextProviderProps) {
    const [post, setPost] = useState(
        initialPost || {
            ...INITIAL_STATE.post,
            author: {
                handle: firstBrand?.handle || 'Ricardo Sala',
                name: firstBrand?.name || 'Ricardo Sala',
                pictureUrl:
                    firstBrand?.imageUrl || '/images/placeholders/user.png',
            },
        }
    );
    const [postRequest, setPostRequest] = useState<PostRequest>(
        INITIAL_STATE.postRequest
    );
    const createCarouselButtonRef = useRef<HTMLButtonElement>(null);

    const updatePost = (editor: Editor | undefined) => {
        if (!editor) return;
        setPost((prev) => ({
            ...prev,
            content: editor.getText({ blockSeparator: '\n' }),
        }));
    };

    const requestPost = async (data: PostRequest) => {
        const { description, templateId, toneId } = data;
        const reqBody: WritterReq<'WRITE'> = {
            action: 'WRITE',
            data: {
                description,
                templateId,
                toneId,
            },
        };

        const res = await fetch('/api/post-writter', {
            method: 'POST',
            body: JSON.stringify(reqBody),
        });

        if (res.status !== 200) {
            throw new Error('Error al escribir el post');
        }
        // The fetch response body is a readable stream.
        const readableStream = res.body;

        if (readableStream) {
            // We need to decode the stream into readable text, so we create a TextDecoderStream
            const decoderStream = new TextDecoderStream('utf-8');
            // ...and pipe our stream to it --> the result is a decoded readable stream
            const transformedStream = readableStream.pipeThrough(decoderStream);
            // From which we can create a reader
            const reader = transformedStream.getReader();

            let resData = '';
            setPost((prev) => ({ ...prev, content: '' }));

            // Read the stream
            while (true) {
                // the read data has the shape { done: boolean, value: text }

                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                // Value is already decoded thanks to the TextDecoderStream
                setPost((prev) => ({ ...prev, content: prev.content + value }));

                // Append the chunk to the result data
                resData += value;
            }
            setPost((prev) => ({ ...prev, content: resData }));
            return resData;
        } else return '';
    };

    return (
        <PostWritterContext.Provider
            value={{
                post,
                postRequest,
                requestPost,
                setPost,
                createCarouselButtonRef,
                updatePost,
            }}
        >
            {children}
        </PostWritterContext.Provider>
    );
}
