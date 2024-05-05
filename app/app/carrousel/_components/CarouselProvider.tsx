'use client';

import { RefObject, createContext, useCallback, useState } from 'react';
import { produce } from 'immer';
import { deepCopy } from '@/lib/utils';
import {
    TArrayOfRefs,
    TCarousel,
    TCarouselContent,
    TPosition,
    TSlideDesignNames,
    TToggleableCarouselSettings,
    TToggleableSlideSettings,
} from '@/types/types';
import { useCarouselShortcuts } from '@/hooks/use-slide-shortcuts';
import { DEFAULT_BACKGROUND_IMAGE } from '@/config/const';

const INITIAL_STATE = {
    arrayOfRefs: [] as TArrayOfRefs,
    addRef: (ref: RefObject<HTMLDivElement>, index: number) => {},
    nextSlide: () => {},
    previousSlide: () => {},
    currentSlide: 0 as number,
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
    toggleCarouselSetting: (setting: TToggleableCarouselSettings) => {},
    toggleSlideSetting: (setting: TToggleableSlideSettings) => {},
    moveSlide: (to: number) => {},
    setSlideContent: (
        property: TToggleableSlideSettings,
        content: string
    ) => {},
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
    setSlideImageCaption: (caption: string) => {},
    setCarouselContent: (content: TCarouselContent, newContent: string) => {},
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
}) {
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

    const setCurrentSlideTo = (newSlide: number) => {
        setCurrentSlide(newSlide);
    };

    const toggleCarouselSetting = (setting: TToggleableCarouselSettings) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.settings[setting] =
                    !draftCarousel.settings[setting];
            })
        );
    };

    const setCarouselSetting = (
        setting: keyof TCarousel['settings'],
        newSetting: any
    ) => {
        console.log('settings', setting, newSetting);
        // REVIEW: check what the difference is between using prev and not using it when we are using immer
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                console.log('draftCarousel', draftCarousel);
                // @ts-ignore
                draftCarousel.settings[setting] = newSetting;
            })
        );
    };

    const setCarouselContent = (
        content: TCarouselContent,
        newContent: string
    ) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel[content as TCarouselContent] = newContent;
            })
        );
    };

    const editProfilePicture = (newImage: string) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.author.pictureUrl = newImage;
            })
        );
    };

    const editName = (newName: string) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.author.name = newName;
            })
        );
    };

    const editHandle = (newHandle: string) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.author.handle = newHandle;
            })
        );
    };

    const setPdfUrl = (url: string) => {
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.pdfUrl = url;
            })
        );
    };

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

    const setSlideImageCaption = (caption: string) => {
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.slides[currentSlide].image!.caption = caption;
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
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.slides[currentSlide].paragraphs.length === 0 &&
                    (draftCarousel.slides[currentSlide].paragraphs[0] = {
                        content: '',
                        isShown: true,
                    });
                draftCarousel.slides[currentSlide].paragraphs[0].content =
                    newDescription;
            })
        );
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
        setCarousel(
            produce(carousel, (draftCarousel) => {
                draftCarousel.slides[currentSlide].paragraphs[index].content =
                    newParagraph;
            })
        );
    };

    const toggleSlideSetting = (setting: TToggleableSlideSettings) => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.slides[currentSlide][setting]!.isShown =
                    !draftCarousel.slides[currentSlide][setting]!.isShown;
            })
        );
    };

    const toggleSlideHasParagraph = () => {
        const newCarousel = deepCopy(carousel);
        if (!newCarousel.slides[currentSlide].paragraphs[0]) return;
        newCarousel.slides[currentSlide].paragraphs[0].isShown =
            !newCarousel.slides[currentSlide].paragraphs[0]?.isShown;
        setCarousel(newCarousel);
    };

    const moveSlide = (to: number) => {
        if (currentSlide === carousel.slides.length - 1 && to >= 1) return;
        if (currentSlide === 0 && to <= -1) return;
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                const slideToMove = draftCarousel.slides[currentSlide];
                draftCarousel.slides.splice(currentSlide, 1);
                draftCarousel.slides.splice(currentSlide + to, 0, slideToMove);
                setCurrentSlide(currentSlide + to);
            })
        );
    };

    const addSlideToRight = () => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                const newSlide = deepCopy(draftCarousel.slides[currentSlide]);
                draftCarousel.slides.splice(currentSlide + 1, 0, newSlide);
                setCurrentSlide(currentSlide + 1);
            })
        );
    };

    const deleteCurrentSlide = () => {
        setCarousel((prev) =>
            produce(prev, (draftCarousel) => {
                draftCarousel.slides.splice(currentSlide, 1);
                if (currentSlide === draftCarousel.slides.length) {
                    setCurrentSlide(currentSlide - 1);
                }
            })
        );
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

    const setDesign = (design: TSlideDesignNames) => {
        const newCarousel = deepCopy(carousel);
        newCarousel.slides[currentSlide].design = design;
        setCarousel(newCarousel);
    };

    return (
        <CarouselContext.Provider
            value={{
                setSlideImageCaption,
                setCarouselContent,
                setCarouselSetting,
                setSlideContent,
                moveSlide,
                toggleSlideSetting,
                toggleCarouselSetting,
                setCarousel,
                setPdfUrl,
                editImage,
                editParagraphs,
                setDesign,
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
