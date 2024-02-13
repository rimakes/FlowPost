'use server';

import { db } from '@/lib/prisma';
import { retryAsyncFunction, wait } from '@/lib/utils';
import { Pure, TCarousel, TLinkedinPost, TSlide } from '@/types/types';
import { LinkedinPost, Post, Prisma } from '@prisma/client';
import { MutableRefObject } from 'react';
import fs from 'fs';
import { OpenAIWhisperAudio } from 'langchain/document_loaders/fs/openai_whisper_audio';
import path from 'path';
import cloudinary from 'cloudinary';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { promptGenerateCarousel } from '../app/saved/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { SlideSchemaPrompt } from '@/types/schemas';
import { RunnableSequence } from '@langchain/core/runnables';
import image from 'next/image';

export async function createLinkedinPost(post: string) {
    const user = await db.linkedinPost.create({
        data: {
            content: post,
            author: {
                handle: 'Ricardo Sala',
                name: 'Ricardo Sala',
                pictureUrl: '/images/placeholders/user.png', // placeholder or the image of the user
            },
        },
    });
}

export async function deleteLinkedinPost(postId: string) {
    await db.linkedinPost.delete({
        where: {
            id: postId,
        },
    });
}

export async function createLinkedinCarousel(post: TLinkedinPost) {
    const model = new ChatOpenAI({
        temperature: 0.8,
        modelName: 'gpt-4-0613',
        streaming: true,
        callbacks: [
            {
                handleLLMNewToken(token) {
                    // console.log(token);
                },
            },
        ],
    });

    const promptTemplate = PromptTemplate.fromTemplate(promptGenerateCarousel);

    const parser = StructuredOutputParser.fromZodSchema(SlideSchemaPrompt);

    const chain = RunnableSequence.from([promptTemplate, model, parser]);

    console.log('Creating carousel...');

    const fn = () =>
        chain.invoke(
            {
                post: post.content,
                format_instructions: parser.getFormatInstructions(),
            },
            { tags: ['test'] }
        );

    const generatedSlides = await retryAsyncFunction(fn, 3, 1000);

    const formattedSlides = generatedSlides.map((slide) => {
        return {
            title: {
                content: slide.title,
                isShown: true,
            },
            paragraphs: [
                {
                    content: slide.paragraph,
                    isShown: true,
                },
            ],
            tagline: {
                content: '',
                isShown: false,
            },
        };
    });

    const carousel = await db.carousel.create({
        data: {
            slides: formattedSlides,
            author: {
                handle: 'Ricardo Sala',
                name: 'Ricardo Sala',
                pictureUrl: '/images/placeholders/user.png',
            },
            // REVIEW: Why cannot do set: null?
            settings: {
                colorPalette: {
                    accent: '#FF0000',
                    font: '#FFFFFF',
                    background: '#000000',
                },
                fontPalette: {
                    handWriting: 'Robotto',
                    primary: 'Robotto',
                    secondary: 'Robotto',
                },
                aspectRatio: 'PORTRAIT',
            },
        },
    });

    return carousel;
}

export async function updateCarousel(carousel: TCarousel) {
    const updatedCarousel = await db.carousel.update({
        where: {
            id: carousel.id,
        },
        data: {
            slides: carousel.slides,
            settings: carousel.settings,
        },
    });

    return updatedCarousel;
}

export const createWebmFile = async (formData: FormData) => {
    console.log(formData);
    // save the formdata to a file
    const fileRaw = formData.get('audio') as File; // get the file from the formdata
    const buffer = await fileRaw.arrayBuffer(); // convert the file to an array buffer
    const file = Buffer.from(buffer);
    const fileName = `audio.webm`;
    const filePath = `audio/${fileName}`;
    fs.writeFileSync(filePath, file);

    const loader = new OpenAIWhisperAudio(filePath, {
        clientOptions: {
            // TODO: How can we add parameters to the client?
            // response_format: 'vtt',
        },
    });
    const docs = await loader.load();
    console.log(docs);

    return docs[0].pageContent;
};
