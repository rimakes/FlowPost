'use server';

import { db } from '@/lib/prisma';
import { getAiModel, retryAsyncFunction } from '@/lib/utils';
import { TCarousel, TLinkedinPost, TSlide } from '@/types/types';
import fs from 'fs';
import { OpenAIWhisperAudio } from 'langchain/document_loaders/fs/openai_whisper_audio';
import { ChatOpenAI } from '@langchain/openai';
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
import axios from 'axios';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { promptGenerateCarousel } from '@/config/prompt';

export async function upsertLinkedinPost(
    post: TLinkedinPost,
    isDemo: boolean = false,
    authorId?: string,
    carouselId?: string
) {
    const {
        id,
        content,
        author: { handle, name, pictureUrl },
    } = post;

    console.log('upsertLinkedinPost', post, authorId);

    let linkedinPost: TLinkedinPost;
    if (id === 'new') {
        linkedinPost = await db.linkedinPost.create({
            data: {
                content,
                author: {
                    handle,
                    name,
                    pictureUrl, // placeholder or the image of the user
                },
                userId: isDemo ? '661be88ed1d034dfd861233d' : authorId!,
                carousel: carouselId
                    ? { connect: { id: carouselId } }
                    : undefined,
            },
        });
    } else {
        linkedinPost = await db.linkedinPost.update({
            where: {
                id: id,
            },
            data: {
                content,
                author: {
                    handle,
                    name,
                    pictureUrl, // placeholder or the image of the user
                },
                userId: authorId,
                carousel: carouselId
                    ? { connect: { id: carouselId } }
                    : undefined,
            },
        });
    }

    return linkedinPost;
}

export async function deleteLinkedinPost(postId: string) {
    await db.linkedinPost.delete({
        where: {
            id: postId,
        },
    });

    revalidatePath('/app/schedule');
}
export async function deleteCarousel(carouselId: string) {
    await db.carousel.delete({
        where: {
            id: carouselId,
        },
    });
}

export async function createLinkedinCarousel(
    post: TLinkedinPost,
    isDemo = false
) {
    // Get the custom AISettings from the user
    const data = await getServerSession(authOptions);
    let userId = data?.user?.id;

    // If the user is not logged in, use a "demo" user so she/he can create posts as well
    if (!userId && isDemo) userId = '661be88ed1d034dfd861233d';

    const model = new ChatOpenAI({
        temperature: 0.8,
        modelName: getAiModel('carousel'),
        streaming: true,
        callbacks: [
            {
                handleLLMNewToken(token) {},
            },
        ],
    });

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
                : [],

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
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return carousel;
}

export async function upsertCarousel(carousel: TCarousel, userId: string) {
    const {
        author,
        settings,
        slides,
        thumbnailDataUrl,
        pdfUrl,
        publicId,
        title,
    } = carousel;

    if (carousel.id === 'new' || carousel.id === undefined) {
        const newCarousel = await db.carousel.create({
            data: {
                slides,
                settings,
                author,
                User: {
                    connect: {
                        id: userId,
                    },
                },
                thumbnailDataUrl,
                pdfUrl,
                publicId,
                title,
            },
        });

        return newCarousel;
    }

    const updatedCarousel = await db.carousel.update({
        where: {
            id: carousel.id,
        },
        data: {
            slides,
            settings,
            User: {
                connect: {
                    id: userId,
                },
            },
            author,
            thumbnailDataUrl,
            pdfUrl,
            title,
            publicId,
        },
    });

    return updatedCarousel;
}

export const createWebmFile = async (formData: FormData) => {
    try {
        console.log(formData);

        // save the formdata to a file
        const fileRaw = formData.get('audio') as File; // get the file from the formdata
        const buffer = await fileRaw.arrayBuffer(); // convert the file to an array buffer

        const file = Buffer.from(buffer);
        const fileName = `audio.webm`;
        const filePath = `audio/${fileName}`;
        fs.writeFileSync(filePath, file);

        try {
            const loader = new OpenAIWhisperAudio(filePath, {
                clientOptions: {
                    // TODO: How can we add parameters to the client?
                    // response_format: 'vtt',
                },
            });
            const docs = await loader.load();
            console.log(docs);

            return docs[0].pageContent;
        } finally {
            // Delete the file at the end
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getPexelImages = async (query: string) => {
    const pictures = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=20&locale=es-ES`,
        {
            headers: {
                Authorization: process.env.PEXELS_API_KEY,
            },
        }
    );
    const photoUrls = pictures.data.photos.map((photo: any) => {
        return photo.src.medium;
    });
    return photoUrls;
};
