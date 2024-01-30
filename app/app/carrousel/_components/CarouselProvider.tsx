'use client';

import { createContext, use, useContext, useState } from 'react';
import { Slide } from '../page';
import { fakeCarousel } from '@/fakeData/fake-carousel';
import { deepCopy } from '@/lib/utils';

const INITIAL_STATE = {
    currentSlide: 1 as number,
    nextSlide: () => {},
    previousSlide: () => {},
    carousel: fakeCarousel,
    editTitle: (newTitle: string) => {},
    editTagline: (newTagline: string) => {},
    editDescription: (newDescription: string) => {},
    editImage: (newImage: string) => {},
    editName: (newName: string) => {},
    editHandle: (newHandle: string) => {},
};

// REVIEW: I think exporting this is causing a full reload of the app.
// Something I didn't noticed before is that it only force full reload when you save the problematic file.
export const CarouselContext = createContext({
    ...INITIAL_STATE,
});

type CarouselContextProviderProps = { children: React.ReactNode };
export function CarouselContextProvider({
    children,
}: CarouselContextProviderProps) {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [carousel, setCarousel] = useState(fakeCarousel);

    const nextSlide = () => {
        if (currentSlide === carousel.slides.length - 1) return;
        setCurrentSlide((currentSlide) => currentSlide + 1);
    };

    const previousSlide = () => {
        if (currentSlide === 0) return;
        setCurrentSlide((currentSlide) => currentSlide - 1);
    };

    const editTitle = (newTitle: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].title = newTitle;
        setCarousel(newCarousel);
    };

    const editTagline = (newTagline: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].tagline = newTagline;
        setCarousel(newCarousel);
    };

    const editDescription = (newDescription: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].description = newDescription;
        setCarousel(newCarousel);
    };

    const editImage = (newImage: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].image = newImage;
        setCarousel(newCarousel);
    };

    const editName = (newName: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.authorName = newName;
        setCarousel(newCarousel);
    };

    const editHandle = (newHandle: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.authorHandle = newHandle;
        setCarousel(newCarousel);
    };

    return (
        <CarouselContext.Provider
            value={{
                currentSlide,
                nextSlide,
                previousSlide,
                carousel,
                editTitle,
                editTagline,
                editDescription,
                editImage,
                editName,
                editHandle,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
}
