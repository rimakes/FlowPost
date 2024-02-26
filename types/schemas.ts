// type Slide {
//     title      DisplayableText
//     paragraphs DisplayableText[]
//     tagline    DisplayableText
//     settings   SlideOverrides
//     image      Image
// }

import { z } from 'zod';

export const SlideSchemaPrompt = z
    .array(
        z.object({
            title: z
                .string()
                .min(1)
                .max(50)
                .describe(
                    `A meaningful title (no "introducción" or "slide 1")`
                ),
            paragraph: z
                .string()
                .max(200)
                .describe(`Do not exceed 180 characters`),
        })
    )
    .max(10);
