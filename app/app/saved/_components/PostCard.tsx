'use client';

import {
    createLinkedinCarousel,
    deleteLinkedinPost,
} from '@/app/_actions/writter-actions';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import useDeterminedProgressBar from '@/hooks/use-determined-progressbar';
import { TLinkedinPost, TStatus } from '@/types/types';
import { Edit, GalleryHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type PostCardProps = {
    post: TLinkedinPost;
};
export function PostCard({ post }: PostCardProps) {
    const [status, setStatus] = useState<TStatus>('idle');
    const [progressValue, showProgressBar] = useDeterminedProgressBar({
        isUploading: status === 'loading',
        interval: 2000,
        increment: 5,
    });
    const router = useRouter();
    return (
        // BOILER: Save in the boiler the way to do the stretch effect
        <div
            key={post.id}
            className='border border-border rounded-md flex flex-col [--outter-padding:1rem] p-[var(--outter-padding)]'
        >
            <p className='line-clamp-4 mb-2 grow'>{post.content}</p>
            <Separator className='-ml-[var(--outter-padding)] -mr-[var(--outter-padding)] w-[calc(100%+calc(var(--outter-padding)*2))]' />
            <div className='flex gap-2 pt-[var(--outter-padding)] relative'>
                <ButtonWithTooltip
                    icon={<Trash2 />}
                    className='flex-1 rounded-full bg-muted text-primary/50
                    hover:bg-primary/10'
                    label='Borrar post'
                    onClick={async () => {
                        await deleteLinkedinPost(post.id);
                        toast.success('Post eliminado');
                        router.refresh();
                    }}
                />
                <ButtonWithTooltip
                    icon={<Edit />}
                    className='flex-1 rounded-full bg-muted text-primary/50
                    hover:bg-primary/10'
                    label='Editar post'
                    onClick={() => {
                        router.push(`/app/post-writter/${post.id}`);
                    }}
                />
                <ButtonWithTooltip
                    icon={<GalleryHorizontal />}
                    className='flex-1 rounded-full bg-muted text-primary/50
                    hover:bg-primary/10'
                    label='Crear carrusel'
                    onClick={async () => {
                        toast.success(
                            'Creando carrusel. Espera unos segundos...'
                        );
                        setStatus('loading');
                        const newCarousel = await createLinkedinCarousel(post);
                        setStatus('idle');
                        router.push(`/app/carrousel/${newCarousel.id}`);
                        console.log(newCarousel);
                    }}
                />
                {status !== 'idle' && (
                    <div className='absolute w-full h-full bg-white/70 flex flex-col justify-center items-center'>
                        <p className='text-sm'>Creando carrusel...</p>
                        <Progress
                            value={progressValue as number}
                            className='h-1 w-full  bg-zinc-200'
                            color={
                                progressValue === 100
                                    ? 'bg-success'
                                    : 'bg-secondary'
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
