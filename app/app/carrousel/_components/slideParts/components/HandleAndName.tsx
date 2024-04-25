import { useContext } from 'react';
import { CarouselContext } from '../../CarouselProvider';
import { TColorPalette, TOrientation } from '@/types/types';

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
    const { carousel, currentSlide } = useContext(CarouselContext);
    const showName = carousel?.settings.showName;
    const showHandle = carousel?.settings.showHandle;

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
                    display: showName ? 'block' : 'none',
                }}
            >
                {name}
            </h3>
            <p
                style={{
                    opacity: 0.7,
                    display: showHandle ? 'block' : 'none',
                }}
            >
                {handle}
            </p>
        </div>
    );
};
