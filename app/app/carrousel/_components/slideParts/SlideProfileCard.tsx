'use client';

import {
    TColorPalette,
    TFontPalette,
    TMode,
    TOrientation,
} from '@/types/types';
import { SlideAvatar } from './SlideAvatar';
import { CSSProperties } from 'react';
import { NameAndHandle } from './components/HandleAndName';

type SlideProfileCardProps = {
    colorPalette: TColorPalette;
    fontPalette: TFontPalette;
    imageUrl: string;
    name: string;
    handle: string;
    // children: React.ReactNode;
    orientation?: TOrientation;
    mode?: TMode;
};
export function SlideProfileCard({
    colorPalette,
    fontPalette,
    imageUrl,
    name,
    handle,
    // children,
    orientation = 'horizontal',
    mode = 'light',
}: SlideProfileCardProps) {
    const verticalStyles: CSSProperties = {
        flexDirection: 'column',
        alignItems: 'center',
    };
    const horizontalStyles: CSSProperties = {
        flexDirection: 'row',
        alignItems: 'center',
    };

    return (
        <div
            className='z-10 flex gap-4'
            style={
                orientation === 'vertical' ? verticalStyles : horizontalStyles
            }
        >
            {/* {children} */}
            <SlideAvatar colorPalette={colorPalette} imageUrl={imageUrl} />
            <NameAndHandle
                colorPalette={colorPalette}
                name={name}
                handle={handle}
                orientation={orientation}
            />
        </div>
    );
}
