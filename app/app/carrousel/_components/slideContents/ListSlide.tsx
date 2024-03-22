import { TBrand } from '@/types/types';
import {
    MutableRefObject,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { CarouselContext } from '../ContextProvider';
import ContentEditable from 'react-contenteditable';
import { Editable } from '@/components/shared/Editable';
import { range } from '@/lib/utils';
import { Check } from 'lucide-react';

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
    console.log('ListSlide console.log!!', paragraphs);
    const { editTitle, editParagraphs, carousel } = useContext(CarouselContext);
    const titleRef = useRef('');
    const paragraphRefs = useMemo(() => {
        return range(0, 5).map((i) => {
            return {
                id: i,
                ref: {} as MutableRefObject<string>,
            };
        });
    }, []);
    const [isHydrated, setIsHydrated] = useState(false);
    paragraphRefs[0].ref = useRef(paragraphs[0]);
    paragraphRefs[1].ref = useRef(paragraphs[1]);
    paragraphRefs[2].ref = useRef(paragraphs[2]);
    paragraphRefs[3].ref = useRef(paragraphs[3]);
    paragraphRefs[4].ref = useRef(paragraphs[4]);

    // We need this to force a re-render when the slide is hydrated so the refs are updated
    // const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (title) titleRef.current = title;
        if (paragraphs[0]) paragraphRefs[0].ref.current = paragraphs[0];
        if (paragraphs[1]) paragraphRefs[1].ref.current = paragraphs[1];
        if (paragraphs[2]) paragraphRefs[2].ref.current = paragraphs[2];
        if (paragraphs[3]) paragraphRefs[3].ref.current = paragraphs[3];
        if (paragraphs[4]) paragraphRefs[4].ref.current = paragraphs[4];
        setIsHydrated(true);
    }, [paragraphRefs, paragraphs, title]);

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
                    display: carousel.slides[slideNumber!].title?.isShown
                        ? 'block'
                        : 'none',
                }}
            />

            <ul
                className='px-2 flex flex-col gap-2'
                style={{
                    fontWeight: 300,
                    display: carousel.slides[slideNumber!].paragraphs[0].isShown
                        ? 'block'
                        : 'none',
                }}
            >
                {paragraphRefs.map((paragraph, index) => {
                    if (paragraph.ref.current === '') return null;
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
                                    <Editable
                                        value={paragraph.ref.current}
                                        setValue={(value) => {
                                            paragraph.ref.current = value;
                                            // }
                                            editParagraphs(
                                                paragraphRefs.map(
                                                    (p) => p.ref.current
                                                )
                                            );
                                        }}
                                        style={{}}
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
