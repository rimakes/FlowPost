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
