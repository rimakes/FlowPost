'use client';

import { Save } from 'lucide-react';
import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CarouselContext } from '../../carrousel/_components/CarouselProvider';
import { PostWritterContext } from './PostWritterProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, proToast } from '@/lib/utils';
import { upsertLinkedinPost } from '@/app/_actions/writter-actions';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import { TStatus } from '@/types/types';
import Editor from '@/components/editor/EditorComp';

type GeneratedPostProps = {
    className?: string;
    isEditable?: boolean;
    height?: number;
    minHeight?: number;
    setEditDetailsModal?: any;
    showEditableSwitch?: boolean;
    carouselId?: string;
    isDemo?: boolean;
    onDemoCarouselCreated?: () => void;
};

export const PostWritterResultTipTap = ({
    className,
    carouselId,
    isDemo = false,
    onDemoCarouselCreated: onDemoCarouselCreatedProp = () => {},
}: GeneratedPostProps) => {
    const { data } = useSession();

    const [status, setStatus] = useState<TStatus>('idle');
    const { post, setPost, updatePost } = useContext(PostWritterContext);
    const { setCarousel } = useContext(CarouselContext);

    const router = useRouter();

    if (status === 'loading')
        return (
            <div className='h-full w-full flex-1'>
                <Skeleton className='h-full w-full' />
            </div>
        );

    return (
        <div className={cn(``, className)}>
            {/* <EmojiPickerClient /> */}
            <div className='space-y-2 rounded-b-3xl rounded-t-lg border p-2'>
                <div className='relative pb-6'>
                    <Editor
                        onDebouncedUpdate={updatePost}
                        defaultValue={post.content.replace(/\n/g, '<br/>')}
                    />
                </div>

                <div className='relative flex gap-2'>
                    <ButtonWithTooltip
                        variant={'secondary'}
                        icon={<Save />}
                        className='flex-1 rounded-full'
                        label='Guardar post'
                        onClick={async () => {
                            if (isDemo)
                                return proToast(
                                    router,
                                    'Para guardar y programar tus post, hazte Pro ahora'
                                );

                            const dbpost = await upsertLinkedinPost(
                                post,
                                isDemo,
                                data?.user?.id!,
                                carouselId
                            );
                            setPost(dbpost);
                            router.push(`/app/post-writter/${dbpost.id}`);
                            toast('Post guardado');
                        }}
                    />
                    <CreateCarouselButton
                        buttonProps={{
                            variant: 'secondary',
                        }}
                        isDemo={isDemo}
                        post={post}
                        onDemoCarouselCreated={(carousel) => {
                            setCarousel(carousel);
                            onDemoCarouselCreatedProp();
                        }}
                        className='relative'
                    />
                </div>
            </div>
        </div>
    );
};
