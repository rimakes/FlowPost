'use client';

import { Save } from 'lucide-react';
import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CarouselContext } from '../../carrousel/_components/CarouselProvider';
import { PostWritterContext } from './PostWritterProvider';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { cn, proToast } from '@/lib/utils';
import { upsertLinkedinPost } from '@/app/_actions/linkedinpost-actions';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { Switch } from '@/components/ui/switch';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import { TLinkedinPost, TStatus } from '@/types/types';

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

export const PostWritterResult = ({
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
    const { post, setPost } = useContext(PostWritterContext);
    const { setCarousel } = useContext(CarouselContext);
    const [isEditableOverride, setIsEditableOverride] = useState(false);

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
            <Label>Post generado</Label>

            <div className='space-y-2 rounded-b-3xl rounded-t-lg border p-2'>
                <div className='relative pb-6'>
                    <Textarea
                        rows={20}
                        className={`resize-none border-none h-[${height}px] min-h-[${minHeight}px]
                        bg-white focus-visible:outline-none focus-visible:!ring-transparent
                        `}
                        value={post.content}
                        readOnly={!isEditable && !isEditableOverride}
                        onChange={(e) => {
                            setPost({ ...post, content: e.target.value });
                        }}
                    />
                    {showEditableSwitch && (
                        <div className='absolute bottom-0 right-2 flex items-center gap-2 text-xs text-primary/70'>
                            <Label>Permitir edición</Label>
                            <Switch
                                checked={isEditableOverride}
                                onCheckedChange={setIsEditableOverride}
                            />
                        </div>
                    )}
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

                            let dbPost: TLinkedinPost | undefined;
                            try {
                                dbPost = await upsertLinkedinPost(
                                    post,
                                    isDemo,
                                    data?.user?.id!,
                                    carouselId
                                );

                                if (!dbPost)
                                    throw new Error('Error al guardar post');
                                setPost(dbPost);
                                router.push(`/app/post-writter/${dbPost.id}`);
                                toast.success('Post guardado!!!!');
                            } catch (error) {
                                console.error(error);
                                toast.error('Error al guardar post');
                            }
                        }}
                    />
                    <CreateCarouselButton
                        buttonProps={{
                            variant: 'secondary',
                        }}
                        isDemo={isDemo}
                        post={post}
                        onDemoCarouselCreated={(carousel) => {
                            // TODO: Refactor this
                            // @ts-ignore
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
