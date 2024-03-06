import { cn } from '@/lib/utils';
import { TColorPalette, TMode } from '@/types/types';
import { number } from 'zod';

type ProgressBarProps = {
    colorPalette: TColorPalette;
    numberOfSlides: number;
    currentSlide: number;
    mode: TMode;
    className?: string;
};
export function ProgressBar({
    colorPalette,
    numberOfSlides,
    currentSlide,
    mode,
    className,
}: ProgressBarProps) {
    return (
        <div
            className={cn(
                `w-full h-1 flex gap-0 absolute top-0 left-0`,
                className
            )}
        >
            <div
                style={{
                    backgroundColor: colorPalette.accent,
                    width: `${(currentSlide / numberOfSlides) * 100}%`,
                }}
            />
            <div />
        </div>
    );
}
