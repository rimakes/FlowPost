'use client';

import { ArrowDown, ArrowRight, Video } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { DemoWidget } from './Demo';
import { GetAccessButton } from './GetAccessButton';
import { handwritten } from '@/config/fonts';
import { cn } from '@/lib/utils';
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
                <div className='mx-auto max-w-7xl flex-1 px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl text-center'>
                        <span
                            className={`${handwritten.className} text-base-muted-content px-6 text-3xl text-muted-foreground`}
                        >
                            Convierte tus ideas en contenido único y de calidad
                        </span>
                        <p className='font-pj mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight'>
                            Crea Posts y{' '}
                            <span className='text-indigo-700'>
                                {' '}
                                Carrusels de LinkedIn en{' '}
                                <span className='text-primary line-through'>
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

                        <p className='font-inter mt-8 flex animate-bounce flex-col items-center justify-center gap-2 text-muted-foreground  lg:animate-slide-right lg:flex-row'>
                            Pruébalo Gratis{' '}
                            <ArrowRight className='hidden lg:inline' />
                            <ArrowDown className='lg:hidden' />
                        </p>
                    </div>
                </div>

                <div className='mx-auto flex min-w-[400px] flex-1 flex-row self-center lg:mx-auto lg:max-w-6xl'>
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
