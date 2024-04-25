import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import Spinner from '../icons/Spinner';
import { TStatus } from '@/types/types';

type ImageWithLoading = {
    status: TStatus;
    imageUrl: string;
    dataUrl: string;
    onImageSelect: (url: string) => void;
};

export const ImageWithLoading = ({
    status,
    imageUrl,
    dataUrl,
    onImageSelect,
}: ImageWithLoading) => {
    if (status === 'loading') {
        return (
            <div className='flex h-40 flex-col items-center justify-center gap-4 rounded-md border border-dashed p-2 text-primary/50'>
                <Spinner />
                <p>Creando imagen...</p>
            </div>
        );
    }
    if (status === 'idle') {
        return (
            <div className='flex h-40 flex-col items-center justify-center gap-4 rounded-md border border-dashed p-2 text-primary/50'>
                <ImageIcon />
                <p>Genera imágenes con IA</p>
            </div>
        );
    }

    return (
        <div
            className='relative aspect-square h-40 shrink-0 overflow-hidden rounded-md'
            onClick={() => onImageSelect(imageUrl)}
        >
            <Image
                src={imageUrl}
                className='cursor-pointer object-cover'
                alt=''
                fill
                // loader={({ src }) => src}
                quality={60}
                placeholder={dataUrl !== '' ? 'blur' : undefined}
                blurDataURL={dataUrl !== '' ? dataUrl : undefined}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
                priority={true}
            />
        </div>
    );
};
