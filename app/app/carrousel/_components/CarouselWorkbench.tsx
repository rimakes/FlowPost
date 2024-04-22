'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import {
    TBrand,
    TDecorationId,
    TFont,
    TMode,
    TSlide,
    TSlideDesignNames,
} from '@/types/types';
import { CarouselContext } from './ContextProvider';
import { ContentSlideLayout } from './ContentSlideLayout';
import { TextOnlySlide } from './slideContents/TextOnlySlide';
import { cn, isEven } from '@/lib/utils';
import { SlideSettings } from './SlideSettings';
import { designMap } from './slideContents/contentMaps';
// Whitelisting the classes:
type keys = keyof typeof translateClasses;
const translateClasses = {
    0: '-translate-x-[0%]',
    100: '-translate-x-[100%]',
    200: '-translate-x-[200%]',
    300: '-translate-x-[300%]',
    400: '-translate-x-[400%]',
    500: '-translate-x-[500%]',
    600: '-translate-x-[600%]',
    700: '-translate-x-[700%]',
    800: '-translate-x-[800%]',
    900: '-translate-x-[900%]',
    1000: '-translate-x-[1000%]',
    1100: '-translate-x-[1100%]',
    1200: '-translate-x-[1200%]',
    1300: '-translate-x-[1300%]',
    1400: '-translate-x-[1400%]',
    1500: '-translate-x-[1500%]',
} as const;

type CarouselWorkbenchProps = {};

export const CarouselWorkbench = ({}: CarouselWorkbenchProps) => {
    const { currentSlide, nextSlide, previousSlide, carousel } =
        useContext(CarouselContext);

    return (
        <div className='not-sidebar basis-0 grow-[999] min-w-[60%]  p-2 bg-slate-100/50 bg-[url("/images/decoration/patterns/grid.svg")] flex flex-col gap-2 relative focus-visible:!border-transparent '>
            <div className='flex justify-center gap-4 w-full items-center text-sm mt-2'>
                <ArrowLeft
                    size={20}
                    onClick={previousSlide}
                    className='bg-muted p-1 rounded-full hover:cursor-pointer'
                />
                Slide {currentSlide + 1} / {carousel.slides.length}
                <ArrowRight
                    onClick={nextSlide}
                    size={20}
                    className='bg-muted p-1 rounded-full hover:cursor-pointer'
                />
            </div>
            <div className='carousel flex overflow-hidden md:pl-8 lg:pl-56 2xl:pl-96'>
                {carousel.slides.map((slide, index) => (
                    <SlideWithSettings
                        key={index} //TODO: Better no index
                        slide={slide}
                        slideNumber={index}
                        numberOfSlides={carousel.slides.length}
                        decorationId={
                            carousel.settings.backgroundPattern as TDecorationId
                        }
                        className={`${translateClasses[(100 * currentSlide) as keys]} transition-transform duration-300`}
                        mode={
                            carousel.settings.alternateColors &&
                            !isEven(index) &&
                            index !== 0
                                ? 'dark'
                                : 'light'
                        }
                    />
                ))}
            </div>
        </div>
    );
};

type SlideWithSettingsProps = {
    className?: string;
    slide: TSlide;
    slideNumber: number;
    numberOfSlides: number;
    children?: ReactNode;
    decorationId?: TDecorationId;
    mode: TMode;
};

export const SlideWithSettings = ({
    className,
    slide,
    slideNumber,
    numberOfSlides,
    decorationId,
    mode,
}: SlideWithSettingsProps) => {
    const {
        setCurrentSlideTo,
        currentSlide,
        addRef,
        carousel,
        getCompleteBrand,
    } = useContext(CarouselContext);
    const slideRef = useRef<HTMLDivElement>(null);
    const isActive = currentSlide === slideNumber;
    const DesignElement = slide.design
        ? designMap[slide.design as TSlideDesignNames]
        : TextOnlySlide;
    // console.log('slide here', slide);

    useEffect(() => {
        addRef(slideRef, slideNumber);
    }, [addRef, slideNumber]);

    const brand = getCompleteBrand() as TBrand;
    const adjustedBrand: TBrand =
        mode === 'dark'
            ? {
                  ...brand,
                  colorPalette: {
                      font: brand.colorPalette.background,
                      background: brand.colorPalette.font,
                      accent: brand.colorPalette.primary,
                      primary: brand.colorPalette.accent,
                  },
              }
            : brand;

    return (
        <div
            className={cn(
                `WithSettings shrink-0 isolate`,
                className || '',
                isActive ? 'z-10' : 'z-0'
            )}
        >
            <div
                className={`slideStyles`}
                style={{
                    // @ts-ignore
                    '--bold-color': brand.colorPalette.accent,
                    fontFamily: brand.fontPalette.primary,
                }}
            >
                <ContentSlideLayout
                    brand={adjustedBrand}
                    isActive={currentSlide === slideNumber}
                    mode='dark'
                    onClick={() => {
                        setCurrentSlideTo(slideNumber);
                    }}
                    currentSlide={slideNumber}
                    numberOfSlides={numberOfSlides}
                    decorationId={decorationId}
                    backgroundImage={slide.backgroundImage!}
                    ref={slideRef}
                    isCoverOrCTA={
                        slide.design === 'CallToAction' ||
                        slide.design === 'Cover'
                    }
                    aspectRatio={carousel.settings.aspectRatio}
                    hasDecoration={carousel.settings.showDecoration}
                >
                    <DesignElement
                        key={slideNumber}
                        slideNumber={slideNumber}
                        image={slide.image?.url!}
                        tagline={slide.tagline?.content!}
                        brand={adjustedBrand}
                        description={slide.paragraphs[0]?.content}
                        title={slide.title?.content!}
                        paragraphs={slide.paragraphs.map((p) => p.content)}
                        bigCharacter={slide.bigCharacter?.content || ''}
                        listFirstNumber={slide.listFirstItem!}
                        imageCaption={slide.image?.caption!}
                        className=''
                    />
                </ContentSlideLayout>
            </div>
            <SlideSettings isActive={isActive} slide={slide} />

            {Object.keys(brand.fontPalette).map((fontType) => (
                // REVIEW: Apart from the fact that it works...what do we think about this...?
                <div key={brand.fontPalette[fontType as TFont]}>
                    <style>
                        {`#font-test {font-family: ${brand.fontPalette[fontType as TFont]} !important;}`}
                    </style>
                    <link
                        rel='stylesheet'
                        href={`https://fonts.googleapis.com/css?family=${brand.fontPalette[fontType as TFont].replace(' ', '+')}`}
                    />
                </div>
            ))}
        </div>
    );
};
