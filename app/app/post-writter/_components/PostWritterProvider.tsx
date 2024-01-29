'use client';

import { apiClient } from '@/lib/apiClient';
import { createContext, use, useContext, useState } from 'react';
import { PostRequest } from './PostWritterForm';
import { WritterReq, WritterRes } from '@/app/api/post-writter/route';

const INITIAL_STATE = {
    post: 'this is a post',
    postRequest: {
        description: '',
        templateId: null,
        toneId: 0,
    } as PostRequest,
};

// REVIEW: I think exporting this is causing a full reload of the app.
// Something I didn't noticed before is that it only force full reload when you save the problematic file.
export const PostWritterContext = createContext({
    ...INITIAL_STATE,
    requestPost: (data: PostRequest) => ({}) as Promise<WritterRes<'WRITE'>>,
});

type PostWritterContextProviderProps = { children: React.ReactNode };
export function PostWritterContextProvider({
    children,
}: PostWritterContextProviderProps) {
    const [post, setPost] = useState<string>(INITIAL_STATE.post);
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

        const res = await apiClient.post('/post-writter', reqBody);

        const resData = res.data as WritterRes<'WRITE'>;

        return resData;
    };

    return (
        <PostWritterContext.Provider
            value={{
                post,
                postRequest,
                requestPost,
            }}
        >
            {children}
        </PostWritterContext.Provider>
    );
}
