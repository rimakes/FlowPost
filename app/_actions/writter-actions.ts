'use server';

import { db } from '@/lib/prisma';
import { retryAsyncFunction } from '@/lib/utils';
import { TCarousel, TLinkedinPost, TSlide } from '@/types/types';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import {
    BigNumberSlideSchema,
    CallToActionSlideSchema,
    CoverSlideSchema,
    ImageAndTextHorizontalSchema,
    ListSlideSchema,
    OnlyTextSlideSchema,
} from '@/types/schemas';
import { RunnableSequence } from '@langchain/core/runnables';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from '@/auth';
import { promptGenerateCarousel } from '@/config/prompts';
import { getPexelImages } from '@/lib/pexels';
import {
    dbDeleteCarousel,
    dbUpsertCarousel,
    dbUpsertLinkedinPost,
} from '../_data/linkedinpost.data';
import { aiChat } from '@/lib/aiClients';

export async function upsertLinkedinPost(
    post: TLinkedinPost,
    isDemo: boolean = false,
    authorId?: string,
    carouselId?: string
) {
    const userId = isDemo ? '661be88ed1d034dfd861233d' : authorId!;
    let linkedinPost: TLinkedinPost;
    linkedinPost = await dbUpsertLinkedinPost(post, userId, carouselId);
    return linkedinPost;
}

export async function deleteLinkedinPost(postId: string) {
    await deleteLinkedinPost(postId);

    revalidatePath('/app/schedule');
}
export async function deleteCarousel(carouselId: string) {
    await dbDeleteCarousel(carouselId);
}

export async function createLinkedinCarousel(
    post: TLinkedinPost,
    isDemo = false
) {
    // Get the custom AISettings from the user
    const data = await getServerSession();
    let userId = data?.user?.id;

    // If the user is not logged in, use a "demo" user so she/he can create posts as well
    if (!userId && isDemo) userId = '661be88ed1d034dfd861233d';

    const model = aiChat('carousel');

    const promptTemplate = PromptTemplate.fromTemplate(promptGenerateCarousel);

    const parser = StructuredOutputParser.fromZodSchema(
        z
            .array(
                z.union([
                    BigNumberSlideSchema,
                    OnlyTextSlideSchema,
                    ListSlideSchema,
                    CallToActionSlideSchema,
                    CoverSlideSchema,
                    ImageAndTextHorizontalSchema,
                ])
            )
            .max(15)
    );

    const chain = RunnableSequence.from([promptTemplate, model, parser]);

    const fn = () =>
        chain.invoke(
            {
                post: post.content,
                format_instructions: parser.getFormatInstructions(),
            },
            { tags: ['test'] }
        );

    const generatedSlides = await retryAsyncFunction(fn, 3, 1000);

    // Check if in the slides there is one or more that require an image (aka ImageAndTextHorizontal or ImageAndTextVertical)

    const imageSlideIndexes: number[] = [];

    generatedSlides.forEach((slide, index) => {
        if (slide.design === 'ImageAndTextHorizontal') {
            imageSlideIndexes.push(index);
        }
    });

    if (imageSlideIndexes.length !== 0) {
        await Promise.all(
            imageSlideIndexes.map(async (index) => {
                // @ts-ignore
                const query = generatedSlides[index].image;
                const images = await getPexelImages(query);
                const randomImage = images[0];
                // @ts-ignore
                generatedSlides[index].image = randomImage;
            })
        );
    }

    const firstBrand = await db.brand.findFirst({
        where: {
            authorId: userId,
        },
    });

    const formattedSlides: TSlide[] = generatedSlides.map((slide) => {
        return {
            slideHeading: { content: slide.title, isShown: true },
            listFirstItem: 1,
            title: {
                content: slide.title ?? '',
                isShown: !!slide.title,
            },
            // @ts-ignore
            // TODO: how can we fix this?
            paragraphs: slide.paragraphs
                ? // @ts-ignore
                  slide.paragraphs.map((paragraph: any) => {
                      return { content: paragraph, isShown: true };
                  })
                : [{ content: '...', isShown: true }],

            tagline: {
                // @ts-ignore
                content: slide.tagline ?? '',
                // @ts-ignore
                isShown: !!slide.tagline,
            },
            backgroundImage: {
                alt: '',
                opacity: 0.1,
                url: '',
                position: 'CENTER',
                caption: '',
            },
            settings: null,
            // @ts-ignore
            bigCharacter: {
                // @ts-ignore
                content: slide.bigCharacter ?? '',
                // @ts-ignore
                isShown: !!slide.bigCharacter,
            },
            image: {
                // @ts-ignore
                caption: slide.imageCaption ?? '',
                // @ts-ignore
                position: slide.imagePosition ?? 'TOP',
                alt: '',
                opacity: 0.1,
                // @ts-ignore
                url: slide.image ?? '',
            },
            design: slide.design,
        };
    });

    const carousel = await db.carousel.create({
        data: {
            slides: formattedSlides,
            author: {
                handle: firstBrand?.handle ?? 'Ricardo Sala',
                name: firstBrand?.name ?? 'Ricardo Sala',
                pictureUrl:
                    firstBrand?.imageUrl ?? '/images/placeholders/user.png',
            },
            // REVIEW: Why cannot do set: null?
            settings: {
                colorPalette: {
                    accent: firstBrand?.colorPalette.accent ?? '#FF0000',
                    font: firstBrand?.colorPalette.font ?? '#FFFFFF',
                    background:
                        firstBrand?.colorPalette.background ?? '#000000',
                    primary: firstBrand?.colorPalette.primary ?? '#000000',
                },
                fontPalette: {
                    handWriting: firstBrand?.fontPalette.handWriting ?? 'inter',
                    primary: firstBrand?.fontPalette.primary ?? 'inter',
                    secondary: firstBrand?.fontPalette.primary ?? 'inter',
                },
                aspectRatio: 'PORTRAIT',
                backgroundPattern: 'Bubbles',
            },
            linkedinPost: {
                connect: {
                    id: post.id,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return carousel;
}

export async function upsertCarousel(carousel: TCarousel, userId: string) {
    const updatedCarousel = await dbUpsertCarousel(carousel, userId);
    return updatedCarousel;
}

export const getCarouselsByUserId = async (userId: string) => {
    try {
        const carousels = await db.carousel.findMany({
            where: {
                userId,
            },
        });

        return carousels;
    } catch (error) {
        console.error('Error getting carousels', error);
        throw new Error('Error getting carousels'); // Replace this with your custom error or error handling logic
    }
};
