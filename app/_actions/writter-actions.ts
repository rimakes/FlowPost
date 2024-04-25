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
import { promptGenerateCarousel } from '@/config/prompts';
import { getPexelImages } from '@/lib/pexels';
import {
    dbCreateCarouselWithBrand,
    dbDeleteCarousel,
    dbUpsertCarousel,
    dbUpsertLinkedinPost,
} from '../_data/linkedinpost.data';
import { aiChat } from '@/lib/aiClients';
import { getFirstBrand } from '../_data/brand.data';
import { authGuard } from './auth.actions';
import { ChatOpenAI, ChatOpenAICallOptions } from '@langchain/openai';

export async function upsertLinkedinPost(
    post: TLinkedinPost,
    isDemo: boolean = false,
    authorId?: string,
    carouselId?: string
) {
    const userId = isDemo ? process.env.DEMO_USER_ID! : authorId!;
    console.log({ isDemo }, { authorId }, { userId });
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

export async function createCarousel(post: TLinkedinPost, isDemo = false) {
    // Get the custom AISettings from the user
    const data = await authGuard(isDemo);
    let userId = data!.user.id;

    const model = aiChat('carousel');

    let generatedSlides = await generateSlides(post, model);

    // @ts-ignore
    generatedSlides = (await getSlidesImages(
        generatedSlides as any
    )) as TSlide[];

    // Check if in the slides there is one or more that require an image (aka ImageAndTextHorizontal or ImageAndTextVertical)

    const firstBrand = await getFirstBrand(userId!);

    const formattedSlides: TSlide[] = generatedSlides.map((slide) => {
        return {
            slideHeading: { content: slide.title, isShown: true },
            listFirstItem: 1,
            title: {
                content: slide.title ?? '...',
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
                content: slide.tagline ?? '...',
                // @ts-ignore
                isShown: !!slide.tagline,
            },
            backgroundImage: {
                alt: '',
                opacity: 0.1,
                url: '',
                position: 'CENTER',
                caption: '...',
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
                caption: slide.imageCaption ?? '...',
                // @ts-ignore
                position: slide.imagePosition ?? 'TOP',
                alt: '',
                opacity: 0.1,
                // @ts-ignore
                url: slide.image ?? '/images/placeholders/slide-image.webp',
            },
            design: slide.design,
        };
    });

    const carousel = await dbCreateCarouselWithBrand(
        post,
        formattedSlides,
        userId,
        firstBrand!
    );

    return carousel;
}

export const generateSlides = async (
    post: TLinkedinPost,
    model: ChatOpenAI<ChatOpenAICallOptions>
) => {
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

    return generatedSlides;
};

export const getSlidesImages = async (slides: TSlide[]) => {
    const imageSlideIndexes: number[] = [];

    slides.forEach((slide, index) => {
        if (slide.design === 'ImageAndTextHorizontal') {
            imageSlideIndexes.push(index);
        }
    });

    if (imageSlideIndexes.length !== 0) {
        await Promise.all(
            imageSlideIndexes.map(async (index) => {
                // @ts-ignore
                const query = slides[index].image as string; // the output of the model is a query.
                const images = await getPexelImages(query);
                const randomImage = images[0];
                // @ts-ignore
                slides[index].image = randomImage;
            })
        );
    }

    return slides;
};
