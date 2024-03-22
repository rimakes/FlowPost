import { TBrand } from '@/types/types';
import { useRef, useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import ContentEditable from 'react-contenteditable';

type BigNumberSlideProps = {
    title: string;
    brand: TBrand;
    bigCharacter: string;
    tagline: string;
    slideNumber: number;
};

export const BigNumberSlide = ({
    brand,
    bigCharacter,
    title,
    tagline,
    slideNumber,
}: BigNumberSlideProps) => {
    const titleRef = useRef('');
    const taglineRef = useRef('');
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);

    const { editTitle, editDescription, editTagline, carousel } =
        useContext(CarouselContext);

    useEffect(() => {
        if (title) titleRef.current = title;
        if (tagline) taglineRef.current = tagline;
        setIsHydrated(true);
    }, [tagline, title]);

    return (
        <>
            <div
                className='absolute w-full h-full top-0 left-0'
                style={{
                    fontSize: '40em',
                    color: brand.colorPalette.accent,
                    opacity: 0.2,
                }}
            >
                <div
                    id='number'
                    className='absolute top-0 right-0 -z-20'
                    style={{
                        fontWeight: 700,
                        lineHeight: 1,
                    }}
                >
                    {bigCharacter}
                </div>
            </div>
            <div
                className='flex-grow  flex flex-col justify-center z-10'
                style={{
                    alignItems: 'start',
                }}
            >
                <ContentEditable
                    onChange={(event) => {
                        titleRef.current = event.target.value;
                        editTitle(event.target.value);
                    }}
                    html={titleRef.current}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    // style={{
                    //     display: hasParagraphs ? 'block' : 'none',
                    // }}
                    style={{
                        fontSize: '5em',
                        fontFamily: brand.fontPalette.primary,
                        display: carousel.slides[slideNumber!].title?.isShown
                            ? 'block'
                            : 'none',
                    }}
                />

                <ContentEditable
                    onChange={(event) => {
                        taglineRef.current = event.target.value;
                        editTagline(event.target.value);
                    }}
                    html={taglineRef.current}
                    className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                    style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.1,
                        display: carousel.slides[slideNumber!].tagline?.isShown
                            ? 'block'
                            : 'none',
                    }}
                />
            </div>
        </>
    );
};
