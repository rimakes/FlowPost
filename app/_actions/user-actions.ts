'use server';

import {
    dbGetFirstUserAccount,
    dbGetSubscription,
    dbGetUser,
    dbUpdateCreditBalance,
} from '../_data/user.data';

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
