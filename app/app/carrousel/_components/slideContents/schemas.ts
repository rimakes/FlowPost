import { z } from 'zod';

const ParagraphsSchema = z
    .array(
        z.string().nonempty(
            `El párrafo no puede estar vacío debe ser un array DE SOLO UN ELEMENTO!!!
        Usa markup html para dar formato al texto, pero solo puedes usar etiquetas tipo <p>, <ul>, <li> y <strong>
        `
        )
    )
    .refine((data) => data.length === 1, {
        message: 'The parragraph array can only have ONE element',
        path: ['paragraphs call to action'],
    });

export const OnlyTextSlideSchema = z.object({
    title: z.string().nonempty('El título no puede estar vacío'),
    // paragraphs should not be an array of only one item
    paragraphs: ParagraphsSchema,
    // tagline is not allowed
    tagline: z.undefined().refine((data) => data === undefined, {
        message: 'The tagline property is not allowed in a OnlyTextSlide!',
        path: ['tagline'],
    }),
    design: z.enum(['TextOnlySlide']),
});

export const BigNumberSlideSchema = z.object({
    title: z.string().nonempty('El título no puede estar vacío'),
    bigCharacter: z
        .string()
        .nonempty('El número grande no puede estar vacío')
        .max(1, {
            message: 'El número grande no puede tener más de un caracter!!',
        }),
    tagline: z.string().nonempty('El tagline no puede estar vacío'),
    design: z.enum(['BigNumberSlide']),
});

// export const ListSlideSchema = z.object({
//     title: z.string().nonempty('El título no puede estar vacío'),
//     paragraphs: z.array(
//         z.string().nonempty('El párrafo no puede estar vacío').max(20, {
//             message: 'El párrafo no puede tener más de 20 caracteres!!',
//         })
//     ),
//     design: z.enum([
//         'BigNumberSlide',
//         'TextOnlySlide',
//         'CallToAction',
//         'Cover',
//         'ImageAndTextHorizontal',
//     ]),
// });

export const CallToActionSlideSchema = z.object({
    title: z.string().nonempty('El título no puede estar vacío'),
    paragraphs: ParagraphsSchema,
    tagline: z.string().nonempty('El tagline no puede estar vacío'),
    design: z.enum(['CallToAction']),
});
export const CoverSlideSchema = z.object({
    title: z.string().nonempty('El título no puede estar vacío'),
    tagline: z.string().nonempty('El tagline no puede estar vacío'),
    design: z.enum(['Cover']),
});

// description: string;
// image: string;
// imageLocation?: 'left' | 'right';
// imageCaption?: string;

export const ImageAndTextHorizontalSchema = z.object({
    title: z.string().nonempty('El título no puede estar vacío'),
    image: z.string().nonempty('La imagen no puede estar vacía'),
    paragraphs: ParagraphsSchema,
    imageLocation: z.enum(['left', 'right']),
    imageCaption: z.string().nonempty('El caption no puede estar vacío'),
    design: z.enum(['ImageAndTextHorizontal']),
});
