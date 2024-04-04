'use client';

import { GalleryHorizontal } from 'lucide-react';
import { ButtonWithTooltip } from './ButtonWithTooltip';
import { toast } from 'sonner';
import {
    createLinkedinCarousel,
    upsertLinkedinPost,
} from '@/app/_actions/writter-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TLinkedinPost } from '@/types/types';
import { Progress } from '../ui/progress';
import useDeterminedProgressBar from '@/hooks/use-determined-progressbar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { promises } from 'dns';
import { revalidatePath } from 'next/cache';
import { revalidateAllPaths } from '@/app/_actions/shared-actions';

type CrearCarouselButonProps = {
    post: TLinkedinPost;
    className?: string;
    children?: React.ReactNode;
};
export function CreateCarouselButton({
    post,
    className,
    children,
}: CrearCarouselButonProps) {
    const { data } = useSession();
    const router = useRouter();
    const [status, setStatus] = useState('idle');
    const [progressValue, showProgressBar] = useDeterminedProgressBar({
        isUploading: status === 'loading',
        interval: 2000,
        increment: 5,
    });

    return (
        <ButtonWithTooltip
            icon={<GalleryHorizontal />}
            disabled={status === 'loading'}
            className={cn(
                `flex-1 rounded-full bg-muted overflow-hidden text-primary/50 hover:bg-primary/10 relative`,
                className
            )}
            label='Crear carrusel'
            onClick={async () => {
                if (post.content.length < 30) {
                    toast.error(
                        'El contenido del post debe tener al menos 30 caracteres'
                    );
                    return;
                }

                setStatus('loading');

                const upsertPostAndCreateCarousel = async () => {
                    const updatedPost = await upsertLinkedinPost(
                        post,
                        data?.user?.id!
                    );

                    const carouselRes =
                        await createLinkedinCarousel(updatedPost);

                    return carouselRes;
                };

                let carouselId: string;

                toast.promise(upsertPostAndCreateCarousel, {
                    loading: 'Creando carrusel...',
                    success: (data) => {
                        carouselId = data.id;
                        return 'Carrusel creado';
                    },
                    error: 'Error al crear carrusel',

                    finally: () => {
                        setStatus('idle');
                        router.push(`/app/carrousel/${carouselId}`);
                    },
                });
            }}
        >
            {status !== 'idle' && (
                <div className='absolute h-full w-full top-0 left-0 bg-background/50 z-10'>
                    <div className='absolute w-full h-full flex flex-col justify-center items-center px-4'>
                        <p className='text-primary'>Creando carrusel...</p>
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
                </div>
            )}
        </ButtonWithTooltip>
    );
}

// Aprender a programar tienes tres grandes ventajas (pon cada una con una foto):

// 1. Puedes crear tus propias ideas
// 2. Pudes trabajar desde donde quieras
// 3. Te entiendes con los desarrolladores de tu empresa

// Podrías incluso trabajar desde esta terraza!!!!

// Y tú, ¿A qué esperas?
