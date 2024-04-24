import { db } from '@/lib/prisma';

export const updateCreditBalance = async (
    userId: string,
    creditBalance: number
) => {
    try {
        const updatedUser = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                creditBalance,
            },
        });

        return updatedUser;
    } catch (error) {
        console.error('Error updating credit balance', error);
        throw new Error('Error updating credit balance'); // Replace this with your custom error or error handling logic
    }
};
