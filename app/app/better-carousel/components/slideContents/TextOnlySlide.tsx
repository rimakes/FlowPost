import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import { Content } from 'next/font/google';
import { useRef, useEffect, useContext } from 'react';
import ContentEditable from 'react-contenteditable';

type TextOnlySlideProps = {
    text: string;
    subtitle?: string;
};

export const TextOnlySlide = ({ text, subtitle }: TextOnlySlideProps) => {
    const paragraphRef = useRef('');
    const { editTitle } = useContext(CarouselContext);

    useEffect(() => {
        paragraphRef.current = text;
    }, [text]);

    return (
        <div className='flex flex-col gap-2 h-full w-full z-10 justify-center -mt-6'>
            <ContentEditable
                onChange={(event) => {
                    console.log(event.target.value);
                    paragraphRef.current = event.target.value;
                    editTitle(event.target.value);
                }}
                html={text}
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
            {/* <h1
                style={{
                    fontSize: '2.5rem',
                    lineHeight: 1.1,
                }}
            >
                {text}
            </h1> */}
            {subtitle && (
                <ContentEditable
                    onChange={(event) => {
                        console.log(event.target.value);
                        paragraphRef.current = event.target.value;
                        editTitle(event.target.value);
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
