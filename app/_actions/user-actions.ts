'use server';

import { db } from '@/lib/prisma';

export const decreaseCredits = async (userId: string, amount: number) => {
    const updatedUser = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            creditBalance: {
                decrement: amount,
            },
        },
    });

    return updatedUser;
};
