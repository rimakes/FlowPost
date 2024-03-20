import { TBrand } from '@/types/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import ContentEditable from 'react-contenteditable';
import { Editable } from '@/components/shared/Editable';

type ListSlideProps = {
    brand: TBrand;
    title: string;
    paragraphs: string[];
    listFirstNumber: number;
};

export const ListSlide = ({
    brand,
    paragraphs,
    title,
    listFirstNumber = 1,
}: ListSlideProps) => {
    console.log('ListSlide', paragraphs);
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
                {paragraphsRef.current.map((paragraph, index) => (
                    <li key={paragraph}>
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
                                {listFirstNumber + index}
                            </span>
                            <div>
                                <Editable
                                    value={paragraph}
                                    setValue={(value) => {
                                        // if value = '' remove the paragraph from the array
                                        if (value === '') {
                                            paragraphsRef.current.splice(
                                                index,
                                                1
                                            );
                                        } else {
                                            paragraphsRef.current[index] =
                                                value;
                                        }
                                        editParagraphs(paragraphsRef.current);
                                    }}
                                    style={{}}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
