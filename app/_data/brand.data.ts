import { Brand } from '@prisma/client';
import { db } from '@/lib/prisma';
import { Pure } from '@/types/types';

export const upsertBrand = async (
    brandKit: Omit<Pure<Brand>, 'authorId'>,
    userId: string
) => {
    let dbBrand;

    try {
        if (brandKit.id === 'new') {
            console.log('is new');
            dbBrand = await db.brand.create({
                data: {
                    ...brandKit,
                    id: undefined,
                    authorId: userId,
                },
            });
        } else {
            dbBrand = await db.brand.update({
                where: {
                    id: brandKit.id,
                },
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    colorPalette: brandKit.colorPalette,
                    fontPalette: brandKit.fontPalette,
                    handle: brandKit.handle,
                    name: brandKit.name,
                    imageUrl: brandKit.imageUrl,
                },
            });
        }

        return dbBrand;
    } catch (error) {
        console.error('Error upserting brand', error);
        throw new Error('Error upserting brand'); // Replace this with your custom error or error handling logic
    }
};

export const dbGetUserBrands = async (userId: string) => {
    try {
        const brandKits = await db.brand.findMany({
            where: {
                authorId: userId,
            },
        });

        return brandKits;
    } catch (error) {
        console.error('Error getting brand kits', error);
        throw new Error('Error getting brand kits'); // Replace this with your custom error or error handling logic
    }
};

export const getFirstBrand = async (userId: string) => {
    try {
        const brand = await db.brand.findFirst({
            where: {
                authorId: userId,
            },
        });

        return brand;
    } catch (error) {
        console.error('Error getting first brand', error);
        throw new Error('Error getting first brand'); // Replace this with your custom error or error handling logic
    }
};
