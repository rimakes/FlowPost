import { cn } from '@/lib/utils';
import { TBrand, TMode } from '@/types/types';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { useContext } from 'react';
import { CarouselContext } from '../CarouselProvider';
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
    const {
        setSlideContent,
        carousel: { slides },
    } = useContext(CarouselContext);

    return (
        <>
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
                    className=''
                    defaultValue={title}
                    onDebouncedUpdate={(string) => {
                        setSlideContent('title', string);
                    }}
                    slideElement='title'
                    isShown={slides[slideNumber!].title?.isShown}
                />

                <SimpleEditor
                    className=''
                    defaultValue={tagline}
                    onDebouncedUpdate={(string) =>
                        setSlideContent('tagline', string)
                    }
                    slideElement='tagline'
                    isShown={slides[slideNumber!].tagline?.isShown}
                    style={{}}
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
