import { useContext, useRef } from 'react';
import { Check } from 'lucide-react';
import { CarouselContext } from '../CarouselProvider';
import { TBrand } from '@/types/types';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

type ListSlideProps = {
    brand: TBrand;
    title: string;
    paragraphs: string[];
    listFirstNumber: number;
    slideNumber: number;
};

export const ListSlide = ({
    brand,
    paragraphs,
    title,
    listFirstNumber = 1,
    slideNumber,
}: ListSlideProps) => {
    const {
        carousel,
        carousel: { slides },
        editParagraphN,
        setSlideContent,
    } = useContext(CarouselContext);
    const titleRef = useRef('');

    const paragraphArray =
        paragraphs.length === 0
            ? []
            : paragraphs.map((p, index) => {
                  return {
                      id: index, // TODO: use uuid
                      content: p,
                      editParagraph: editParagraphN.bind(null, index),
                  };
              });

    // const isTitleShown = slides[slideNumber!].title?.isShown;

    return (
        <div className='z-10 flex h-full flex-col gap-4 p-4'>
            <SimpleEditor
                defaultValue={title}
                onDebouncedUpdate={(string) => {
                    setSlideContent('title', string);
                }}
                slideElement='title'
                isShown={carousel.slides[slideNumber!].title?.isShown}
            />
            <SimpleEditor
                defaultValue={carousel.slides[slideNumber!].tagline?.content}
                onDebouncedUpdate={(string) => {
                    setSlideContent('tagline', string);
                }}
                slideElement='tagline'
                isShown={carousel.slides[slideNumber!].tagline?.isShown}
            />

            <ul
                className='flex flex-col gap-2 px-2'
                style={{
                    fontWeight: 300,
                    display: slides[slideNumber!].paragraphs[0].isShown
                        ? 'block'
                        : 'none',
                }}
            >
                {paragraphArray.map((paragraph, index) => {
                    if (paragraphArray[index]?.content === '') return null;
                    return (
                        <li key={paragraph.id}>
                            <div
                                className='flex items-start gap-2'
                                style={{
                                    fontSize: '1.2rem',
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    <Check />
                                </span>
                                <div>
                                    <SimpleEditor
                                        defaultValue={
                                            paragraphArray[index].content
                                        }
                                        key={paragraphArray[index].id}
                                        onDebouncedUpdate={
                                            paragraphArray[index].editParagraph
                                        }
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
