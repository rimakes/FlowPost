import { cn } from '@/lib/utils';
import { TBrand, TMode } from '@/types/types';
import { ASPECT_RATIOS_MAP } from '../const';
import { SlideProfileCard } from '../slideParts/SlideProfileCard';
import { SlideProgressBar } from '../slideParts/SlideProgressBar';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { aspectRatioClasses, AspectRatioKeys } from '../ContentSlideLayout';

type CoverSlideProps = {
    brand: TBrand;
    title: string;
    tagline: string;
    className?: string;
    mode?: TMode;
};

export const CoverSlide = ({
    brand,
    title,
    tagline,
    className = '',
    mode = 'light',
}: CoverSlideProps) => {
    return (
        <>
            <div
                className={cn(
                    `flex flex-col gap-4 h-full items-center text-center justify-center`,
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
                <h1 className='text-3xl'>{title}</h1>
                <p className='text-lg'>{tagline}</p>
                <SlideProfileCard
                    colorPalette={brand.colorPalette}
                    fontPalette={brand.fontPalette}
                    imageUrl={brand.imageUrl}
                    name={brand.name}
                    handle={brand.handle}
                    orientation='vertical'
                    mode='dark'
                />
            </div>
        </>
    );
};
