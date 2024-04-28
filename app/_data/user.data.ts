import { db } from '@/lib/prisma';

export const dbUpdateCreditBalance = async (
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
        throw new Error('Error updating credit balance');
    }
};

export const dbGetSubscription = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        return user?.stripeSubscription;
    } catch (error) {
        console.error('Error getting subscription', error);
        throw new Error('Error getting subscription');
    }
};

export const dbGetFirstUserAccount = async (userId: string) => {
    try {
        const userAccount = await db.account.findFirst({
            where: {
                provider: 'linkedin',
                userId,
            },
        });

        return userAccount;
    } catch (error) {
        console.error('Error fetching User Account:', error);
        throw new Error('Error fetching User Account');
    }
};

export const dbGetUser = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });

        return user;
    } catch (error) {
        console.error('Error getting user', error);
        throw new Error('Error getting user');
    }
};

export interface IUser {
    dbUpdateCreditBalance: (
        userId: string,
        creditBalance: number
    ) => Promise<any>;
    dbGetSubscription: (userId: string) => Promise<any>;
    dbGetFirstUserAccount: (userId: string) => Promise<any>;
    dbGetUser: (userId: string) => Promise<any>;
}
