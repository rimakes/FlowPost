import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import { Content } from 'next/font/google';
import { useRef, useEffect, useContext, useState } from 'react';
import ContentEditable from 'react-contenteditable';

type TextOnlySlideProps = {
    title: string;
    paragraphs?: string[];
    slideNumber: number;
};

export const TextOnlySlide = ({
    title,
    paragraphs,
    slideNumber,
}: TextOnlySlideProps) => {
    const titleRef = useRef('');
    const paragraphRef = useRef('');
    const { editTitle, editDescription, editTagline, carousel } =
        useContext(CarouselContext);
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);

    // REVIEW: do we really need this?
    useEffect(() => {
        if (title) titleRef.current = title;
        if (paragraphs) paragraphRef.current = paragraphs[0];
        setIsHydrated(true);
    }, [paragraphs, title]);

    return (
        <div className='flex flex-col gap-2 h-full w-full z-10 justify-center -mt-6'>
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
                    fontSize: '2.5rem',
                    lineHeight: 1.1,
                    display: carousel.slides[slideNumber!].title?.isShown
                        ? 'block'
                        : 'none',
                }}
            />
            {paragraphs && (
                <ContentEditable
                    onChange={(event) => {
                        paragraphRef.current = event.target.value;
                        editTagline(event.target.value);
                    }}
                    html={paragraphRef.current}
                    className='text-[1rem] focus:outline-none focus:ring-0 focus:border-transparent'
                    style={{
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        fontWeight: 200,
                        display: carousel.slides[slideNumber!].paragraphs[0]
                            ?.isShown
                            ? 'block'
                            : 'none',
                    }}
                />
            )}
        </div>
    );
};
