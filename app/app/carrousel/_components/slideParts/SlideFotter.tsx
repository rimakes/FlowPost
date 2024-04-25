import { TColorPalette, TFontPalette, TMode } from '@/types/types';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { NameAndHandle } from './components/HandleAndName';

type SlideFotterProps = {
    imageUrl: string;
    colorPalette: TColorPalette;
    fontPalette: TFontPalette;
    name: string;
    handle: string;
    mode: TMode;
    swipeLabel: ReactNode;
    className?: string;
};
export function SlideFotter({
    imageUrl,
    colorPalette,
    className,
    fontPalette,
    name,
    handle,
    mode,
    swipeLabel = null,
}: SlideFotterProps) {
    return (
        <div
            className={cn(
                `flex items-center justify-between text-xs`,
                className
            )}
            style={{
                color: colorPalette.font,
            }}
        >
            <div className='flex items-center gap-4'>
                <div className='relative h-10 w-10'>
                    <Image
                        src={imageUrl}
                        alt='avatar'
                        fill
                        className='object-cover'
                    />
                </div>
                <div
                    className='w-6'
                    style={{
                        borderTop: `1px solid ${colorPalette.font}`,
                    }}
                />
                <NameAndHandle
                    colorPalette={colorPalette}
                    name={name}
                    handle={handle}
                />
            </div>
            <div>{swipeLabel}</div>
        </div>
    );
}
