'use server';

import { updateCreditBalance } from '../_data/user.data';

export const updateUserCredits = async (
    userId: string,
    creditBalance: number
) => {
    const updatedUser = await updateCreditBalance(userId, creditBalance);
    return updatedUser;
};
