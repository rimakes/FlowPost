'use client';

import { Header } from '@/components/shared/header';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const stretchClasses =
    'relative w-[calc(100vw-1rem)] sm:w-[calc(100vw-1rem)] md:w-[calc(100vw-1rem)] lg:w-[calc(100vw-256px-1rem)] -right-4 -left-4 md:-right-10 md:-left-10 xl:-right-20 xl:-left-20';
export default function IdeasPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <>
            <Header
                className='mt-6'
                title='Genera un carrusel'
                subtitle='Puedes generarlo de forma manual o pedirle a la IA que lo haga por ti a partir de un post'
            />
            {/* TODO: Can we get a better aproach to stretch an element that is inside a flex container without making it this rigid? 
            Right now, it depends on the size of the scrollbar, which is not ideal...
            */}
            <Separator className={stretchClasses} />
            <div
                className={`flex flex-wrap border-0 border-red-500 grow ${stretchClasses}`}
            >
                <div className='sidebar basis-60 grow border-0 border-green-500 p-4'>
                    <div className='space-y-4'>
                        <div>
                            <h4 className='font-semibold'>Brand kit</h4>
                            <p className='text-primary/50 text-sm'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. atque quaerat ab excepturi
                            </p>
                        </div>
                        <div className='border border-border rounded-md'></div>
                    </div>
                </div>
                <div className='not-sidebar basis-0 grow-[999] min-w-[60%] border-0 border-blue-500 p-2 bg-muted'>
                    <div className='flex flex-wrap border-0 border-red-500 grow bg-background rounded-md rounded-tr-none rounded-br-none p-2'>
                        <div className='not-sidebar basis-0 grow-[999] min-w-[40%] border-0 border-blue-500 p-2'>
                            <p className='text-primary/50 text-xs uppercase'>
                                Slide 1
                            </p>
                            <Label htmlFor='title'>Título</Label>
                            <Input
                                placeholder='Título'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Label htmlFor='title'>Descripción</Label>
                            <Input
                                placeholder='Descripción'
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='sidebar basis-[300px] m-auto border-0 border-green-500'>
                            <Carousel
                                profilePictureUrl='/images/placeholders/user.png'
                                backgroundColor='#AAFAAA'
                                name='Ricardo Sala'
                                handle='@ricsala'
                                title={title}
                                description={description}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center gap-4 w-full items-center text-sm mt-2'>
                        <ArrowLeft
                            size={20}
                            className='bg-muted p-1 rounded-full hover:cursor-pointer'
                        />
                        Slide 1 / 10
                        <ArrowRight
                            size={20}
                            className='bg-muted p-1 rounded-full hover:cursor-pointer'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// REVIEW: sidebar component
export const Sidebar = () => {
    <div className='flex flex-wrap gap-4 border-0 border-red-500 grow'>
        <div className='sidebar basis-80 grow border-0 border-green-500'></div>
        <div className='not-sidebar basis-0 grow-[999] min-w-[60%] border-0 border-blue-500'></div>
    </div>;
};

type CarouselProps = {
    backgroundColor?: string;
    fontColor?: string;
    profilePictureUrl?: string;
    handle: string;
    name: string;
    title: string;
    description: string;
    className?: string;
};

// TODO: if you need to resize the font based on parent container width, use this: https://codepen.io/tunglam/pen/xxZqrbr
// TODO: Carousel snap: https://codepen.io/andy-set-studio/pen/wvoLLXo

export const Carousel = ({
    backgroundColor,
    fontColor,
    profilePictureUrl,
    handle,
    name,
    className,
    title,
    description,
}: CarouselProps) => {
    let test = `bg-[#F0F000]`;
    return (
        <div
            className={cn(
                `bg-indigo-50 border-0 border-border px-4 text-[6px]
                relative  aspect-[1080/1350] m-auto
                `,
                className
            )}
            style={{
                backgroundColor: backgroundColor,
            }}
        >
            <div className='py-8'>
                <p className='uppercase text-[3em] text-indigo-600'>{title}</p>
                <p className='text-[2em] text-indigo-800'>{description}</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='h-[5em] w-[5em] rounded-full relative'>
                    <Image
                        src={
                            profilePictureUrl
                                ? profilePictureUrl
                                : '/images/placeholders/user.png'
                        }
                        fill
                        alt='placeholder'
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-primary/50'>{handle}</p>
                </div>
            </div>
        </div>
    );
};

/*
Each carousel has
- n slides, being n unknown.
- A background color OR a background image
- Author name
- Author handle
- Author profile picture
- primary color
- secondary color
- primary font
- secondary font


Each slide can have none, one or more of the following:
- Title -> Input
- Subtitle -> Input
- Description -> Textarea
- CTA label -> Input
- Image -> Widget

Other features:
- Should be able to add slides
- Should be able to remove slides, except the first and last one


*/
