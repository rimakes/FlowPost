'use client';

import { TCarousel } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import {
    deleteCarousel,
    deleteLinkedinPost,
} from '@/app/_actions/writter-actions';
import { cn } from '@/lib/utils';

type CarouselCardProps = { carousel: TCarousel; className?: string };
export function CarouselCard({ carousel, className }: CarouselCardProps) {
    const data = useSession();
    const router = useRouter();

    return (
        <div
            className={cn(
                `border border-border flex flex-col gap-2 [--outter-padding:1rem] p-[var(--outter-padding)] rounded-md shadow-md cursor-pointer bg-white hover:shadow-lg transition-all duration-300 ease-in-out`,
                className
            )}
        >
            <p className='p-2'>{carousel.author.name}</p>
            <Separator className='-ml-[var(--outter-padding)] -mr-[var(--outter-padding)] w-[calc(100%+calc(var(--outter-padding)*2))]' />

            <div
                className='flex flex-col gap-2'
                onClick={() => router.push(`/app/carrousel/${carousel.id}`)}
            >
                <h2 className='text-center text-lg font-bold grow'>
                    {carousel.slides[0].title?.content}
                </h2>
                <div>
                    <p>{carousel.slides[0].paragraphs[0]?.content}</p>
                    <p>{carousel.slides[0].tagline?.content}</p>
                </div>
            </div>
            <CarouselActions carousel={carousel} className='mt-auto' />
        </div>
    );
}

const CarouselActions = ({ carousel, className }: CarouselCardProps) => {
    const router = useRouter();

    return (
        <div
            className={cn(
                `flex gap-2 pt-[var(--outter-padding)] relative`,
                className
            )}
        >
            <ButtonWithTooltip
                icon={<Trash2 />}
                className='flex-1 rounded-full bg-muted text-primary/50
                hover:bg-primary/10'
                label='Borrar post'
                onClick={async () => {
                    await deleteCarousel(carousel.id);
                    toast.success('Post eliminado');
                    router.refresh();
                }}
            />
            <ButtonWithTooltip
                icon={<Edit />}
                className='flex-1 rounded-full bg-muted text-primary/50
                hover:bg-primary/10'
                label='Editar carrusel'
                onClick={() => router.push(`/app/carrousel/${carousel.id}`)}
            />
        </div>
    );
};
