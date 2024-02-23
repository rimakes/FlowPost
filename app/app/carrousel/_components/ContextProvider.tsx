'use client';

import {
    MutableRefObject,
    RefObject,
    createContext,
    createRef,
    use,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { fakeCarousel } from '@/app/app/carrousel/_components/const';
import { deepCopy } from '@/lib/utils';
import { AspectRatio } from '@prisma/client';
import {
    TAspectRatioEnum,
    TCarousel,
    TColorPalette,
    TDecorationId,
    TFontPallete,
    TLinkedinPost,
} from '@/types/types';

export type TArrayOfRefs = RefObject<HTMLDivElement>[];

const INITIAL_STATE = {
    arrayOfRefs: [] as TArrayOfRefs,
    addRef: (ref: RefObject<HTMLDivElement>, index: number) => {},
    currentSlide: 0 as number,
    nextSlide: () => {},
    previousSlide: () => {},
    carousel: {} as TCarousel,
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
    toggleShowDecoration: () => {},
    toggleSlideHasTitle: () => {},
    toggleSlideHasTagline: () => {},
    toggleSlideHasParagraph: () => {},
    moveCurrentSlideToRight: () => {},
    moveCurrentSlideToLeft: () => {},
    addSlideToRight: () => {},
    deleteCurrentSlide: () => {},
    setColorPalette: (colors: TColorPalette) => {},
    setFontPalette: (fonts: TFontPallete) => {},
    setCarouselAspectRatio: (aspectRatio: TAspectRatioEnum) => {},
    setDecorationId: (decorationId: TDecorationId) => {},
    setBackgroundImage: (
        imageUrl?: string,
        options?: {
            alt?: string;
            opacity?: number;
            position?: string;
        }
    ) => {},
};

// REVIEW: I think exporting this is causing a full reload of the app.
// Something I didn't noticed before is that it only force full reload when you save the problematic file.
export const CarouselContext = createContext({
    ...INITIAL_STATE,
});

type CarouselContextProviderProps = {
    children: React.ReactNode;
    initialCarousel: TCarousel;
};
export function CarouselContextProvider({
    children,
    initialCarousel,
}: CarouselContextProviderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carousel, setCarousel] = useState(initialCarousel);
    const [arrayOfRefs, setArrayOfRefs] = useState([] as TArrayOfRefs);
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
            // If focus in the child of the slide, we don't want to trigger the shortcuts. The slide has a class name of "slide". Use that to prevent the event from triggering.
            // TODO: Not sure this is the best way to do this. Maybe we should use a ref to the slide and check if the event target is the slide.
            if (
                event.target instanceof HTMLElement &&
                event.target.closest('.slide')
            )
                return;

            if (event.key === 'ArrowRight') nextSlide();
            if (event.key === 'ArrowLeft') previousSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, previousSlide]);

    const editTitle = (newTitle: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].title.content = newTitle;
        setCarousel(newCarousel);
    };

    const editTagline = (newTagline: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].tagline.content = newTagline;
        setCarousel(newCarousel);
    };

    const editDescription = (newDescription: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].paragraphs[0].content = newDescription;
        setCarousel(newCarousel);
    };

    const editProfilePicture = (newImage: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.author.pictureUrl = newImage;
        setCarousel(newCarousel);
    };

    const editName = (newName: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.author.name = newName;
        setCarousel(newCarousel);
    };

    const editHandle = (newHandle: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.author.handle = newHandle;
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
        newCarousel.slides[currentSlide].title.isShown =
            !newCarousel.slides[currentSlide].title.isShown;
        setCarousel(newCarousel);
    };

    const toggleSlideHasTagline = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].tagline.isShown =
            !newCarousel.slides[currentSlide].tagline.isShown;
        setCarousel(newCarousel);
    };

    const toggleSlideHasParagraph = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].paragraphs[0].isShown =
            !newCarousel.slides[currentSlide].paragraphs[0].isShown;
        setCarousel(newCarousel);
    };

    const moveCurrentSlideToRight = () => {
        if (currentSlide === carousel.slides.length - 1) return;
        const newCarousel = deepCopy(carousel);
        const slideToMove = newCarousel.slides[currentSlide];
        const nextSlide = newCarousel.slides[currentSlide + 1];
        newCarousel.slides[currentSlide] = nextSlide;
        newCarousel.slides[currentSlide + 1] = slideToMove;
        setCarousel(newCarousel);
        setCurrentSlide(currentSlide + 1);
    };

    const moveCurrentSlideToLeft = () => {
        if (currentSlide === 0) return;
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
        const newSlide = deepCopy(newCarousel.slides[currentSlide]);
        newCarousel.slides.splice(currentSlide + 1, 0, newSlide);
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
        newCarousel.settings.colorPalette.font = colors.font;
        newCarousel.settings.colorPalette.background = colors.background;
        newCarousel.settings.colorPalette.accent = colors.accent;
        setCarousel(newCarousel);
    };
    const setFontPalette = (fonts: TFontPallete) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.fontPalette.primary = fonts.primary;
        newCarousel.settings.fontPalette.secondary = fonts.secondary;
        newCarousel.settings.fontPalette.handWriting = fonts.handWriting;
        setCarousel(newCarousel);
    };

    const setCarouselAspectRatio = (aspectRatio: TAspectRatioEnum) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.aspectRatio = aspectRatio as AspectRatio;
        setCarousel(newCarousel);
    };

    const setDecorationId = (decorationId: TDecorationId) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.backgroundPattern = decorationId;
        setCarousel(newCarousel);
    };

    const toggleShowDecoration = () => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings.showDecoration =
            !newCarousel.settings.showDecoration;
        setCarousel(newCarousel);
    };

    const setBackgroundImage = (
        imageUrl?: string,
        options?: { alt?: string; opacity?: number; position?: string }
    ) => {
        const newCarousel = deepCopy(carousel);

        let backgroundImage = newCarousel.slides[currentSlide].backgroundImage;
        // TODO: This could be cleaner
        if (!backgroundImage)
            backgroundImage = {
                url: '',
                alt: '',
                opacity: 0.1,
                position: 'center',
            };
        if (imageUrl) backgroundImage.url = imageUrl;
        if (options?.alt) backgroundImage.alt = options.alt;
        if (options?.opacity) backgroundImage.opacity = options.opacity;
        if (options?.position) backgroundImage.position = options.position;

        // newCarousel.slides[currentSlide].backgroundImage = {
        //     url: imageUrl,
        //     alt: options?.alt ? options.alt : '',
        //     opacity: options?.opacity ? options.opacity : 0.1,
        //     position: 'center',
        // };
        setCarousel(newCarousel);
    };

    const addRef = useCallback(
        (ref: RefObject<HTMLDivElement>, index: number) => {
            setArrayOfRefs((arrayOfRefs) => {
                const newArray = [...arrayOfRefs];
                newArray[index] = ref;
                return newArray;
            });
        },
        []
    );

    return (
        <CarouselContext.Provider
            value={{
                arrayOfRefs,
                addRef,
                currentSlide,
                nextSlide,
                previousSlide,
                carousel,
                editTitle,
                editTagline,
                editDescription,
                editImage: editProfilePicture,
                editName,
                editHandle,
                setCurrentSlideTo,
                toggleAlternateColors,
                toggleShowCounter,
                toggleShowDecoration,
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
                setFontPalette,
                setCarouselAspectRatio,
                setDecorationId,
                setBackgroundImage,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
}
