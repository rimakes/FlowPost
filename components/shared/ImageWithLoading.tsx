import Image from 'next/image';
import Spinner from '../icons/Spinner';
import { ImageIcon } from 'lucide-react';
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
            <div className='text-primary/50 p-2 flex flex-col gap-4 justify-center items-center h-40 rounded-md border border-dashed'>
                <Spinner />
                <p>Creando imagen...</p>
            </div>
        );
    }
    if (status === 'idle') {
        return (
            <div className='text-primary/50 p-2 flex flex-col gap-4 justify-center items-center h-40 rounded-md border border-dashed'>
                <ImageIcon />
                <p>Genera imágenes con IA</p>
            </div>
        );
    }

    return (
        <div
            className='relative h-40 aspect-square rounded-md overflow-hidden shrink-0'
            onClick={() => onImageSelect(imageUrl)}
        >
            <Image
                src={imageUrl}
                className='object-cover cursor-pointer'
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
