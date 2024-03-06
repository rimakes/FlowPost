import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import { Content } from 'next/font/google';
import { useRef, useEffect, useContext } from 'react';
import ContentEditable from 'react-contenteditable';

type TextOnlySlideProps = {
    title: string;
    subtitle?: string;
};

export const TextOnlySlide = ({ title, subtitle }: TextOnlySlideProps) => {
    // const paragraphRef = useRef('');
    const { editTitle, editDescription } = useContext(CarouselContext);

    // REVIEW: do we really need this?
    // useEffect(() => {
    //     paragraphRef.current = text;
    // }, [text]);

    return (
        <div className='flex flex-col gap-2 h-full w-full z-10 justify-center -mt-6'>
            <ContentEditable
                onChange={(event) => {
                    // paragraphRef.current = event.target.value;
                    editTitle(event.target.value);
                }}
                html={title}
                className='text-[2em]
                    focus:outline-none focus:ring-0 focus:border-transparent
                    '
                // style={{
                //     display: hasParagraph ? 'block' : 'none',
                // }}
                style={{
                    fontSize: '2.5rem',
                    lineHeight: 1.1,
                }}
            />
            {subtitle && (
                <ContentEditable
                    onChange={(event) => {
                        // paragraphRef.current = event.target.value;
                        editDescription(event.target.value);
                    }}
                    html={subtitle}
                    className='text-[1rem] focus:outline-none focus:ring-0 focus:border-transparent'
                    style={{
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        fontWeight: 200,
                    }}
                />
            )}
        </div>
    );
};
