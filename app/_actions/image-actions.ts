'use server';

import { ImageWithDataUrl } from '@/types/types';
import { DallEAPIWrapper } from '@langchain/openai';
import { getPlaiceholder } from 'plaiceholder';

const imageGeneration = new DallEAPIWrapper({
    n: 1, // Default
    modelName: 'dall-e-3', // Default
    openAIApiKey: process.env.OPENAI_API_KEY, // Default
    quality: 'standard', // Default
});

export const generateImage = async (text: string) => {
    try {
        console.log('🟦 Generating image...');
        let base64: string = '';
        const image = await imageGeneration.invoke(text);
        // TODO: It's taking waaaay to long to cerate the base64 url
        // console.log('🟩 Image generated...');
        // const res = await fetch(image, {
        //     cache: 'no-store',
        // });
        // console.log('🟩 Image fetched...');

        // const arrayBuffer = await res.arrayBuffer();
        // console.log('🟩 Image to arrayBuffer...');

        // const buffer = Buffer.from(arrayBuffer);
        // console.log('🟩 Image to buffer...');

        // base64  = await getPlaiceholder(buffer);
        // console.log('🟩 Image to...');

        return { url: image, dataUrl: base64 };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const generateNImages = async (text: string, n: number) => {
    const imagesPromises: Array<Promise<ImageWithDataUrl | null>> = Array(4);

    for (let i = 0; i < n; i++) {
        console.log('calling generateImage');
        imagesPromises.push(generateImage(text));
    }

    const images = await Promise.all(imagesPromises);

    console.log('🟩 Images generated...', images);

    return images;
};
