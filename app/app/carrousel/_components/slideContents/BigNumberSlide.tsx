import { TBrand } from '@/types/types';
import { useRef, useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import ContentEditable from 'react-contenteditable';
import { Editable } from '@/components/shared/Editable';

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
    const { carousel, editTitle, editDescription, editTagline } =
        useContext(CarouselContext);

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
                <Editable
                    value={title}
                    setValue={editTitle}
                    className='text-[2em]
                 focus:outline-none focus:ring-0 focus:border-transparent
                 '
                    style={{
                        fontSize: '5em',
                        fontFamily: brand.fontPalette.primary,
                        display: carousel.slides[slideNumber!].title?.isShown
                            ? 'block'
                            : 'none',
                    }}
                />

                <Editable
                    value={tagline}
                    setValue={editTagline}
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
