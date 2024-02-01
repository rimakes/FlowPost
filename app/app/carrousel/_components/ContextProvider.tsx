'use client';

import {
    createContext,
    use,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { fakeCarousel } from '@/fakeData/fake-carousel';
import { deepCopy } from '@/lib/utils';
import { TColorPalette } from './Sidebar';

const INITIAL_STATE = {
    currentSlide: 0 as number,
    nextSlide: () => {},
    previousSlide: () => {},
    carousel: fakeCarousel,
    editTitle: (newTitle: string) => {},
    editTagline: (newTagline: string) => {},
    editDescription: (newDescription: string) => {},
    editImage: (newImage: string) => {},
    editName: (newName: string) => {},
    editHandle: (newHandle: string) => {},
    setCurrentSlideTo: (newSlide: number) => {},
    toggleAlternateColors: () => {},
    toggleShowCounter: () => {},
    toggleShowSwipeLabel: () => {},
    toggleShowAuthor: () => {},
    toggleSlideHasTitle: () => {},
    toggleSlideHasTagline: () => {},
    toggleSlideHasParagraph: () => {},
    moveCurrentSlideToRight: () => {},
    moveCurrentSlideToLeft: () => {},
    addSlideToRight: () => {},
    deleteCurrentSlide: () => {},
    setColorPalette: (colors: TColorPalette) => {},
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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carousel, setCarousel] = useState(fakeCarousel);

    const nextSlide = useCallback(() => {
        if (currentSlide === carousel.slides.length - 1) return;
        setCurrentSlide((currentSlide) => currentSlide + 1);
    }, [carousel.slides.length, currentSlide]);

    const previousSlide = useCallback(() => {
        if (currentSlide === 0) return;
        setCurrentSlide((currentSlide) => currentSlide - 1);
    }, [currentSlide]);
    // When this provider is loaded, we will activate the "Carousel shortcuts": Right and left arrows to navigate between slides.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') nextSlide();
            if (event.key === 'ArrowLeft') previousSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, previousSlide]);

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

    const setCurrentSlideTo = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    const toggleAlternateColors = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.alternateColors =
            !newCarousel.settings.alternateColors;
        setCarousel(newCarousel);
    };

    const toggleShowCounter = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.showCounter = !newCarousel.settings.showCounter;
        setCarousel(newCarousel);
    };

    const toggleShowSwipeLabel = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.showSwipeLabel =
            !newCarousel.settings.showSwipeLabel;
        setCarousel(newCarousel);
    };

    const toggleShowAuthor = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.showAuthor = !newCarousel.settings.showAuthor;
        setCarousel(newCarousel);
    };

    const toggleSlideHasTitle = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].hasTitle =
            !newCarousel.slides[currentSlide].hasTitle;
        setCarousel(newCarousel);
    };

    const toggleSlideHasTagline = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].hasTagline =
            !newCarousel.slides[currentSlide].hasTagline;
        setCarousel(newCarousel);
    };

    const toggleSlideHasParagraph = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].hasParagraph =
            !newCarousel.slides[currentSlide].hasParagraph;
        setCarousel(newCarousel);
    };

    const moveCurrentSlideToRight = () => {
        const newCarousel = deepCopy(carousel);
        const slideToMove = newCarousel.slides[currentSlide];
        const nextSlide = newCarousel.slides[currentSlide + 1];
        newCarousel.slides[currentSlide] = nextSlide;
        newCarousel.slides[currentSlide + 1] = slideToMove;
        setCarousel(newCarousel);
        setCurrentSlide(currentSlide + 1);
    };

    const moveCurrentSlideToLeft = () => {
        const newCarousel = deepCopy(carousel);
        const slideToMove = newCarousel.slides[currentSlide];
        const previousSlide = newCarousel.slides[currentSlide - 1];
        newCarousel.slides[currentSlide] = previousSlide;
        newCarousel.slides[currentSlide - 1] = slideToMove;
        setCarousel(newCarousel);
        setCurrentSlide(currentSlide - 1);
    };

    const addSlideToRight = () => {
        const newCarousel = deepCopy(carousel);
        console.log(newCarousel.slides.length);
        const newSlide = deepCopy(newCarousel.slides[currentSlide]);
        newCarousel.slides.splice(currentSlide + 1, 0, newSlide);
        console.log(newCarousel.slides.length);
        setCarousel(newCarousel);
        setCurrentSlide(currentSlide + 1);
    };

    const deleteCurrentSlide = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides.splice(currentSlide, 1);
        setCarousel(newCarousel);
        if (currentSlide === newCarousel.slides.length) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const setColorPalette = (colors: TColorPalette) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.colorPalette.primaryColor = colors.font;
        newCarousel.colorPalette.backgroundColor = colors.background;
        newCarousel.colorPalette.secondaryColor = colors.accent;
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
                setCurrentSlideTo,
                toggleAlternateColors,
                toggleShowCounter,
                toggleShowSwipeLabel,
                toggleShowAuthor,
                toggleSlideHasTitle,
                toggleSlideHasTagline,
                toggleSlideHasParagraph,
                moveCurrentSlideToRight,
                moveCurrentSlideToLeft,
                addSlideToRight,
                deleteCurrentSlide,
                setColorPalette,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
}
