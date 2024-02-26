import { cn } from '@/lib/utils';
import { TColorPalette } from '@/types/types';

type ColorPaletteProps = {
    colors: TColorPalette;
    onClick: (colorPalette: TColorPalette) => void;
    className?: string;
};

export const ColorPalette = ({
    colors: { font, background, accent },
    onClick,
    className,
}: ColorPaletteProps) => {
    const colorClasses = 'w-1/3 h-full border-none outline-none';

    return (
        <div
            className={cn(
                `h-4 border rounded-l-md overflow-hidden rounded-r-md w-full flex min-w-[4rem]`,
                className
            )}
            onClick={() => onClick({ font, background, accent })}
        >
            <div
                className={colorClasses}
                style={{
                    backgroundColor: font,
                }}
            ></div>
            <div
                className={colorClasses}
                style={{
                    backgroundColor: background,
                }}
            />
            <div
                className={colorClasses}
                style={{
                    backgroundColor: accent,
                }}
            />
        </div>
    );
};
