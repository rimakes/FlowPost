import { number } from 'zod';
import { cn } from '@/lib/utils';
import { TColorPalette, TMode } from '@/types/types';

type SlideProgressBarProps = {
    colorPalette: TColorPalette;
    numberOfSlides: number;
    currentSlide: number;
    mode: TMode;
    className?: string;
};
export function SlideProgressBar({
    colorPalette,
    numberOfSlides,
    currentSlide,
    mode,
    className,
}: SlideProgressBarProps) {
    return (
        <div
            className={cn(
                `absolute left-0 top-0 flex h-1 w-full gap-0`,
                className
            )}
        >
            <div
                style={{
                    backgroundColor: colorPalette.accent,
                    width: `${(currentSlide / (numberOfSlides - 1)) * 100}%`,
                }}
            />
            <div />
        </div>
    );
}
