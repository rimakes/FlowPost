'use client';

import { cn } from '@/lib/utils';
import { ArrowDown, ArrowRight, Video } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { handwritten } from '@/config/fonts';
import { DemoWidget } from './Demo';
import Link from 'next/link';
import { GetAccessButton } from './GetAccessButton';

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
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl text-center'>
                        <span
                            className={`${handwritten.className} font-inter px-6 text-lg text-base-muted-content text-indigo-700`}
                        >
                            Crea Posts y Carrusels de Linkedin en segundos
                        </span>
                        <p className='font-pj mt-5 text-4xl font-bold leading-tight text-base-content sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight'>
                            Convierte tus{' '}
                            <span className='relative text-primary/70'>
                                pensamientos
                                <span
                                    className={`${handwritten.className} absolute top-0 right-0 text-base text-indigo-600 rotate-12`}
                                >
                                    desestructurados
                                </span>
                                <span
                                    className={`${handwritten.className} absolute top-0 left-0 text-base text-indigo-600 -rotate-12`}
                                >
                                    sin `gancho`
                                </span>
                                <span
                                    className={`${handwritten.className} absolute -bottom-2 right-0 text-base text-indigo-600 -rotate-[10deg]`}
                                >
                                    sin copywritting
                                </span>
                            </span>{' '}
                            en
                            <span className='relative inline-flex sm:inline'>
                                <span className='absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg filter'></span>
                                <span className='relative'>
                                    {' '}
                                    Post de Linkedin que convierten
                                </span>
                            </span>
                        </p>

                        <div className='mt-9 flex flex-wrap items-center justify-center gap-5 px-8 sm:space-x-5 sm:px-0'>
                            <GetAccessButton />

                            <Link
                                className={`${buttonVariants({ variant: 'outline' })}`}
                                href={'#demo'}
                            >
                                <Video className='mr-2' />
                                Ver demo
                            </Link>
                        </div>

                        <p className='font-inter mt-8 animate-pulse flex lg:flex-row flex-col gap-2 justify-center items-center'>
                            Pruébalo Gratis{' '}
                            <ArrowRight className='hidden lg:inline' />
                            <ArrowDown className='lg:hidden' />
                        </p>
                    </div>
                </div>

                <div className='flex flex-row mx-auto lg:mx-auto lg:max-w-6xl min-w-[400px] self-stretch'>
                    <DemoWidget />
                </div>
            </section>
            {/* <div className='flex border-8 border-green-500 w-full'>
                <div className='w-1/2 border-8 border-border'>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
                <div className='border border-red-500 w-1/2'></div>
            </div> */}
        </>
    );
}
