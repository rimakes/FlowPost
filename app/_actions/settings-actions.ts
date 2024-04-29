'use server';

import { Brand, Prisma } from '@prisma/client';
import {
    getFirstSettingsByUserId,
    updateIASettingsByUserId,
} from '../_data/other.data';
import {
    dbDeleteBrand,
    dbGetUserBrands,
    dbUpsertBrand,
} from '../_data/brand.data';
import { Pure } from '@/types/types';

export const upsertBrand = async (
    brandKit: Omit<Pure<Brand>, 'authorId'>,
    userId: string
) => {
    const newBrandkit = await dbUpsertBrand(brandKit, userId);
    return newBrandkit;
};

export const getUserBrands = async (userId: string) => {
    const brandKits = await dbGetUserBrands(userId);
    return brandKits;
};

export const deleteBrand = async (brandId: string) => {
    const brand = await dbDeleteBrand(brandId);
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
