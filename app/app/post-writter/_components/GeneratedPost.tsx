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
import { CarouselContext } from '../../carrousel/_components/CarouselProvider';

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
