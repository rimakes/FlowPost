import { TBrand } from '@/types/types';
import { useContext } from 'react';
import { CarouselContext } from '../CarouselProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

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
    const {
        carousel: { slides },
        setSlideContent,
    } = useContext(CarouselContext);

    const isTittleShown = slides[slideNumber!].title?.isShown;
    const isTaglineShown = slides[slideNumber!].tagline?.isShown;

    return (
        <>
            <div
                className='absolute w-full h-full top-0 left-0 z-10'
                style={{
                    fontSize: '40em',
                    color: brand.colorPalette.accent,
                    opacity: 0.4,
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
            <div>
                <SimpleEditor
                    className='z-10'
                    onDebouncedUpdate={(string) =>
                        setSlideContent('title', string)
                    }
                    slideElement='title'
                    defaultValue={title}
                    isShown={isTittleShown}
                />

                <SimpleEditor
                    className='z-10'
                    onDebouncedUpdate={(string) =>
                        setSlideContent('tagline', string)
                    }
                    slideElement='tagline'
                    defaultValue={tagline}
                    isShown={isTaglineShown}
                />
            </div>
        </>
    );
};
