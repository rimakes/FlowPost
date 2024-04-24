import { TArrayOfRefs, TCarousel } from '@/types/types';
import { RefObject, createContext } from 'react';

const INITIAL_STATE = {
    arrayOfRefs: [] as TArrayOfRefs,
    addRef: (ref: RefObject<HTMLDivElement>, index: number) => {},
    nextSlide: () => {},
    previousSlide: () => {},
    currentSlide: 0 as number,
};

export const CarouselContext = createContext({
    ...INITIAL_STATE,
});

export function CarouselProvider({
    children,
    initialCarousel,
}: {
    children: React.ReactNode;
    initialCarousel: TCarousel;
}) {}
