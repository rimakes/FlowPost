import Image from 'next/image';
import { TColorPalette } from '@/types/types';

type SlideAvatarProps = {
    imageUrl: string;
    colorPalette: TColorPalette;
};
export function SlideAvatar({ imageUrl, colorPalette }: SlideAvatarProps) {
    return (
        <>
            <div
                className='relative aspect-square w-24 overflow-hidden rounded-full border-4 bg-transparent'
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
