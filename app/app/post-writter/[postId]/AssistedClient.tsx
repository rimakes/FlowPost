'use client';

import { useContext } from 'react';
import { PostWritterContext } from '../_components/PostWritterProvider';
import { TCarousel, TLinkedinPost } from '@/types/types';
import Editor from '@/components/editor/Editor';
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

    return (
        <div className='mt-6 flex flex-col gap-8 2xl:flex-row'>
            <PostWritterResultTipTap className='flex-1' />
            <LinkedinPost
                carousel={carousel}
                className='mx-auto max-w-[430px] grow-0'
            />
        </div>
    );
}
