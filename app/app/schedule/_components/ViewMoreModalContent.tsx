import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TLinkedinPost, TScheduledPost } from '@/types/types';
import { LinkedinPost } from '@prisma/client';
import { PenSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ViewMoreModalContentProps = {
    post: LinkedinPost & { scheduledPost: TScheduledPost[] };
};
export function ViewMoreModalContent({ post }: ViewMoreModalContentProps) {
    const router = useRouter();
    const date = new Date(post.updatedAt);
    const options: any = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDateString = date.toLocaleString('es-ES', options);

    return (
        <div className='flex flex-col gap-2'>
            <Textarea className='mb-4' rows={20}>
                {post.content}
            </Textarea>

            <div className='flex flex-col justify-between gap-1 text-[12px] italic text-primary/40'>
                <span className=''>{post?.content?.length} caracteres</span>
                <span className=''>
                    Última actualización: {formattedDateString}
                </span>
            </div>
            <div className='flex justify-end gap-1 text-[12px] italic text-primary/40'>
                {/* <Button variant={'outline'}>Editar</Button> */}
                <Button
                    variant={'outline'}
                    onClick={() => {
                        router.push(`/app/post-writter/${post.id}`);
                    }}
                >
                    <PenSquare size={16} className='mr-2' />
                    Editar
                </Button>
            </div>
        </div>
    );
}
