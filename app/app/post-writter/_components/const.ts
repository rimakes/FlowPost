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

export const colorPalettes = [
    {
        fontColor: '#ffffff',
        backgroundColor: '#0d3b66',
        accentColor: '#fae596',
        id: 1,
    },
    {
        fontColor: '#000000',
        backgroundColor: '#ff6b6b',
        accentColor: '#ffe66d',
        id: 2,
    },
    {
        fontColor: '#f4f4f2',
        backgroundColor: '#346751',
        accentColor: '#c84b31',
        id: 3,
    },
    {
        fontColor: '#f4e8c1',
        backgroundColor: '#22333b',
        accentColor: '#d9594c',
        id: 4,
    },
    {
        fontColor: '#27213c',
        backgroundColor: '#5a352a',
        accentColor: '#e3b23c',
        id: 5,
    },
    {
        fontColor: '#2d3142',
        backgroundColor: '#b2b2b2',
        accentColor: '#ef8354',
        id: 6,
    },
    {
        fontColor: '#1b2021',
        backgroundColor: '#51513d',
        accentColor: '#f4d8cd',
        id: 7,
    },
    {
        fontColor: '#011627',
        backgroundColor: '#fdfffc',
        accentColor: '#2ec4b6',
        id: 8,
    },
    {
        fontColor: '#f9dc5c',
        backgroundColor: '#ec4e20',
        accentColor: '#d81159',
    },
    {
        fontColor: '#011f4b',
        backgroundColor: '#03396c',
        accentColor: '#ff7b25',
    },
    {
        fontColor: '#ffffff',
        backgroundColor: '#003f88',
        accentColor: '#e5e5e5',
    },
    {
        fontColor: '#ffffff',
        backgroundColor: '#101820',
        accentColor: '#f2aa4c',
    },
    {
        fontColor: '#f5f0e1',
        backgroundColor: '#002500',
        accentColor: '#929982',
    },
    {
        fontColor: '#0b090a',
        backgroundColor: '#f5f3f4',
        accentColor: '#a9927d',
    },
    {
        fontColor: '#ffffff',
        backgroundColor: '#5f0f40',
        accentColor: '#9a031e',
    },
    {
        fontColor: '#1d1d1d',
        backgroundColor: '#fefae0',
        accentColor: '#f77f00',
    },
    {
        fontColor: '#f2f3ae',
        backgroundColor: '#f7ff56',
        accentColor: '#ff9b42',
    },
    {
        fontColor: '#f1faee',
        backgroundColor: '#1d3557',
        accentColor: '#e63946',
    },
    {
        fontColor: '#a8dadc',
        backgroundColor: '#457b9d',
        accentColor: '#1d3557',
    },
    {
        fontColor: '#1d3557',
        backgroundColor: '#a8dadc',
        accentColor: '#f1faee',
    },
    {
        fontColor: '#e63946',
        backgroundColor: '#f1faee',
        accentColor: '#a8dadc',
    },
    {
        fontColor: '#f4f1de',
        backgroundColor: '#3d405b',
        accentColor: '#81b29a',
    },
    {
        fontColor: '#f2cc8f',
        backgroundColor: '#e07a5f',
        accentColor: '#3d405b',
    },
    {
        fontColor: '#e07a5f',
        backgroundColor: '#f2cc8f',
        accentColor: '#81b29a',
    },
    {
        fontColor: '#3d405b',
        backgroundColor: '#f4f1de',
        accentColor: '#e07a5f',
    },
    {
        fontColor: '#f4f1de',
        backgroundColor: '#81b29a',
        accentColor: '#f2cc8f',
    },
    {
        fontColor: '#81b29a',
        backgroundColor: '#f4f1de',
        accentColor: '#3d405b',
    },
    {
        fontColor: '#f2cc8f',
        backgroundColor: '#81b29a',
        accentColor: '#f4f1de',
    },
    {
        fontColor: '#353535',
        backgroundColor: '#3c6e71',
        accentColor: '#d9d9d9',
    },
    {
        fontColor: '#d9d9d9',
        backgroundColor: '#284b63',
        accentColor: '#f4d35e',
    },
    {
        fontColor: '#f4d35e',
        backgroundColor: '#ee964b',
        accentColor: '#f95738',
    },
    {
        fontColor: '#272838',
        backgroundColor: '#f3d9dc',
        accentColor: '#99e1d9',
    },
    {
        fontColor: '#99e1d9',
        backgroundColor: '#272838',
        accentColor: '#f3d9dc',
    },
    {
        fontColor: '#f3d9dc',
        backgroundColor: '#99e1d9',
        accentColor: '#272838',
    },
    {
        fontColor: '#272838',
        backgroundColor: '#99e1d9',
        accentColor: '#f3d9dc',
    },
    {
        fontColor: '#ffffff',
        backgroundColor: '#264653',
        accentColor: '#2a9d8f',
    },
    {
        fontColor: '#264653',
        backgroundColor: '#2a9d8f',
        accentColor: '#e9c46a',
    },
    {
        fontColor: '#2a9d8f',
        backgroundColor: '#e9c46a',
        accentColor: '#f4a261',
    },
    {
        fontColor: '#e9c46a',
        backgroundColor: '#f4a261',
        accentColor: '#e76f51',
    },
];
