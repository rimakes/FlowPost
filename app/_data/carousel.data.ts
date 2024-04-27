import { db } from '@/lib/prisma';

export const dbGetCarousel = async (carouselId: string) => {
    try {
        const carousel = await db.carousel.findUnique({
            where: {
                id: carouselId,
            },
        });

        return carousel;
    } catch (error) {
        console.error('Error getting carousel', error);
        throw new Error('Error getting carousel'); // Replace this with your custom error or error handling logic
    }
};

export const dbGetCarouselByUserId = async (userId: string) => {
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
