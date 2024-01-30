'use client';

import { Header } from '@/components/shared/header';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useContext, useState } from 'react';
import { SlideSettings } from './SlideSettings';
import {
    CarouselContext,
    CarouselContextProvider,
} from './_components/CarouselProvider';
import { range } from '@mantine/hooks';

/* TODO: Can we get a better aproach to stretch an element that is inside a flex container without making it this rigid? 
            Right now, it depends on the size of the scrollbar, which is not ideal...
            */
const stretchClasses =
    'relative w-[calc(100vw-1rem)] sm:w-[calc(100vw-1rem)] md:w-[calc(100vw-1rem)] lg:w-[calc(100vw-256px-1rem)]';

export default function CarouselPage() {
    return (
        <>
            <Header
                className='mt-6 border-0'
                title='Genera un carrusel'
                subtitle='Puedes generarlo de forma manual o pedirle a la IA que lo haga por ti a partir de un post'
            />

            <CarouselContextProvider>
                <div
                    className={`flex border-t flex-wrap w-full border-0 border-re-500 grow`}
                >
                    <CarouselSidebar />
                    <CarouselWorkbench />
                </div>
            </CarouselContextProvider>
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
    isActive?: boolean;
    className?: string;
};

// TODO: if you need to resize the font based on parent container width, use this: https://codepen.io/tunglam/pen/xxZqrbr
// TODO: Carousel snap: https://codepen.io/andy-set-studio/pen/wvoLLXo

export const Slide = ({
    backgroundColor,
    fontColor,
    profilePictureUrl,
    handle,
    name,
    className,
    title,
    description,
    isActive = true,
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
                <p
                    className='uppercase text-[3em] text-indigo-600'
                    // suppressContentEditableWarning
                    // contentEditable={isActive}
                    // onInput={(event) => {
                    //     event.preventDefault();
                    //     console.log(event.target.innerText);
                    // }}
                >
                    {title}
                </p>
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

type SlideWithSettingsProps = {
    className?: string;
    isActive?: boolean;
    slide: Slide;
};

const SlideWithSettings = ({
    className,
    isActive,
    slide,
}: SlideWithSettingsProps) => {
    const {
        carousel: { authorHandle, authorName, authorPictureUrl },
    } = useContext(CarouselContext);

    return (
        <div
            className={cn(
                `basis-[500px] shrink-0 isolate`,
                className,
                isActive ? 'z-10' : 'z-0'
            )}
        >
            <Slide
                profilePictureUrl={slide?.image!}
                backgroundColor={'#AAFAAA'}
                name={authorName!}
                handle={authorHandle!}
                title={slide?.title!}
                description={slide?.description!}
                isActive={isActive}
                className='border-r border-dashed'
            />
            <SlideSettings isActive={isActive} slide={slide} />
        </div>
    );
};

export const CarouselWorkbench = () => {
    const { currentSlide, nextSlide, previousSlide, carousel } =
        useContext(CarouselContext);
    return (
        <div className='not-sidebar basis-0 grow-[999] min-w-[60%] border-0 border-blue-500 p-2 bg-slate-100/50 bg-[url("/images/decoration/patterns/grid.svg")] flex flex-col gap-2'>
            <div className='flex justify-center gap-4 w-full items-center text-sm mt-2'>
                <ArrowLeft
                    size={20}
                    onClick={previousSlide}
                    className='bg-muted p-1 rounded-full hover:cursor-pointer'
                />
                Slide 1 / 10
                <ArrowRight
                    onClick={nextSlide}
                    size={20}
                    className='bg-muted p-1 rounded-full hover:cursor-pointer'
                />
            </div>
            <div className='carousel flex overflow-hidden pl-56'>
                {carousel.slides.map((slide, index) => (
                    <SlideWithSettings
                        slide={slide}
                        key={index}
                        isActive={currentSlide === index}
                        className={`-translate-x-[${100 * (currentSlide - 1)}%] transition-transform`}
                    />
                ))}
            </div>
        </div>
    );
};

const CarouselSidebar = () => {
    const {
        carousel: { authorName, authorHandle, authorPictureUrl },
        editImage,
        editName,
        editHandle,
    } = useContext(CarouselContext);
    return (
        <div className='sidebar basis-60 grow border-0 border-green-500 p-4'>
            <div className='space-y-4'>
                <div>
                    <h4 className='font-semibold'>Brand kit</h4>
                    <p className='text-primary/50 text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        atque quaerat ab excepturi
                    </p>
                </div>
                <div className=''>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                        placeholder='Nombre'
                        id='name'
                        value={authorName!}
                        onChange={(event) => {
                            editName(event.target.value);
                        }}
                    />
                </div>
                <div className=''>
                    <Label htmlFor='profilePic'>Foto de perfil</Label>
                    <Input
                        placeholder='Nombre'
                        id='profilePic'
                        value={authorPictureUrl!}
                        onChange={(event) => {
                            editImage(event.target.value);
                        }}
                    />
                </div>
                <div className=''>
                    <Label htmlFor='handle'>Handle</Label>
                    <Input
                        placeholder='Handle'
                        id='handle'
                        value={authorHandle!}
                        onChange={(event) => {
                            editHandle(event.target.value);
                        }}
                    />
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

export type Slide = {
    title: string | null;
    tagline: string | null;
    subtitle: string | null;
    description: string | null;
    image: string | null;
    hasCounter: boolean;
    hasTitle: boolean;
    hasParagraph: boolean;
    hasTagline: boolean;
};

export type Carousel = {
    swipeLabel: string | null;
    slides: Slide[];
    backgroundColor: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    primaryFont: string | null;
    secondaryFont: string | null;
    authorName: string | null;
    authorPictureUrl: string | null;
    authorHandle: string | null;
};
