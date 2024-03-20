import { TBrand, TOrientation } from '@/types/types';
import Image from 'next/image';
import { SlideGradientBlob } from '../slideParts/SlideGradientBlob';
import { ArrowLeftIcon, ArrowRight } from 'lucide-react';
import ContentEditable from 'react-contenteditable';
import { useContext, useEffect, useRef, useState } from 'react';
import image from 'next/image';
import { CarouselContext } from '../ContextProvider';

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
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const titleRef = useRef('');
    const paragraphsRef = useRef(['']);
    const imageCaptionRef = useRef('');
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);

    const { editTitle, editParagraphs } = useContext(CarouselContext);

    useEffect(() => {
        if (title) titleRef.current = title;
        if (description) paragraphsRef.current = [description];
        if (imageCaption) imageCaptionRef.current = imageCaption;
        setIsHydrated(true);
    }, [description, imageCaption, title]);

    return (
        <div className='flex flex-col h-full p-2 py-6 gap-6 isolate z-10'>
            <div>
                <ContentEditable
                    onChange={(event) => {
                        titleRef.current = event.target.value;
                        editTitle(event.target.value);
                    }}
                    html={titleRef.current}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    style={{
                        fontSize: '2rem',
                        lineHeight: 1.1,
                    }}
                />

                <ContentEditable
                    onChange={(event) => {
                        paragraphsRef.current[0] = event.target.value;
                        editParagraphs([event.target.value]);
                    }}
                    html={paragraphsRef.current[0]}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    style={{
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        fontWeight: 200,
                    }}
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
                        className='relative h-44 overflow-hidden w-44'
                        style={{
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Image
                            src={image}
                            alt='image'
                            fill
                            className='object-cover h-full'
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

                <ContentEditable
                    onChange={(event) => {
                        imageCaptionRef.current = event.target.value;
                        // editimageCaption([event.target.value]);
                    }}
                    html={imageCaptionRef.current}
                />
                {/* <p>This is provision of the image caption</p> */}
            </div>
        </div>
    );
};
