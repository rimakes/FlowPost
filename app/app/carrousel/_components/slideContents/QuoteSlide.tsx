import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import SimpleEditor from '@/components/simple-editor/SimpleEditor';
import { useContext } from 'react';

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
        editTitle,
        editDescription,
        carousel: { slides },
    } = useContext(CarouselContext);
    // We need this to force a re-render when the slide is hydrated so the refs are updated

    const isTittleShown = slides[slideNumber!].title?.isShown;
    const isParagraphShown = slides[slideNumber!].paragraphs[0]?.isShown;

    return (
        <div className='flex flex-col gap-2 h-full w-full z-10 justify-center -mt-6'>
            <SimpleEditor
                defaultValue={title}
                onDebouncedUpdate={editTitle}
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
