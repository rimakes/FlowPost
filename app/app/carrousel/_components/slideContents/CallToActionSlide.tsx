import { useContext } from 'react';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { SlideProgressBar } from '../slideParts/SlideProgressBar';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { CarouselContext } from '../CarouselProvider';
import { TBrand, TMode } from '@/types/types';
import { cn } from '@/lib/utils';
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
        setSlideContent,
        editDescription,
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
                    `z-10 flex h-full flex-col items-center justify-center gap-4 text-center`,
                    className
                )}
            >
                <div
                    className='absolute -top-[30%] -z-10 h-[60%] w-[140%] rotate-45 rounded-full bg-primary blur-xl'
                    style={{
                        backgroundColor: brand.colorPalette.primary,
                        opacity: 0.4,
                    }}
                />
                <div
                    className='absolute -left-10 -top-10 -z-10 h-[17rem] w-[12rem] rounded-full bg-primary blur-3xl'
                    style={{
                        backgroundColor: brand.colorPalette.accent,
                        opacity: 0.3,
                    }}
                />

                <SimpleEditor
                    defaultValue={title}
                    onDebouncedUpdate={(string) => {
                        setSlideContent('title', string);
                    }}
                    slideElement='title'
                    isShown={isTitleShown}
                />

                <SimpleEditor
                    defaultValue={tagline}
                    onDebouncedUpdate={(string) =>
                        setSlideContent('tagline', string)
                    }
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
