'use server';

import { Session } from 'next-auth';
import { getServerSession } from '@/auth';

type UserSession = Session | { user: { id: string } };

export const authGuard = async (isDemo = false) => {
    try {
        let session: UserSession | null = await getServerSession(); // your function to retrieve the session
        if (!!session) return session;

        if (!session && !isDemo) {
            throw new Error('User is not authenticated');
        }

        if (!session && isDemo) {
            session = {
                user: {
                    id: process.env.DEMO_USER_ID!,
                },
            };

            return session;
        }
    } catch (error) {
        console.error('Error getting session', error);
        throw new Error('Error getting session'); // Replace this with your custom error or error handling logic
    }
};
