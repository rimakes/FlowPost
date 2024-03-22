import {
    TColorPalette,
    TFontPalette,
    TMode,
    TOrientation,
} from '@/types/types';
import { SlideAvatar } from './SlideAvatar';
import { CSSProperties } from 'react';

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
            className='flex gap-4'
            style={
                orientation === 'vertical' ? verticalStyles : horizontalStyles
            }
        >
            {/* {children} */}
            <SlideAvatar
                colorPalette={colorPalette}
                mode={mode}
                imageUrl={imageUrl}
            />
            <NameAndHandle
                colorPalette={colorPalette}
                name={name}
                handle={handle}
                orientation={orientation}
            />
        </div>
    );
}

type NameAndHandleProps = {
    name: string;
    handle: string;
    colorPalette: TColorPalette;
    orientation?: TOrientation;
};

export const NameAndHandle = ({
    name,
    handle,
    colorPalette,
    orientation = 'horizontal',
}: NameAndHandleProps) => {
    return (
        <div
            className='flex-col gap-2'
            style={{
                color: colorPalette.font,
                textAlign: orientation === 'vertical' ? 'center' : 'left',
            }}
        >
            {' '}
            <h3
                style={{
                    fontWeight: 700,
                }}
            >
                {name}
            </h3>
            <p
                style={{
                    opacity: 0.7,
                }}
            >
                {handle}
            </p>
        </div>
    );
};
