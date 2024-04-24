'use server';

import { aiDraw } from '@/lib/aiClients';
import { ImageWithDataUrl } from '@/types/types';

const imageGeneration = aiDraw();

export const generateImage = async (text: string) => {
    try {
        console.log('🟦 Generating image...');
        let base64: string = '';
        const image = await imageGeneration.invoke(text);
        return { url: image, dataUrl: base64 };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const generateNImages = async (text: string, n: number) => {
    const imagesPromises: Array<Promise<ImageWithDataUrl | null>> = Array(4);

    for (let i = 0; i < n; i++) {
        imagesPromises.push(generateImage(text));
    }

    const images = await Promise.all(imagesPromises);

    return images;
};
