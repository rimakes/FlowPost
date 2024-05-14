'use server';

import { Prisma, UserRole } from '@prisma/client';
import { PromptTemplate } from '@langchain/core/prompts';
import {
    dbCreateWrittingStyle,
    dbGetFirstUserAccount,
    dbGetSubscription,
    dbGetUser,
    dbGetUserByEmail,
    dbGetWrittingStyleById,
    dbGetWrittingStylesByUserId,
    dbRegister,
    dbUpdateCreditBalance,
} from '../_data/user.data';
import { aiChat } from '@/lib/aiClients';
import { createWrittingStylePrompt } from '@/app/app/settings/writting-styles/config/prompts';
import { getServerSession } from '@/auth';
import { TWrittingStyle } from '@/types/types';

export const register = async (
    name: string,
    email: string,
    hashedPassword: string | undefined = undefined,
    role: UserRole = 'USER'
) => {
    const user = await dbRegister(name, email, hashedPassword, role);

    return user;
};

export const updateUserCredits = async (
    userId: string,
    creditBalance: number
) => {
    const updatedUser = await dbUpdateCreditBalance(userId, creditBalance);
    return updatedUser;
};

export const getSubscription = async (userId: string) => {
    const subscription = await dbGetSubscription(userId);
    return subscription;
};

export const getFirstUserAccount = async (userId: string) => {
    const userAccount = await dbGetFirstUserAccount(userId);
    return userAccount;
};

export const getUser = async (userId: string) => {
    const userAccount = await dbGetUser(userId);
    return userAccount;
};

export const getUserByEmail = async (email: string) => {
    const user = await dbGetUserByEmail(email);
    return user;
};

export const getWrittingStyles = async (userId: string) => {
    const writtingStyles = await dbGetWrittingStylesByUserId(userId);
    return writtingStyles;
};

export const getWrittingStyleById = async (id: string) => {
    const writtingStyle = await dbGetWrittingStyleById(id);
    return writtingStyle;
};

export const saveWritingStyle = async (
    writingStyleSettings: Omit<Prisma.WrittingStyleCreateInput, 'user'>
) => {
    const session = await getServerSession();

    const updatedSettings = await dbCreateWrittingStyle(
        session?.user!.id!,
        writingStyleSettings
    );
    return updatedSettings;
};

export const createWrittingStyle = async (writtingStyle: TWrittingStyle) => {
    const model = aiChat('writter');

    const promptTemplate = PromptTemplate.fromTemplate(
        createWrittingStylePrompt
    );

    const chain = promptTemplate.pipe(model);

    console.log('Creating writting style');
    const newStyle = await chain.invoke({
        postsForAnalysis: writtingStyle.inputs.posts.join(
            '\n\n\n----------------\n\n\n'
        ),
    });

    const dbStyle = await saveWritingStyle({
        id: writtingStyle.id,
        name: writtingStyle.name,
        description: newStyle.content.toString(),
        inputs: {
            posts: writtingStyle.inputs.posts,
        },
    });

    return dbStyle;
};
