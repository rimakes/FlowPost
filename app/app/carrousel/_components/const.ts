import { TCarousel, TSlide } from '@/types/types';
import * as PrismaClient from '@prisma/client';

export const fakeSlides: TSlide[] = [
    {
        listFirstItem: 1,
        slideHeading: {
            content: 'some randum heading',
            isShown: true,
        },
        backgroundImage: {
            url: '',
            alt: 'some random',
            opacity: 0.1,
            position: 'CENTER',
            caption: 'some random caption',
        },
        paragraphs: [
            {
                content:
                    'Loremi ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                isShown: true,
            },
        ],
        title: {
            content: 'some randum title',
            isShown: true,
        },
        // Ignored for now
        settings: {
            colorPalette: {
                background: '',
                font: '',
                accent: '',
                primary: '',
            },
            fontPalette: {
                primary: '',
                secondary: '',
                handWriting: '',
            },
        },
        tagline: {
            content: 'some randum tagline',
            isShown: true,
        },
        image: {
            url: 'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'some random',
            position: 'CENTER',
            opacity: 0.1,
            caption: 'some random caption',
        },
        bigCharacter: { content: 'R', isShown: true },
        design: 'TextOnlySlide',
    },
    {
        listFirstItem: 1,
        slideHeading: {
            content: 'some randum heading',
            isShown: true,
        },
        backgroundImage: {
            url: 'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'some random',
            opacity: 0.1,
            position: 'CENTER',
            caption: 'some random caption',
        },
        paragraphs: [
            {
                content:
                    'Loremi ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                isShown: true,
            },
        ],
        title: {
            content: 'some randum title',
            isShown: true,
        },
        // Ignored for now
        settings: {
            colorPalette: {
                background: '',
                font: '',
                accent: '',
                primary: '',
            },
            fontPalette: {
                primary: '',
                secondary: '',
                handWriting: '',
            },
        },
        tagline: {
            content: 'some randum tagline',
            isShown: true,
        },
        image: {
            url: 'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'some random',
            position: 'CENTER',
            opacity: 0.1,
            caption: 'some random caption',
        },
        bigCharacter: { content: 'R', isShown: true },
        design: 'TextOnlySlide',
    },
];

export const fakeCarousel: Omit<TCarousel, 'id'> = {
    title: 'some random title',
    linkedinPostId: '',
    publicId: '',
    userId: '65eeff20491ef024dbdae302',
    slides: fakeSlides,
    author: {
        handle: '@ricSala',
        name: 'Ricardo Sala',
        pictureUrl: '/images/placeholders/user.png',
    },
    swipeLabel: 'Desliza',
    settings: {
        labelRoundness: 10,
        showAuthorInFirstOnly: true,
        showHandle: true,
        showName: true,
        showProfilePic: true,
        colorPalette: {
            background: '#000000',
            font: '#ffffff',
            accent: '#ffffff',
            primary: '#ffffff',
        },
        fontPalette: {
            primary: 'bricolage',
            secondary: 'bricolage',
            handWriting: 'bricolage',
        },
        aspectRatio: 'PORTRAIT',
        backgroundPattern: 'Bubbles',
        alternateColors: false,
        showAuthor: true,
        showCounter: true,
        showSwipeLabel: true,
        showDecoration: true,
    },
    pdfUrl: '',
    thumbnailDataUrl: '',
};

// REVIEW: This took a while!!!!
export const ASPECT_RATIOS_MAP = {
    PORTRAIT: '4:5',
    SQUARE: '1:1',
} as const satisfies Record<PrismaClient.AspectRatio, string>;
// REVIEW THIS!
// as const made the strings literal types instead of just string
// satisfies makes sure the keys are the same as the enum from the prisma schema

// export type TAspectRatioLabel = TAspectRatioMap[TAspectRatioEnum];
