'use client';

import { cn } from '@/lib/utils';
import { ArrowDown, ArrowRight, Video } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { handwritten } from '@/config/fonts';
import { DemoWidget } from './Demo';
import Link from 'next/link';
import { GetAccessButton } from './GetAccessButton';
import { PostWritterContextProvider } from '@/app/app/post-writter/_components/PostWritterProvider';
import { CarouselProvider } from '@/app/app/carrousel/_components/CarouselProvider';
import { fakeCarousel } from '@/app/app/carrousel/_components/const';

export default function Hero({ className = '' }) {
    return (
        <>
            <section
                className={cn(
                    `
                    flex flex-col items-center gap-2 lg:flex-row lg:items-center

                    `,
                    className
                )}
            >
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1'>
                    <div className='mx-auto max-w-2xl text-center'>
                        <span
                            className={`${handwritten.className} px-6 text-3xl text-base-muted-content text-muted-foreground`}
                        >
                            Convierte tus ideas en contenido único y de calidad
                        </span>
                        <p className='font-pj mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight'>
                            Crea Posts y{' '}
                            <span className='text-indigo-700'>
                                {' '}
                                Carrusels de LinkedIn en{' '}
                                <span className='line-through text-primary'>
                                    minutos
                                </span>{' '}
                                segundos
                            </span>
                        </p>

                        <div className='mt-9 flex flex-wrap items-center justify-center gap-5 px-8 sm:space-x-5 sm:px-0'>
                            <GetAccessButton
                                className=''
                                buttonProps={{
                                    variant: 'outline',
                                }}
                            />

                            <Link
                                className={`${buttonVariants({ variant: 'outline' })}`}
                                href={'#demo'}
                            >
                                <Video className='mr-2' />
                                Ver demo
                            </Link>
                        </div>

                        <p className='font-inter mt-8 flex lg:flex-row flex-col gap-2 justify-center items-center lg:animate-slide-right  animate-bounce text-muted-foreground'>
                            Pruébalo Gratis{' '}
                            <ArrowRight className='hidden lg:inline' />
                            <ArrowDown className='lg:hidden' />
                        </p>
                    </div>
                </div>

                <div className='flex flex-row mx-auto lg:mx-auto lg:max-w-6xl min-w-[400px] self-center flex-1'>
                    <CarouselProvider initialCarousel={fakeCarousel}>
                        <PostWritterContextProvider>
                            <DemoWidget />
                        </PostWritterContextProvider>
                    </CarouselProvider>
                </div>
            </section>
        </>
    );
}
