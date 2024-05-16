'use client';

import { PostWritterResultTipTap } from './_components/GeneratedPostWithTipTap';
import { LinkedinPost } from './_components/LinkedinPost';
import { TCarousel } from '@/types/types';

type AssistedClientProps = {
    carousel: TCarousel;
};
export function AssistedClient({ carousel }: AssistedClientProps) {
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
