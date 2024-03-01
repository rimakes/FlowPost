'use server';

import { db } from '@/lib/prisma';
import { Pure } from '@/types/types';
import { Brand } from '@prisma/client';

export const saveBrandKit = async (
    brandKit: Omit<Pure<Brand>, 'authorId'>,
    userId: string
) => {
    let dbBrand;
    console.log(brandKit, userId);
    if (brandKit.id === 'new') {
        console.log('is new');
        // @ts-ignore
        delete brandKit.id;
        dbBrand = db.brand.create({
            data: {
                ...brandKit,
                authorId: userId,
            },
        });
    } else {
        dbBrand = db.brand.update({
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
};

export const getUserBrandKits = async (userId: string) => {
    const brandKits = db.brand.findMany({
        where: {
            authorId: userId,
        },
    });

    return brandKits;
};

export const deleteBrand = async (brandId: string) => {
    const brand = db.brand.delete({
        where: {
            id: brandId,
        },
    });

    return brand;
};

export const saveIASettings = async () => {};
