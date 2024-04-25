'use client';

import { cn } from '@/lib/utils';
import { TColor, TColorPalette, TOrientation } from '@/types/types';

type ColorPaletteProps = {
    colors: TColorPalette;
    onClick?: (colorPalette: TColorPalette) => void;
    className?: string;
    orientation?: TOrientation;
};

export const ColorPalette = ({
    colors,
    onClick = () => {},
    className,
    orientation = 'horizontal',
}: ColorPaletteProps) => {
    const colorClasses = 'flex-1';
    const colorIndex = ['accent', 'primary', 'font', 'background'];

    return (
        <div
            className={cn(
                `flex h-4 w-full overflow-hidden rounded-l-md rounded-r-md border`,
                orientation === 'vertical'
                    ? 'h-16 min-w-[1rem] flex-col'
                    : 'min-h-[1rem] min-w-[4rem] flex-row',
                className
            )}
            onClick={() => onClick(colors)}
        >
            {/* {colorDivs} */}
            {colorIndex.map((color, index) => (
                <div
                    key={index}
                    className={cn(colorClasses)}
                    style={{
                        backgroundColor: colors[color as TColor],
                    }}
                ></div>
            ))}
        </div>
    );
};
