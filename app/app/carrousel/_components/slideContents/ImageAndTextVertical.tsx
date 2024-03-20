import { Editable } from '@/components/shared/Editable';
import { TBrand, TOrientation } from '@/types/types';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../ContextProvider';

type ImageAndTextVertical = {
    brand: TBrand;
    title: string;
    description: string;
    image: string;
    imageFirst?: boolean;
};

export const ImageAndTextVertical = ({
    brand,
    title,
    description,
    image,
    imageFirst = false,
}: ImageAndTextVertical) => {
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);
    const { editTitle, editDescription } = useContext(CarouselContext);

    useEffect(() => {
        setIsHydrated(true);
    }, []);
    return (
        <div className='flex flex-col h-full p-2 py-6 gap-6 z-10 isolate'>
            <div
                className='relative h-40 overflow-hidden'
                style={{
                    borderRadius: '0.5rem',
                    order: imageFirst ? 0 : 1,
                }}
            >
                <Image
                    src={image}
                    alt='image'
                    fill
                    className='object-cover h-full'
                />
            </div>
            <div>
                {/* TODO: Check if we can do this on the other designs too */}
                <Editable
                    setValue={editTitle}
                    value={title}
                    style={{
                        fontSize: '2rem',
                        lineHeight: 1.1,
                    }}
                />

                <Editable
                    setValue={editDescription}
                    value={description}
                    style={{
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        fontWeight: 200,
                    }}
                />
            </div>
        </div>
    );
};
