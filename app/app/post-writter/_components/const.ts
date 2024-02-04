import * as PrismaClient from '@prisma/client';

export type VoiceTone = {
    emoji: string;
    name: string;
    value: string;
    id: number;
};

export const VOICE_TONES: VoiceTone[] = [
    {
        id: 1,
        emoji: '🤩',
        name: 'Excited',
        value: 'excited',
    },
    {
        id: 2,
        emoji: '😎',
        name: 'Cool',
        value: 'cool',
    },
    {
        id: 3,
        emoji: '🤓',
        name: 'Smart',
        value: 'smart',
    },
    {
        id: 4,
        emoji: '🤔',
        name: 'Thoughtful',
        value: 'thoughtful',
    },
    {
        id: 5,
        emoji: '😍',
        name: 'Love',
        value: 'love',
    },
    {
        id: 6,
        emoji: '😂',
        name: 'Funny',
        value: 'funny',
    },
    {
        id: 7,
        emoji: '😡',
        name: 'Angry',
        value: 'angry',
    },
    {
        id: 8,
        emoji: '😭',
        name: 'Sad',
        value: 'sad',
    },
    {
        id: 9,
        emoji: '😱',
        name: 'Scared',
        value: 'scared',
    },
    {
        id: 10,
        emoji: '🤯',
        name: 'Mind Blown',
        value: 'mind Blown',
    },
];

export const TEMPLATE_CATEGORIES = [
    'todos',
    'aprendizajes',
    'consejos',
    'historias',
    'opiniones',
    'reflexiones',
    'ideas',
    'experiencias',
    'conclusiones',
    'lecciones',
    'tips',
] as const;

