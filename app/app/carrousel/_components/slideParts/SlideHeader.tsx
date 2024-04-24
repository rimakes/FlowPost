'use client';

import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { CarouselContext } from '../ContextProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type SlideHeaderProps = {
    slideNumber: number;
    className?: string;
};
export function SlideHeader({ slideNumber, className }: SlideHeaderProps) {
    const { carousel, setSlideContent } = useContext(CarouselContext);
    const heading = carousel.slides[slideNumber].slideHeading;

    return (
        <div
            className={cn(
                `slide-header flex justify-between absolute top-4 left-0 w-full px-8`,
                className
            )}
        >
            <SimpleEditor
                defaultValue={heading?.content}
                onDebouncedUpdate={(string) => {
                    setSlideContent('slideHeading', string);
                }}
                isShown={heading?.isShown}
                style={{
                    fontSize: '0.7rem',
                }}
            />

            <span>{slideNumber === 0 ? null : slideNumber}</span>
        </div>
    );
}
