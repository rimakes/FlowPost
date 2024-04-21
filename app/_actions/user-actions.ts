'use server';

import { db } from '@/lib/prisma';

export const updateUserCredits = async (
    userId: string,
    creditBalance: number
) => {
    const updatedUser = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            creditBalance,
        },
    });

    return updatedUser;
};
