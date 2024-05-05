import Image from 'next/image';
import { ComponentPropsWithoutRef } from 'react';

interface PostImageProps extends ComponentPropsWithoutRef<typeof Image> {
    src: string;
    alt: string;
}
export function PostImage({ src, alt, ...props }: PostImageProps) {
    return (
        <div className='relative my-8 aspect-[1024/560] w-full max-w-[80ch] overflow-hidden rounded-3xl'>
            <Image
                src={src}
                alt={alt}
                {...props}
                fill
                className='object-cover'
            />
            ;
        </div>
    );
}
