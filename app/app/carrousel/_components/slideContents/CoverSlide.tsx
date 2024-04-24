import { cn } from '@/lib/utils';
import { TBrand, TMode } from '@/types/types';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { useContext } from 'react';
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
    const {
        setSlideContent,
        carousel: { slides },
    } = useContext(CarouselContext);

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
