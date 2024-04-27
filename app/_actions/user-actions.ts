'use server';

import {
    dbGetFirstUserAccount,
    dbGetSubscription,
    updateCreditBalance,
} from '../_data/user.data';

export const updateUserCredits = async (
    userId: string,
    creditBalance: number
) => {
    const updatedUser = await updateCreditBalance(userId, creditBalance);
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
