'use client';

import { apiClient } from '@/lib/apiClient';
import { createContext, use, useContext, useState } from 'react';
import { PostRequest } from './PostWritterForm';
import { WritterReq, WritterRes } from '@/app/api/post-writter/route';
import { TLinkedinPost } from '@/types/types';

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
        templateId: '',
        toneId: 1,
    } as PostRequest,
    setPost: (post: TLinkedinPost) => {},
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
};
export function PostWritterContextProvider({
    children,
    initialPost,
}: PostWritterContextProviderProps) {
    const [post, setPost] = useState(initialPost || INITIAL_STATE.post);
    const [postRequest, setPostRequest] = useState<PostRequest>(
        INITIAL_STATE.postRequest
    );

    const requestPost = async (data: PostRequest) => {
        const reqBody: WritterReq<'WRITE'> = {
            action: 'WRITE',
            data: {
                description: data.description,
                templateId: data.templateId,
                toneId: data.toneId,
            },
        };

        const res = await fetch('/api/post-writter', {
            method: 'POST',
            body: JSON.stringify(reqBody),
        });

        // The fetch response body is a readable stream.
        const readableStream = res.body;

        if (readableStream) {
            // We need to decode the stream into readable text, so we cerate a TextDecoderStream
            const decoder = new TextDecoderStream('utf-8');
            // ...and pipe our stream to it --> the result is a decoded readable stream
            const transformedStream = readableStream.pipeThrough(decoder);
            // From which we can create a reader
            const reader = transformedStream.getReader();

            let resData = '';
            setPost((prev) => ({ ...prev, content: '' }));

            // Read the stream
            while (true) {
                // the read data has the shape { done: boolean, value: text }
                // The value is text becuase we used a TextDecoderStream, right? Answer: Yes, if we hadn't used it, the value would be a Uint8Array (similar to a Buffer)
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                // Value is already decoded thanks to the TextDecoderStream
                console.log(value);
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
            }}
        >
            {children}
        </PostWritterContext.Provider>
    );
}
