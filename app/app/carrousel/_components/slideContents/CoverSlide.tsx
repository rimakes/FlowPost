import { cn } from '@/lib/utils';
import { TBrand, TMode } from '@/types/types';
import { ASPECT_RATIOS_MAP } from '../const';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { SlideProgressBar } from '../slideParts/SlideProgressBar';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { aspectRatioClasses, AspectRatioKeys } from '../ContentSlideLayout';
import ContentEditable from 'react-contenteditable';
import { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type CoverSlideProps = {
    brand: TBrand;
    title: string;
    tagline: string;
    className?: string;
    mode?: TMode;
    slideNumber?: number;
};

export const CoverSlide = ({
    brand,
    title,
    tagline,
    className = '',
    mode = 'light',
    slideNumber,
}: CoverSlideProps) => {
    const titleRef = useRef('');
    const taglineRef = useRef('');

    const { editTitle, editDescription, editTagline, carousel } =
        useContext(CarouselContext);
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (title) titleRef.current = title;
        if (tagline) taglineRef.current = tagline;
        setIsHydrated(true);
    }, [tagline, title]);

    return (
        <>
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
                    className=''
                    defaultValue={title}
                    onDebouncedUpdate={(editor) => {
                        const value = editor?.getHTML();
                        editTitle(value!);
                    }}
                    slideElement='title'
                    isShown={carousel.slides[slideNumber!].title?.isShown}
                />
                <ContentEditable
                    onChange={(event) => {
                        titleRef.current = event.target.value;
                        editTitle(event.target.value);
                    }}
                    html={titleRef.current}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    // style={{
                    //     display: hasParagraphs ? 'block' : 'none',
                    // }}
                    style={{
                        fontSize: '1.8rem',
                        lineHeight: 1.1,
                        display: carousel.slides[slideNumber!].title?.isShown
                            ? 'block'
                            : 'none',
                    }}
                />
                <ContentEditable
                    onChange={(event) => {
                        taglineRef.current = event.target.value;
                        editTagline(event.target.value);
                    }}
                    html={taglineRef.current}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    // style={{
                    //     display: hasParagraphs ? 'block' : 'none',
                    // }}
                    style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.1,
                        display: carousel.slides[slideNumber!].tagline?.isShown
                            ? 'block'
                            : 'none',
                    }}
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
