import { TColorPalette, TMode } from '@/types/types';
import Image from 'next/image';

type AvatarProps = {
    mode: TMode;
    imageUrl: string;
    colorPalette: TColorPalette;
};
export function Avatar({ mode, imageUrl, colorPalette }: AvatarProps) {
    return (
        <div
            className='relative rounded-full border-4 w-24 aspect-square overflow-hidden'
            style={{
                borderColor:
                    mode === 'light'
                        ? `${colorPalette.primary}`
                        : `${colorPalette.accent}`,
            }}
        >
            <Image src={imageUrl} alt='avatar' fill className='object-cover' />
        </div>
    );
}
