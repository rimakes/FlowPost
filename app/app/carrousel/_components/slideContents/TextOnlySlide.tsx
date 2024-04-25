import { useContext } from 'react';
import { CarouselContext } from '@/app/app/carrousel/_components/CarouselProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';

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
    const {
        editDescription,
        carousel: { slides },
        setSlideContent,
    } = useContext(CarouselContext);
    // We need this to force a re-render when the slide is hydrated so the refs are updated

    const isTittleShown = slides[slideNumber!].title?.isShown;
    const isParagraphShown = slides[slideNumber!].paragraphs[0]?.isShown;

    return (
        <div className='z-10 -mt-6 flex h-full w-full flex-col justify-center gap-2'>
            <SimpleEditor
                defaultValue={title}
                onDebouncedUpdate={(string) => {
                    setSlideContent('title', string);
                }}
                className=''
                slideElement='title'
                isShown={isTittleShown}
            />

            <SimpleEditor
                defaultValue={paragraphs![0]}
                onDebouncedUpdate={editDescription}
                className=''
                slideElement='paragraph'
                isShown={isParagraphShown}
            />
        </div>
    );
};
