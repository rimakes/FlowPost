import { cn, isEven } from '@/lib/utils';
import { TBrand, TMode, TColorPalette, TDecorationId } from '@/types/types';
import { ArrowRight } from 'lucide-react';
import { ReactNode, Ref, forwardRef } from 'react';
import { ASPECT_RATIOS_MAP } from '../../carrousel/_components/const';
import { ProgressBar } from './ProgressBar';
import { SlideFotter } from './SlideFotter';
import { SlideHeader } from './SlideHeader';
import { Decoration } from '../../carrousel/_components/Decoration';

export const aspectRatioClasses = {
    '4:5': 'aspect-[1080/1350]',
    '1:1': 'aspect-[1/1]',
};

export type AspectRatioKeys = keyof typeof aspectRatioClasses;

type BetterSlideProps = {
    brand: TBrand;
    mode: TMode;
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    className?: string;
    children?: ReactNode;
    currentSlide: number;
    numberOfSlides: number;
    decorationId?: TDecorationId;
};

export const BetterSlide = forwardRef<HTMLDivElement, BetterSlideProps>(
    (
        {
            brand,
            mode,
            children,
            isActive,
            setIsActive,
            className,
            currentSlide,
            numberOfSlides,
            decorationId,
        },
        ref
    ) => {
        const colorPalette: TColorPalette = {
            primary: brand.colorPalette.primary,
            accent: brand.colorPalette.accent,
            background:
                mode === 'dark'
                    ? brand.colorPalette.font
                    : brand.colorPalette.background,
            font:
                mode === 'dark'
                    ? brand.colorPalette.background
                    : brand.colorPalette.font,
        };

        return (
            <div
                ref={ref}
                className={cn(
                    `slide border-0 border-border p-6 text-[0.75em]
    relative w-[32.5em] ${aspectRatioClasses[ASPECT_RATIOS_MAP['PORTRAIT'] as AspectRatioKeys]} m-auto overflow-hidden flex flex-col justify-between isolate
    `,
                    className,
                    isActive
                        ? ''
                        : 'hover:cursor-pointer hover:filter hover:brightness-75 transition-[filter]'
                )}
                style={{
                    backgroundColor: colorPalette.background,
                    color: colorPalette.font,
                }}
                onClick={() => setIsActive(true)}
            >
                {decorationId && (
                    <Decoration
                        decorationid={decorationId}
                        primaryColor={colorPalette.font}
                        secondaryColor={colorPalette.background}
                        accentColor={colorPalette.accent}
                        tertiaryColor={colorPalette.primary}
                        even={isEven(currentSlide)}
                    />
                )}
                <ProgressBar
                    colorPalette={colorPalette}
                    currentSlide={currentSlide}
                    numberOfSlides={numberOfSlides}
                    mode={mode}
                />
                <SlideHeader text='Slide Title' slideNumber={2} className='' />
                {/* <p className='z-50'>ACCENT: {colorPalette.accent}</p> */}
                {children}
                <SlideFotter
                    colorPalette={brand.colorPalette}
                    fontPalette={brand.fontPalette}
                    imageUrl={brand.imageUrl}
                    name={brand.name}
                    handle={brand.handle}
                    mode={mode}
                    swipeLabel={<ArrowRight className='h-10 w-10' />}
                    className='absolute bottom-0 left-0 w-full p-6'
                />
            </div>
        );
    }
);

BetterSlide.displayName = 'BetterSlide';
