import { UserRole } from '@prisma/client';
import { db } from '@/lib/prisma';

export const register = async (
    name: string,
    email: string,
    hashedPassword: string | undefined = undefined,
    role: UserRole = 'USER'
) => {
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
};
