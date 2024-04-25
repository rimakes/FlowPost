import Image from 'next/image';
import { ArrowLeftIcon, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { CarouselContext } from '../CarouselProvider';
import { TBrand } from '@/types/types';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type ImageAndTextVertical = {
    brand: TBrand;
    title: string;
    description: string;
    image: string;
    imageLocation?: 'left' | 'right';
    imageCaption?: string;
};

export const ImageAndTextHorizontal = ({
    brand,
    title,
    description,
    image,
    imageLocation = 'right',
    imageCaption,
}: ImageAndTextVertical) => {
    const ArrowElement = imageLocation === 'right' ? ArrowRight : ArrowLeftIcon;

    const {
        carousel: { slides },
        editParagraphN,
        setSlideContent,
    } = useContext(CarouselContext);

    const isTitleShown = slides[0].title?.isShown;
    const isDescriptionShown = slides[0].paragraphs[0]?.isShown;
    const editFirstParagraph = editParagraphN.bind(null, 0);

    return (
        <div className='isolate z-10 flex h-full flex-col gap-6 p-2 py-6'>
            <div>
                <SimpleEditor
                    defaultValue={title}
                    onDebouncedUpdate={(string) => {
                        setSlideContent('title', string);
                    }}
                    slideElement='title'
                    isShown={isTitleShown}
                />
                <SimpleEditor
                    defaultValue={description}
                    onDebouncedUpdate={editFirstParagraph}
                    slideElement='paragraph'
                    isShown={isDescriptionShown}
                />
            </div>
            <div
                className='flex items-center'
                style={{
                    flexDirection:
                        imageLocation === 'left' ? 'row' : 'row-reverse',
                }}
            >
                <div className='relative w-fit'>
                    <SlideGradientBlob brand={brand} className='blur-3xl' />
                    <div
                        className='relative h-44 w-44 overflow-hidden'
                        style={{
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Image
                            src={
                                image || '/images/placeholders/slide-image.webp'
                            }
                            alt='image'
                            fill
                            className='h-full object-cover'
                        />
                    </div>
                </div>
                <ArrowElement
                    size={48}
                    style={{
                        color: brand.colorPalette.accent,
                        marginRight: imageLocation === 'right' ? '-1rem' : 0,
                        marginLeft: imageLocation === 'left' ? '-1rem' : 0,
                        zIndex: 10,
                    }}
                />

                <SimpleEditor
                    defaultValue={imageCaption}
                    // onDebouncedUpdate={editParagraphs}
                    slideElement='imageCaption'
                    isShown={true}
                />
            </div>
        </div>
    );
};
