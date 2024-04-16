'use client';

import { GalleryHorizontal } from 'lucide-react';
import { ButtonWithTooltip } from './ButtonWithTooltip';
import { toast } from 'sonner';
import {
    createLinkedinCarousel,
    upsertLinkedinPost,
} from '@/app/_actions/writter-actions';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { TCarousel, TLinkedinPost } from '@/types/types';
import { Progress } from '../ui/progress';
import useDeterminedProgressBar from '@/hooks/use-determined-progressbar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { PostWritterContext } from '@/app/app/post-writter/_components/PostWritterProvider';
import { Button } from '../ui/button';
import { appConfig } from '@/config/shipper.appconfig';
import { revalidateAllPaths } from '@/app/_actions/shared-actions';

type CrearCarouselButonProps = {
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
}: CrearCarouselButonProps) {
    const { data } = useSession();
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

    return (
        <ButtonWithTooltip
            ref={context.createCarouselButtonRef}
            buttonProps={buttonProps}
            icon={<GalleryHorizontal />}
            disabled={status === 'loading'}
            className={cn(
                `flex-1 rounded-full overflow-hidden  relative`,
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
                        isDemo,
                        data?.user?.id!
                    );
                    console.log('updatedPost', updatedPost);

                    const carouselRes = await createLinkedinCarousel(
                        updatedPost,
                        isDemo
                    );

                    return carouselRes;
                };

                let carouselId: string;

                toast.promise(upsertPostAndCreateCarousel, {
                    loading: `Creando carrusel...`,
                    //TODO:   Puedes seguir navegando por ${appConfig.general.appName}, te avisaremos cuando esté.`,
                    success: async (data) => {
                        carouselId = data.id;
                        if (isDemo) {
                            onDemoCarouselCreated(data);
                        }

                        toast.success('Carrusel creado', {
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
                        console.log('Carrusel creado');
                        await revalidateAllPaths();

                        return 'Carrusel creado';
                    },
                    finally: () => {
                        setStatus('idle');
                    },
                    error: 'Error al crear carrusel',
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
