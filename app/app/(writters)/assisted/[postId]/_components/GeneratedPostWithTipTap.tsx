'use client';

import { Save } from 'lucide-react';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CarouselContext } from '../../../../carrousel/_components/CarouselProvider';
import { PostWritterContext } from '../../../framework/_components/PostWritterProvider';
import { cn, proToast, wait } from '@/lib/utils';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import Editor from '@/components/editor/Editor';
import { upsertLinkedinPost } from '@/app/_actions/linkedinpost-actions';
import { CharCounter } from '@/components/shared/CharCounter';

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
    const { post, setPost, updatePost } = useContext(PostWritterContext);
    const { setCarousel } = useContext(CarouselContext);

    const router = useRouter();

    return (
        <div className={cn(``, className)}>
            {/* <EmojiPickerClient /> */}
            <div className='relative flex min-h-[40vh] flex-col space-y-2 rounded-b-3xl rounded-t-lg border p-2'>
                <Editor
                    onDebouncedUpdate={updatePost}
                    defaultValue={post.content.replace(/\n/g, '<br/>')}
                    className='h-full grow'
                />

                <div className='relative flex gap-2'>
                    <CharCounter
                        usedChars={post.content.length}
                        maxChars={3000}
                        minChars={10}
                        className='absolute -top-4 right-0'
                    />
                    <ButtonWithTooltip
                        variant={'secondary'}
                        icon={<Save />}
                        className='flex-1 rounded-full'
                        label='Guardar post'
                        onClick={async () => {
                            if (post.content.length > 3000)
                                return toast.error(
                                    'El post no puede superar los 3000 caracteres'
                                );
                            const toastId = toast.loading('Guardando post');
                            if (isDemo) {
                                await wait(500);
                                toast.dismiss(toastId);
                                return proToast(
                                    router,
                                    'Para guardar y programar tus post, hazte Pro ahora'
                                );
                            }

                            let dbPost;
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
                                router.push(`/app/assisted/${dbPost.id}`);
                                toast.success('Post guardado', {
                                    id: toastId,
                                });
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
