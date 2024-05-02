'use server';

import { UserRole } from '@prisma/client';
import {
    dbGetFirstUserAccount,
    dbGetSubscription,
    dbGetUser,
    dbGetUserByEmail,
    dbRegister,
    dbUpdateCreditBalance,
} from '../_data/user.data';

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
