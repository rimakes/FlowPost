'use server';

import { db } from '@/lib/prisma';
import { Pure } from '@/types/types';
import { Brand, Prisma } from '@prisma/client';

export const saveBrandKit = async (
    brandKit: Omit<Pure<Brand>, 'authorId'>,
    userId: string
) => {
    let dbBrand;
    console.log(brandKit, userId);
    if (brandKit.id === 'new') {
        console.log('is new');
        dbBrand = db.brand.create({
            data: {
                ...brandKit,
                id: undefined,
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

export const saveIASettings = async (
    userId: string,
    iaSettings: Prisma.IaSettingsCreateInput
) => {
    console.log('saving settings', iaSettings);
    // TODO: This should be an upsert, but there is the problem with null in mongodb...
    const updatedSettings = await db.settings.updateMany({
        where: {
            user: {
                id: userId,
            },
        },
        data: {
            iaSettings: iaSettings,
        },
    });

    return updatedSettings;
};

export const getUserSettings = async (userId: string) => {
    const settings = db.settings.findFirst({
        where: {
            user: {
                id: userId,
            },
        },
    });

    return settings;
};
