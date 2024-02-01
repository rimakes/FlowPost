import { Carousel, SlideType as SlideType } from '@/app/app/carrousel/page';

export const fakeSlides: SlideType[] = [
    {
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        image: '/images/placeholders/user.png',
        subtitle: 'some randum subtitle',
        title: 'Some random title',
        hasCounter: true,
        hasParagraph: true,
        hasTagline: true,
        hasTitle: true,
        tagline: 'some randum tagline',
        backgroundColor: '#000000',
        fontColor: '#ffffff',
    },
    {
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        image: '/images/placeholders/user.png',
        subtitle: 'some randum subtitle',
        title: 'Some random title',
        hasCounter: true,
        hasParagraph: true,
        hasTagline: true,
        hasTitle: true,
        tagline: 'some randum tagline',
        backgroundColor: '#000000',
        fontColor: '#ffffff',
    },
    {
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        image: '/images/placeholders/user.png',
        subtitle: 'some randum subtitle',
        title: 'Some random title',
        hasCounter: true,
        hasParagraph: true,
        hasTagline: true,
        hasTitle: true,
        tagline: 'some randum tagline',
        backgroundColor: '#000000',
        fontColor: '#ffffff',
    },
    {
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        image: '/images/placeholders/user.png',
        subtitle: 'some randum subtitle',
        title: 'Some random title',
        hasCounter: true,
        hasParagraph: true,
        hasTagline: true,
        hasTitle: true,
        tagline: 'some randum tagline',
        backgroundColor: '#000000',
        fontColor: '#ffffff',
    },
];

export const fakeCarousel: Carousel = {
    slides: fakeSlides,
    authorHandle: '@ricSala',
    authorName: 'Ricardo Sala',
    authorPictureUrl: '/images/placeholders/user.png',
    colorPalette: {
        backgroundColor: '#000000',
        primaryColor: '#ffffff',
        secondaryColor: '#ffffff',
    },
    fontPalette: {
        primaryFont: 'Roboto',
        secondaryFont: 'Roboto',
    },
    swipeLabel: 'Desliza',
    settings: {
        alternateColors: false,
        showAuthor: true,
        showCounter: true,
        showSwipeLabel: true,
    },
    backgroundPattern: null,
};
