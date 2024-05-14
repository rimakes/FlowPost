import { Prisma, UserRole } from '@prisma/client';
import { db } from '@/lib/prisma';

export const dbRegister = async (
    name: string,
    email: string,
    hashedPassword: string | undefined = undefined,
    role: UserRole = 'USER'
) => {
    try {
        const user = await db.user.create({
            data: {
                email,
                name,
                hashedPassword,
                role,
                settings: {
                    create: {
                        schedule: [],
                    },
                },
            },
        });
        return user;
    } catch (error) {
        console.error('Error registering user', error);
        throw new Error('Error registering user');
    }
};

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

export const dbGetUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({
            where: { email },
        });

        return user;
    } catch (error) {
        console.error('Error getting user by email', error);
        throw new Error('Error getting user by email');
    }
};

export const dbGetWrittingStylesByUserId = async (userId: string) => {
    try {
        const writtingStyles = await db.writtingStyle.findMany({
            where: { userId },
        });

        return writtingStyles;
    } catch (error) {
        console.error('Error getting writting styles', error);
        throw new Error('Error getting writting styles');
    }
};

export const dbGetWrittingStyleById = async (id: string) => {
    try {
        const writtingStyle = await db.writtingStyle.findUnique({
            where: { id },
        });

        return writtingStyle;
    } catch (error) {
        console.error('Error getting writting style', error);
        throw new Error('Error getting writting style');
    }
};

export const dbCreateWrittingStyle = async (
    userId: string,
    writingStyleSettings: Omit<Prisma.WrittingStyleCreateInput, 'user'>
) => {
    try {
        const updatedSettings = await db.writtingStyle.create({
            data: {
                ...writingStyleSettings,
                userId,
            },
        });

        return updatedSettings;
    } catch (error) {
        console.error('Error creating writting style', error);
        throw new Error('Error creating writting style');
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