export const POST_TEMPLATES = [
    {
        id: 1,
        name: 'The Big Revelation',
        category: 'aprendizajes',
        title: 'This 1 mindset shift changed everything ',
        content: `
    
    This 1 mindset shift changed everything for me as an {x}.

When I started my {x}, I focused on:

- 
-
-

I did this for 5-6 months when I started, and I was burned out. It was mentally draining. 

Not because I wasn’t working hard.

It was because I was doing so many things, and they all were very different.

The best way is to focus on 1 thing at a time and give your best.

I did this for 5-6 months when I started, and I was burned out. It was mentally draining. 

Not because I wasn’t working hard.

It was because I was doing so many things, and they all were very different.

The best way is to focus on 1 thing at a time and give your best.

I did this for 5-6 months when I started, and I was burned out. It was mentally draining. 

Not because I wasn’t working hard.

It was because I was doing so many things, and they all were very different.

The best way is to focus on 1 thing at a time and give your best.
    `,
    },
    // Create another template (different!) that works well in Linkedin
    {
        id: 2,
        name: `I want from (x) to (y) in (z) months`,
        category: 'aprendizajes',
        title: `I want from {x} to {y} in {z} months`,
        content: `
    I want from {x} to {y} in {z} months

    It was't easy, but I did it. And you can do the same just by following these 3 steps:

    1. 
    2.
    3.
    `,
    },
    {
        id: 3,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 4,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 5,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 6,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 7,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 8,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 9,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 10,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 11,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 12,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 13,

        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 14,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 15,

        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 16,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 17,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 18,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 19,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 20,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 21,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 22,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
    {
        id: 23,
        name: `Exactly {time} ago, I started doing {x}, here is what happened`,
        category: 'consejos',

        title: `Exactly {time} ago, I started doing {x}, here is what happened`,
        content: ` Exactly {time} ago, I started doing {x}, here is what happened

    I started doing {x} exactly {time} ago.

    I was {x} and {y}.
`,
    },
];

export const COLOR_PALETTES = [
    {
        font: '#ffffff',
        background: '#0d3b66',
        accent: '#fae596',
        id: 1,
    },
    {
        font: '#000000',
        background: '#ff6b6b',
        accent: '#ffe66d',
        id: 2,
    },
    {
        font: '#f4f4f2',
        background: '#346751',
        accent: '#c84b31',
        id: 3,
    },
    {
        font: '#f4e8c1',
        background: '#22333b',
        accent: '#d9594c',
        id: 4,
    },
    {
        font: '#27213c',
        background: '#5a352a',
        accent: '#e3b23c',
        id: 5,
    },
    {
        font: '#2d3142',
        background: '#b2b2b2',
        accent: '#ef8354',
        id: 6,
    },
    {
        font: '#1b2021',
        background: '#51513d',
        accent: '#f4d8cd',
        id: 7,
    },
    {
        font: '#011627',
        background: '#fdfffc',
        accent: '#2ec4b6',
        id: 8,
    },
    {
        font: '#f9dc5c',
        background: '#ec4e20',
        accent: '#d81159',
    },
    {
        font: '#011f4b',
        background: '#03396c',
        accent: '#ff7b25',
    },
    {
        font: '#ffffff',
        background: '#003f88',
        accent: '#e5e5e5',
    },
    {
        font: '#ffffff',
        background: '#101820',
        accent: '#f2aa4c',
    },
    {
        font: '#f5f0e1',
        background: '#002500',
        accent: '#929982',
    },
    {
        font: '#0b090a',
        background: '#f5f3f4',
        accent: '#a9927d',
    },
    {
        font: '#ffffff',
        background: '#5f0f40',
        accent: '#9a031e',
    },
    {
        font: '#1d1d1d',
        background: '#fefae0',
        accent: '#f77f00',
    },
    {
        font: '#f2f3ae',
        background: '#f7ff56',
        accent: '#ff9b42',
    },
    {
        font: '#f1faee',
        background: '#1d3557',
        accent: '#e63946',
    },
    {
        font: '#a8dadc',
        background: '#457b9d',
        accent: '#1d3557',
    },
    {
        font: '#1d3557',
        background: '#a8dadc',
        accent: '#f1faee',
    },
    {
        font: '#e63946',
        background: '#f1faee',
        accent: '#a8dadc',
    },
    {
        font: '#f4f1de',
        background: '#3d405b',
        accent: '#81b29a',
    },
    {
        font: '#f2cc8f',
        background: '#e07a5f',
        accent: '#3d405b',
    },
    {
        font: '#e07a5f',
        background: '#f2cc8f',
        accent: '#81b29a',
    },
    {
        font: '#3d405b',
        background: '#f4f1de',
        accent: '#e07a5f',
    },
    {
        font: '#f4f1de',
        background: '#81b29a',
        accent: '#f2cc8f',
    },
    {
        font: '#81b29a',
        background: '#f4f1de',
        accent: '#3d405b',
    },
    {
        font: '#f2cc8f',
        background: '#81b29a',
        accent: '#f4f1de',
    },
    {
        font: '#353535',
        background: '#3c6e71',
        accent: '#d9d9d9',
    },
    {
        font: '#d9d9d9',
        background: '#284b63',
        accent: '#f4d35e',
    },
    {
        font: '#f4d35e',
        background: '#ee964b',
        accent: '#f95738',
    },
    {
        font: '#272838',
        background: '#f3d9dc',
        accent: '#99e1d9',
    },
    {
        font: '#99e1d9',
        background: '#272838',
        accent: '#f3d9dc',
    },
    {
        font: '#f3d9dc',
        background: '#99e1d9',
        accent: '#272838',
    },
    {
        font: '#272838',
        background: '#99e1d9',
        accent: '#f3d9dc',
    },
    {
        font: '#ffffff',
        background: '#264653',
        accent: '#2a9d8f',
    },
    {
        font: '#264653',
        background: '#2a9d8f',
        accent: '#e9c46a',
    },
    {
        font: '#2a9d8f',
        background: '#e9c46a',
        accent: '#f4a261',
    },
    {
        font: '#e9c46a',
        background: '#f4a261',
        accent: '#e76f51',
    },
];
