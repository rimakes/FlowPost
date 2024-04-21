'use client';

import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { cn, proToast } from '@/lib/utils';
import { Save } from 'lucide-react';
import { useContext, useState } from 'react';
import { PostWritterContext } from './PostWritterProvider';
import { useSession } from 'next-auth/react';
import { upsertLinkedinPost } from '@/app/_actions/writter-actions';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import { useRouter } from 'next/navigation';
import { TStatus } from '@/types/types';
import { CarouselContext } from '../../carrousel/_components/ContextProvider';
import Editor from '@/components/editor/editor';

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
    isEditable = false,
    height,
    minHeight,
    setEditDetailsModal,
    showEditableSwitch = true,
    carouselId,
    isDemo = false,
    onDemoCarouselCreated: onDemoCarouselCreatedProp = () => {},
}: GeneratedPostProps) => {
    const { data } = useSession();

    const [status, setStatus] = useState<TStatus>('idle');
    const { post, setPost, updatePost } = useContext(PostWritterContext);
    const { setCarousel } = useContext(CarouselContext);
    const [isEditableOverride, setIsEditableOverride] = useState(false);

    const router = useRouter();

    if (status === 'loading')
        return (
            <div className='flex-1 h-full w-full'>
                <Skeleton className='h-full w-full' />
            </div>
        );

    return (
        <div className={cn(``, className)}>
            {/* <EmojiPickerClient /> */}
            <div className='border p-2 space-y-2 rounded-t-lg rounded-b-3xl'>
                <div className='relative pb-6'>
                    <Editor
                        onDebouncedUpdate={updatePost}
                        defaultValue={post.content.replace(/\n/g, '<br/>')}
                    />
                </div>

                <div className='flex gap-2 relative'>
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
