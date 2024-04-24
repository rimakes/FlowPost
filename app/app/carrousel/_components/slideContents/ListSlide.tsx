import { TBrand } from '@/types/types';
import { useContext, useRef } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Check } from 'lucide-react';
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
        <div className='flex flex-col gap-4 h-full p-4 z-10'>
            <SimpleEditor
                defaultValue={title}
                onDebouncedUpdate={(string) => {
                    setSlideContent('title', string);
                }}
                slideElement='title'
                isShown={true}
            />

            <ul
                className='px-2 flex flex-col gap-2'
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
