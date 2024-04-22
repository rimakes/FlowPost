import { cn } from '@/lib/utils';
import { TBrand, TMode } from '@/types/types';
import { ASPECT_RATIOS_MAP } from '../const';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { SlideProgressBar } from '../slideParts/SlideProgressBar';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { AspectRatioKeys } from '../ContentSlideLayout';
import { useRef, useContext, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { CarouselContext } from '../ContextProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type CallToActionSlideProps = {
    brand: TBrand;
    title: string;
    tagline: string;
    className?: string;
    paragraphs: string[];
    mode?: TMode;
    slideNumber?: number;
};

export const CallToActionSlide = ({
    brand,
    title,
    tagline,
    paragraphs,
    className = '',
    mode = 'light',
    slideNumber,
}: CallToActionSlideProps) => {
    const {
        carousel: { slides },
        editTitle,
        editDescription,
        editTagline,
    } = useContext(CarouselContext);

    const isTitleShown = slides[slideNumber!].title?.isShown;
    const isTaglineShown = slides[slideNumber!].tagline?.isShown;
    const isParagraphShown = slides[slideNumber!].paragraphs[0]?.isShown;

    return (
        <>
            <SlideProgressBar
                colorPalette={brand.colorPalette}
                currentSlide={6}
                numberOfSlides={6}
                mode={mode}
            />
            <SlideGradientBlob brand={brand} />

            <div
                className={cn(
                    `flex flex-col gap-4 h-full items-center text-center justify-center z-10`,
                    className
                )}
            >
                <div
                    className='absolute rotate-45 -top-[30%] w-[140%] h-[60%] rounded-full bg-primary -z-10 blur-xl'
                    style={{
                        backgroundColor: brand.colorPalette.primary,
                        opacity: 0.4,
                    }}
                />
                <div
                    className='absolute -top-10 -left-10 w-[12rem] h-[17rem] rounded-full bg-primary -z-10 blur-3xl'
                    style={{
                        backgroundColor: brand.colorPalette.accent,
                        opacity: 0.3,
                    }}
                />

                <SimpleEditor
                    defaultValue={title}
                    onDebouncedUpdate={editTitle}
                    slideElement='title'
                    isShown={isTitleShown}
                />

                <SimpleEditor
                    defaultValue={tagline}
                    onDebouncedUpdate={editTagline}
                    slideElement='tagline'
                    isShown={isTaglineShown}
                />

                <SimpleEditor
                    defaultValue={paragraphs[0]}
                    onDebouncedUpdate={editDescription}
                    slideElement='paragraph'
                    isShown={isParagraphShown}
                />

                <SlideProfileCard
                    colorPalette={brand.colorPalette}
                    fontPalette={brand.fontPalette}
                    imageUrl={brand.imageUrl}
                    name={brand.name}
                    handle={brand.handle}
                    orientation='vertical'
                    mode='light'
                />
            </div>
        </>
    );
};
