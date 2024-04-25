'use client';

import { useContext } from 'react';
import { PostWritterContext } from '../_components/PostWritterProvider';
import { TCarousel } from '@/types/types';
import { LinkedinPost } from './_components/LinkedinPost';
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
