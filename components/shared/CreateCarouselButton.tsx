'use client';

import { GalleryHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ButtonWithTooltip } from './ButtonWithTooltip';
import {
    createCarousel,
    upsertLinkedinPost,
} from '@/app/_actions/writter-actions';
import { TCarousel, TLinkedinPost } from '@/types/types';
import useDeterminedProgressBar from '@/hooks/use-determined-progressbar';
import { cn } from '@/lib/utils';
import { PostWritterContext } from '@/app/app/post-writter/_components/PostWritterProvider';
import { useUserCredits } from '@/hooks/use-user-credits';

type CreateCarouselButonProps = {
    post: TLinkedinPost;
    className?: string;
    children?: React.ReactNode;
    isDemo?: boolean;
    onDemoCarouselCreated?: (carousel: TCarousel) => void;
    buttonProps?: React.ComponentProps<typeof Button>;
};
export function CreateCarouselButton({
    post,
    className,
    children,
    isDemo = false,
    onDemoCarouselCreated = () => {},
    buttonProps,
}: CreateCarouselButonProps) {
    const { data: session, update } = useSession();
    const { creditBalance, update: updateCredits } = useUserCredits();

    const router = useRouter();
    const [status, setStatus] = useState('idle');
    const [progressValue, showProgressBar] = useDeterminedProgressBar({
        isUploading: status === 'loading',
        interval: 2000,
        increment: 5,
    });
    const isMounted = useRef(false);
    const pathName = usePathname();
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    const context = useContext(PostWritterContext);

    const upsertPostAndCreateCarousel = async () => {
        // TODO: Check the credits in the backend too
        const credits = session?.user?.creditBalance!;
        if (credits <= 0) {
            throw new Error('No credits');
        }

        const updatedPost = await upsertLinkedinPost(
            post,
            isDemo,
            session?.user?.id!
        );
        const carouselRes = await createCarousel(updatedPost, isDemo);

        return carouselRes;
    };

    return (
        <ButtonWithTooltip
            ref={context.createCarouselButtonRef}
            buttonProps={buttonProps}
            icon={<GalleryHorizontal />}
            disabled={status === 'loading'}
            className={cn(
                `relative flex-1 overflow-hidden  rounded-full`,
                className
            )}
            label='Crear carrusel'
            onClick={async () => {
                setStatus('loading');
                if (post.content.length < 30) {
                    toast.error(
                        'El contenido del post debe tener al menos 30 caracteres'
                    );
                    return;
                }

                const toastId = toast.loading('Creando carrusel...', {
                    // TODO: Check how can we keep it active indefinitely (until we change it manually)
                    duration: 20000,
                });
                try {
                    const newCarousel = await upsertPostAndCreateCarousel();
                    const carouselId = newCarousel.id;
                    toast.success('Carrusel creado', {
                        id: toastId,
                        action: {
                            label: 'Ver carrusel',
                            onClick: () => {
                                router.push(`/app/carrousel/${carouselId}`);
                            },
                        },

                        classNames: {
                            actionButton:
                                '!bg-gradient-to-tr  !from-pink-400 !to-indigo-500 !text-pink-50',
                        },
                    });

                    if (isDemo) {
                        onDemoCarouselCreated(newCarousel);
                    }
                    if (!isDemo) await updateCredits(creditBalance - 1);
                } catch (error: any) {
                    switch (error.message) {
                        case 'No credits':
                            toast.error(
                                'No tienes créditos suficientes para crear un carrusel.',
                                {
                                    id: toastId,
                                }
                            );
                            break;
                        default:
                            toast.error(
                                'Ocurrió un error al crear el carrusel. Por favor, intenta de nuevo.',
                                {
                                    id: toastId,
                                }
                            );
                            break;
                    }
                } finally {
                    setStatus('idle');
                }
            }}
        >
            {status !== 'idle' && (
                <div className='absolute left-0 top-0 z-10 h-full w-full bg-background/50'>
                    <div className='absolute flex h-full w-full flex-col items-center justify-center px-4'>
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
