import { TColorPalette, TMode } from '@/types/types';
import Image from 'next/image';

type SlideAvatarProps = {
    imageUrl: string;
    colorPalette: TColorPalette;
};
export function SlideAvatar({ imageUrl, colorPalette }: SlideAvatarProps) {
    return (
        <>
            <div
                className='relative rounded-full border-4 w-24 aspect-square overflow-hidden'
                style={{
                    borderColor: colorPalette.primary,
                }}
            >
                <Image
                    src={imageUrl}
                    alt='avatar'
                    fill
                    className='object-cover'
                />
            </div>
        </>
    );
}
