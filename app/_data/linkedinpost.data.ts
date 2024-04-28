// db.scheduledPost.create({
//     data: {
//         linkedinPostId: postId,
//         userId,
//         date,
//         time,
//     },
// });

import { db } from '@/lib/prisma';
import {
    TBrand,
    TCarousel,
    TLinkedinPost,
    TScheduledPost,
} from '@/types/types';

export const dbCreateScheduledPost = async (
    linkedinPostId: string,
    userId: string,
    date: Date,
    time: string
) => {
    try {
        const newScheduledPost = await db.scheduledPost.create({
            data: {
                linkedinPostId,
                userId,
                date,
                time,
            },
        });

        return newScheduledPost;
    } catch (error) {
        console.error('Error creating scheduled post', error);
        throw new Error('Error creating scheduled post');
    }
};

export const deleteScheduledPost = async (linkedinPostId: string) => {
    try {
        const deletedScheduledPost = await db.scheduledPost.deleteMany({
            where: {
                linkedinPostId,
            },
        });

        return deletedScheduledPost;
    } catch (error) {
        console.error('Error deleting scheduled post', error);
        throw new Error('Error deleting scheduled post');
    }
};

export const dbDeleteLinkedinPost = async (linkedinPostId: string) => {
    try {
        const deletedLinkedinPost = await db.linkedinPost.delete({
            where: {
                id: linkedinPostId,
            },
        });

        return deletedLinkedinPost;
    } catch (error) {
        console.error('Error deleting linkedin post', error);
        throw new Error('Error deleting linkedin post');
    }
};

export const getLinkedinPosts = async (userId: string) => {
    try {
        const linkedinPosts = await db.linkedinPost.findMany({
            where: {
                userId,
            },
            include: {
                scheduledPost: true,
                carousel: true,
            },
        });

        return linkedinPosts;
    } catch (error) {
        console.error('Error getting linkedin posts', error);
        throw new Error('Error getting linkedin posts');
    }
};

export const dbUpsertLinkedinPost = async (
    post: TLinkedinPost,
    userId: string,
    carouselId?: string
) => {
    let linkedinPost: TLinkedinPost;
    const {
        id,
        content,
        author: { handle, name, pictureUrl },
    } = post;

    try {
        if (id === 'new') {
            linkedinPost = await db.linkedinPost.create({
                data: {
                    content,
                    author: {
                        handle,
                        name,
                        pictureUrl, // placeholder or the image of the user
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
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
                    userId,
                    carousel: carouselId
                        ? { connect: { id: carouselId } }
                        : undefined,
                },
            });
        }
        return linkedinPost;
    } catch (error) {
        console.error('Error upserting linkedin post', error);
        throw new Error('Error upserting linkedin post');
    }
};

export const dbDeleteCarousel = async (carouselId: string) => {
    try {
        const deletedCarousel = await db.carousel.delete({
            where: {
                id: carouselId,
            },
        });

        return deletedCarousel;
    } catch (error) {
        console.error('Error deleting carousel', error);
        throw new Error('Error deleting carousel');
    }
};

export const dbUpsertCarousel = async (carousel: TCarousel, userId: string) => {
    try {
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
                    user: {
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
                user: {
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
    } catch (error) {
        console.error('Error upserting carousel', error);
        throw new Error('Error upserting carousel');
    }
};

export const dbCreateCarouselWithBrand = async (
    post: TLinkedinPost,
    formattedSlides: any,
    userId: string,
    firstBrand: TBrand
) => {
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
};

type NewTScheduledPost = TScheduledPost & {
    linkedinPost: TLinkedinPost;
};

export async function dbGetPendingToPublishPost(startOfDay: Date, now: Date) {
    return (await db.scheduledPost.findMany({
        where: {
            date: {
                gte: startOfDay,
                lt: now,
            },
            linkedinPost: {
                published: false,
            },
        },
        include: {
            linkedinPost: true,
        },
    })) as NewTScheduledPost[];
}

export const dbUpdatePostAsPublished = async (postId: string) => {
    try {
        const updatedPost = await db.linkedinPost.update({
            where: {
                id: postId,
            },
            data: {
                published: true,
                publishedAt: new Date(),
            },
        });

        return updatedPost;
    } catch (error) {
        console.error('Error updating post as published', error);
        throw new Error('Error updating post as published');
    }
};
