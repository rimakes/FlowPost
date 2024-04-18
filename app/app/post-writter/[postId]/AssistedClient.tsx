'use client';

import { useContext } from 'react';
import { PostWritterContext } from '../_components/PostWritterProvider';
import { TCarousel, TLinkedinPost } from '@/types/types';
import Editor from '@/components/editor/editor';
import { LinkedinPost } from './_components/LinkedinPost';
import { Editor as TipTapEditor } from '@tiptap/react';
import { Textarea } from '@/components/ui/textarea';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { Save } from 'lucide-react';
import { upsertLinkedinPost } from '@/app/_actions/writter-actions';
import { useSession } from 'next-auth/react';
import { PostWritterResultTipTap } from '../_components/GeneratedPostWithTipTap';
type AssistedClientProps = {
    carousel: TCarousel;
};
export function AssistedClient({ carousel }: AssistedClientProps) {
    const { setPost, post } = useContext(PostWritterContext);
    const { data } = useSession();

    const updatePost = (editor: TipTapEditor | undefined) => {
        if (!editor) return;
        setPost((prev) => ({
            ...prev,
            content: editor.getText({ blockSeparator: '\n' }),
        }));
    };

    return (
        <div className='flex flex-col mt-6 2xl:flex-row gap-8'>
            <PostWritterResultTipTap className='flex-1' />
            <LinkedinPost
                carousel={carousel}
                className='grow-0 max-w-[430px] mx-auto'
            />
        </div>
    );
}
