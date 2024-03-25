'use client';

import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Editable } from '@/components/shared/Editable';

type SlideHeaderProps = {
    slideNumber: number;
    className?: string;
};
export function SlideHeader({ slideNumber, className }: SlideHeaderProps) {
    const { carousel, editHeader } = useContext(CarouselContext);
    const heading = carousel.slides[slideNumber].slideHeading;

    return (
        <div className={cn(`flex justify-between`, className)}>
            <Editable
                value={heading?.content || ''}
                setValue={(value) => editHeader(value)}
                style={{
                    visibility: heading?.isShown ? 'visible' : 'hidden',
                }}
            />
            <span>{slideNumber === 0 ? null : slideNumber}</span>
        </div>
    );
}
