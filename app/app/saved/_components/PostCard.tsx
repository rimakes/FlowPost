'use client';

import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteLinkedinPost } from '@/app/_actions/linkedinpost-actions';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import { Separator } from '@/components/ui/separator';
import { TLinkedinPost } from '@/types/types';

type PostCardProps = {
    post: TLinkedinPost;
};
export function PostCard({ post }: PostCardProps) {
    const router = useRouter();
    return (
        <div
            key={post.id}
            className='isolate flex flex-col rounded-md border border-border p-[var(--outter-padding)] [--outter-padding:1rem]'
        >
            <p className='mb-2 line-clamp-4 grow'>{post.content}</p>
            <Separator className='-ml-[var(--outter-padding)] -mr-[var(--outter-padding)] w-[calc(100%+calc(var(--outter-padding)*2))]' />
            <div className='relative flex gap-2 pt-[var(--outter-padding)]'>
                <ButtonWithTooltip
                    icon={<Trash2 />}
                    className='flex-1 rounded-full bg-muted text-primary/50 hover:bg-primary/10'
                    label='Borrar post'
                    onClick={async () => {
                        try {
                            await deleteLinkedinPost(post.id);
                            toast.success('Post eliminado');
                            router.refresh();
                        } catch (error) {
                            console.error(error);
                            toast.error('No se pudo eliminar el post');
                        }
                    }}
                />
                <ButtonWithTooltip
                    icon={<Edit />}
                    className='flex-1 rounded-full bg-muted text-primary/50 hover:bg-primary/10'
                    label='Editar post'
                    onClick={() => {
                        router.push(`/app/post-writter/${post.id}`);
                    }}
                />
                <CreateCarouselButton post={post} />
            </div>
        </div>
    );
}

// TODO: limitar a los créditos disponibles
