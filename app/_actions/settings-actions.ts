'use server';

import { db } from '@/lib/prisma';
import { Pure } from '@/types/types';
import { Brand, Prisma } from '@prisma/client';
import {
    getFirstSettingsByUserId,
    updateIASettingsByUserId,
} from '../_data/other.data';
import { dbGetUserBrands, upsertBrand } from '../_data/brand.data';

export const upsertBrandkit = async (
    brandKit: Omit<Pure<Brand>, 'authorId'>,
    userId: string
) => {
    const newBrandkit = await upsertBrand(brandKit, userId);
    return newBrandkit;
};

export const getUserBrands = async (userId: string) => {
    const brandKits = await dbGetUserBrands(userId);
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
    const updatedSettings = await updateIASettingsByUserId(userId, iaSettings);
    return updatedSettings;
};

export const getUserSettings = async (userId: string) => {
    const settings = getFirstSettingsByUserId(userId);
    return settings;
};
