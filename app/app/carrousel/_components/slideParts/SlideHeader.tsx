'use client';

import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { CarouselContext } from '../ContextProvider';

type SlideHeaderProps = {
    slideNumber: number;
    className?: string;
};
export function SlideHeader({ slideNumber, className }: SlideHeaderProps) {
    const { carousel } = useContext(CarouselContext);
    const heading = carousel.slides[slideNumber].slideHeading;

    return (
        <div className={cn(``, className)}>
            <p className='flex justify-between'>
                <span
                    style={{
                        visibility: heading?.isShown ? 'visible' : 'hidden',
                    }}
                >
                    {heading?.content || ''}
                </span>
                <span>{slideNumber}</span>
            </p>
        </div>
    );
}
