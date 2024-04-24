import { TBrand } from '@/types/types';
import Image from 'next/image';
import { useContext } from 'react';
import { CarouselContext } from '../ContextProvider';
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
