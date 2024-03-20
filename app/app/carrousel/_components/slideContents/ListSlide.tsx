import { TBrand } from '@/types/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import ContentEditable from 'react-contenteditable';

type ListSlideProps = {
    brand: TBrand;
    title: string;
    paragraphs: string[];
};

export const ListSlide = ({ brand, paragraphs, title }: ListSlideProps) => {
    const { editTitle, editParagraphs } = useContext(CarouselContext);
    const titleRef = useRef('');
    const paragraphsRef = useRef(['']);
    // We need this to force a re-render when the slide is hydrated so the refs are updated
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (title) titleRef.current = title;
        if (paragraphs) paragraphsRef.current = paragraphs;

        setIsHydrated(true);
    }, [paragraphs, title]);

    return (
        <div className='flex flex-col gap-4 h-full p-4 z-10'>
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
                    fontSize: '3rem',
                    lineHeight: 1,
                }}
            />

            <ul
                className='px-6 flex flex-col gap-2'
                style={{
                    fontWeight: 300,
                }}
            >
                {paragraphsRef.current.map((item, index) => {
                    return (
                        <li key={index}>
                            <div
                                className='flex gap-2 items-start'
                                style={{
                                    fontSize: '1.2rem',
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <div>
                                    <ContentEditable
                                        onChange={(event) => {
                                            paragraphsRef.current[index] =
                                                event.target.value;
                                            editParagraphs(
                                                paragraphsRef.current
                                            );
                                        }}
                                        html={paragraphsRef.current[index]}
                                        className='text-[1rem] focus:outline-none focus:ring-0 focus:border-transparent'
                                        style={{
                                            fontSize: '1rem',
                                            lineHeight: 1.5,
                                            fontWeight: 200,
                                        }}
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
