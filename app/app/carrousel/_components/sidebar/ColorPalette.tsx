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
                `h-4 border rounded-l-md overflow-hidden rounded-r-md w-full flex`,
                orientation === 'vertical'
                    ? 'flex-col h-16 min-w-[1rem]'
                    : 'flex-row min-w-[4rem] min-h-[1rem]',
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
