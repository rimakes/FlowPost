'use server';

import { getServerSession } from '@/auth';

export const ensureAuthenticated = async () => {
    const session = await getServerSession(); // your function to retrieve the session
    if (!session || !session.user) {
        throw new Error('User is not authenticated');
    }
    return session;
};
