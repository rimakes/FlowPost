'use client';

import { RefObject, createContext, useCallback, useState } from 'react';
import { deepCopy } from '@/lib/utils';
import {
    TArrayOfRefs,
    TBrand,
    TCarousel,
    TPosition,
    TSlideDesignNames,
    TToggleableCarouselSettings,
    TToggleableSlideSettings,
} from '@/types/types';
import { produce } from 'immer';
import { useCarouselShortcuts } from '@/hooks/use-slide-shortcuts';
import { DEFAULT_BACKGROUND_IMAGE } from '@/config/const';

const INITIAL_STATE = {
    arrayOfRefs: [] as TArrayOfRefs,
    addRef: (ref: RefObject<HTMLDivElement>, index: number) => {},
    currentSlide: 0 as number,
    nextSlide: () => {},
    previousSlide: () => {},
    carousel: {} as TCarousel,
    editDescription: (newDescription: string) => {},
    editProfilePicture: (newImage: string) => {},
    editName: (newName: string) => {},
    editHandle: (newHandle: string) => {},
    setCurrentSlideTo: (newSlide: number) => {},
    toggleSlideHasParagraph: () => {},
    addSlideToRight: () => {},
    deleteCurrentSlide: () => {},
    setBackgroundImage: (
        imageUrl?: string,
        options?: {
            alt?: string;
            opacity?: number;
            position?: TPosition;
        }
    ) => {},
    toggleCarouselContent: (setting: TToggleableCarouselSettings) => {},
    toggleSlideContent: (setting: TToggleableSlideSettings) => {},
    moveSlide: (to: number) => {},
    setSlideContent: (
        property: TToggleableSlideSettings,
        content: string
    ) => {},
    getCompleteBrand: () => {
        return {} as Omit<TBrand, 'authorId' | 'id'>;
    },
    setDesign: (design: TSlideDesignNames) => {},
    setCarouselSetting: (
        setting: keyof TCarousel['settings'],
        newSetting: any
    ) => {},
    editParagraphs: (newParagraphs: string[]) => {},
    editImage: (newImage: string) => {},
    editParagraphN: (index: number, newParagraph: string) => {},
    setPdfUrl: (url: string) => {},
    setCarousel: (carousel: TCarousel | ((prev: TCarousel) => TCarousel)) => {},
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

    useCarouselShortcuts({ ArrowRight: nextSlide, ArrowLeft: previousSlide });

    const setSlideContent = async (
        property: TToggleableSlideSettings,
        content: string
    ) => {
        // TODO: check in previous commits where this is comming from
        // const canvas = await toCanvas(arrayOfRefs[0].current!);
        // const dataUrl = canvas.toDataURL();

        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.slides[currentSlide][property]!.content = content;
                // carousel.thumbnailDataUrl = dataUrl;
            })
        );
    };

    const editImage = (newImage: string) => {
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.slides[currentSlide].image!.url = newImage;
            })
        );
    };

    const editDescription = (newDescription: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].paragraphs[0].content = newDescription;
        setCarousel(newCarousel);
    };

    const editParagraphs = (newParagraphs: string[]) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].paragraphs = newParagraphs.map(
            (paragraph) => {
                return {
                    content: paragraph,
                    isShown: true,
                };
            }
        );
        setCarousel(newCarousel);
    };

    const editParagraphN = (index: number, newParagraph: string) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].paragraphs[index].content =
            newParagraph;
        setCarousel(newCarousel);
    };

    const editProfilePicture = (newImage: string) => {
        setCarousel((prev) => {
            const newCarousel = deepCopy(prev);
            newCarousel.author.pictureUrl = newImage;
            return newCarousel;
        });
    };

    const editName = (newName: string) => {
        setCarousel((prev) => {
            const newCarousel = deepCopy(prev);
            newCarousel.author.name = newName;
            return newCarousel;
        });
    };

    const editHandle = (newHandle: string) => {
        setCarousel((prev) => {
            const newCarousel = deepCopy(prev);
            newCarousel.author.handle = newHandle;
            return newCarousel;
        });
    };

    const setCurrentSlideTo = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    const toggleCarouselSetting = (setting: TToggleableCarouselSettings) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.settings[setting] = !newCarousel.settings[setting];
        setCarousel(newCarousel);
    };

    const toggleSlideSetting = (setting: TToggleableSlideSettings) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide][setting]!.isShown =
            !newCarousel.slides[currentSlide][setting]!.isShown;
        setCarousel(newCarousel);
    };

    const toggleSlideHasParagraph = () => {
        const newCarousel = deepCopy(carousel);
        if (!newCarousel.slides[currentSlide].paragraphs[0]) return;
        newCarousel.slides[currentSlide].paragraphs[0].isShown =
            !newCarousel.slides[currentSlide].paragraphs[0]?.isShown;
        setCarousel(newCarousel);
    };

    const moveSlide = (to: number) => {
        console.log({ to });
        if (currentSlide === carousel.slides.length - 1 && to >= 1) return;
        if (currentSlide === 0 && to <= -1) return;

        const newCarousel = deepCopy(carousel);
        const slideToMove = newCarousel.slides[currentSlide];
        const newSlide = newCarousel.slides[currentSlide + to];
        newCarousel.slides[currentSlide] = newSlide;
        newCarousel.slides[currentSlide + to] = slideToMove;
        setCarousel(newCarousel);
        setCurrentSlide(currentSlide + to);
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

    const setCarouselSetting = (
        setting: keyof TCarousel['settings'],
        newSetting: any
    ) => {
        const newCarousel = deepCopy(carousel);
        // @ts-ignore
        newCarousel.settings[setting] = newSetting;
        setCarousel(newCarousel);
    };

    const setBackgroundImage = (
        imageUrl?: string,
        options?: { alt?: string; opacity?: number; position?: TPosition }
    ) => {
        const newCarousel = produce(carousel, (draftCarousel) => {
            let backgroundImage =
                draftCarousel.slides[currentSlide].backgroundImage;
            // @ts-ignore
            backgroundImage || (backgroundImage = DEFAULT_BACKGROUND_IMAGE);
            imageUrl && (backgroundImage!.url = imageUrl);
            options?.alt && (backgroundImage!.alt = options.alt);
            options?.opacity && (backgroundImage!.opacity = options.opacity);
            options?.position && (backgroundImage!.position = options.position);
        });
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

    const getCompleteBrand = () => {
        return {
            ...carousel.author,
            colorPalette: carousel.settings.colorPalette,
            fontPalette: carousel.settings.fontPalette,
            imageUrl: carousel.author.pictureUrl,
        };
    };

    const setDesign = (design: TSlideDesignNames) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].design = design;
        setCarousel(newCarousel);
    };

    const setPdfUrl = (url: string) => {
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.pdfUrl = url;
            })
        );
    };

    return (
        <CarouselContext.Provider
            value={{
                setCarouselSetting,
                setSlideContent,
                moveSlide,
                toggleSlideContent: toggleSlideSetting,
                toggleCarouselContent: toggleCarouselSetting,
                setCarousel,
                setPdfUrl,
                editImage,
                editParagraphs,
                setDesign,
                getCompleteBrand,
                arrayOfRefs,
                addRef,
                currentSlide,
                nextSlide,
                previousSlide,
                carousel,
                editDescription,
                editProfilePicture,
                editName,
                editHandle,
                setCurrentSlideTo,
                toggleSlideHasParagraph,
                addSlideToRight,
                deleteCurrentSlide,
                setBackgroundImage,
                editParagraphN,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
}
