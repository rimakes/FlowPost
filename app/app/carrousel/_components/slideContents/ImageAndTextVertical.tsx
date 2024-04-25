import { TBrand } from '@/types/types';
import Image from 'next/image';
import { useContext } from 'react';
import { CarouselContext } from '../CarouselProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type ImageAndTextVertical = {
    brand: TBrand;
    title: string;
    description: string;
    image: string;
    imageFirst?: boolean;
    slideNumber: number;
};

export const ImageAndTextVertical = ({
    brand,
    title,
    description,
    image,
    imageFirst = false,
    slideNumber,
}: ImageAndTextVertical) => {
    const {
        editDescription,
        carousel: { slides },
        setSlideContent,
    } = useContext(CarouselContext);

    const isTitleShown = slides[slideNumber].title?.isShown;
    const isDescriptionShown = slides[slideNumber].paragraphs[0]?.isShown;

    return (
        <div className='isolate z-10 flex h-full flex-col gap-6 p-2 py-6'>
            <div
                className='relative h-40 overflow-hidden'
                style={{
                    borderRadius: '0.5rem',
                    order: imageFirst ? 0 : 1,
                }}
            >
                <Image
                    src={image || '/images/placeholders/slide-image.webp'}
                    alt='image'
                    fill
                    className='h-full object-cover'
                />
            </div>
            <div>
                {/* TODO: Check if we can do this on the other designs too */}
                <SimpleEditor
                    onDebouncedUpdate={(string) => {
                        setSlideContent('title', string);
                    }}
                    defaultValue={title}
                    slideElement='title'
                    isShown={isTitleShown}
                />
                <SimpleEditor
                    onDebouncedUpdate={editDescription}
                    defaultValue={description}
                    slideElement='paragraph'
                    isShown={isDescriptionShown}
                />
            </div>
        </div>
    );
};
