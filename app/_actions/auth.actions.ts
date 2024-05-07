'use server';

import { Session } from 'next-auth';
import { getServerSession } from '@/auth';

/**
 * Check if the user is authenticated. If it's not, throw an error. If it's authenticated, return the user session.
 * It also asserts that the user session is a valid session object for type safety.
 */
export const authGuard = async (isDemo = false) => {
    const session = await getServerSession();
    if (!session && !isDemo) {
        throw new Error('User not authenticated');
    }

    if (isDemo) {
        return {
            user: {
                id: process.env.DEMO_USER_ID!,
            },
        } as Session;
    }

    return session as Session;
};
