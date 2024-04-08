'use client';

import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
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

type GeneratedPostProps = {
    className?: string;
    isEditable?: boolean;
    height?: number;
    minHeight?: number;
    setEditDetailsModal?: any;
    showEditableSwitch?: boolean;
    carouselId?: string;
};

export const PostWritterResult = ({
    className,
    isEditable = false,
    height,
    minHeight,
    setEditDetailsModal,
    showEditableSwitch = true,
    carouselId,
}: GeneratedPostProps) => {
    const { data } = useSession();

    const [status, setStatus] = useState<TStatus>('idle');
    const { post, setPost } = useContext(PostWritterContext);
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
            <Label>Post generado</Label>

            <div className='border border-muted p-2 space-y-2'>
                <div className='relative'>
                    <Textarea
                        rows={20}
                        className={`border-none resize-none h-[${height}px] min-h-[${minHeight}px]
                        focus-visible:!ring-trans focus-visible:outline-none
                        `}
                        value={post.content}
                        readOnly={!isEditable && !isEditableOverride}
                        onChange={(e) => {
                            setPost({ ...post, content: e.target.value });
                        }}
                    />
                    {showEditableSwitch && (
                        <div className='absolute right-2 bottom-2 flex items-center gap-2 text-xs text-primary/70'>
                            <Label>Permitir edición</Label>
                            <Switch
                                checked={isEditableOverride}
                                onCheckedChange={setIsEditableOverride}
                            />
                        </div>
                    )}
                </div>

                <div className='flex gap-2 relative'>
                    <ButtonWithTooltip
                        icon={<Save />}
                        className='flex-1 rounded-full bg-muted text-primary/50
                        hover:bg-primary/10'
                        label='Guardar post'
                        onClick={async () => {
                            const dbpost = await upsertLinkedinPost(
                                post,
                                data?.user?.id!,
                                carouselId
                            );
                            setPost(dbpost);
                            router.push(`/app/post-writter/${dbpost.id}`);
                            toast('Post guardado');
                        }}
                    />
                    <CreateCarouselButton post={post} className='relative' />
                </div>
            </div>
        </div>
    );
};
