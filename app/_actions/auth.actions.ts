'use server';

import { Session } from 'next-auth';
import { getServerSession } from '@/auth';

/**
 * Check if the user is authenticated. If it's not, throw an error. If it's authenticated, return the user session.
 * It also asserts that the user session is a valid session object for type safety.
 */
export const authGuard = async () => {
    const session = await getServerSession();
    if (!session) {
        throw new Error('User not authenticated');
    }

    return session as Session;
};
