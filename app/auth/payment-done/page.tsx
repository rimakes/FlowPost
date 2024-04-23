export const metadata = {
    title: 'Reset Password - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Message } from '@/components/auth/Message';
import { TPageProps } from '@/types/types';
import { db } from '@/lib/prisma';
import { findCheckoutSession } from '@/lib/stripe';
import { EmailSendMessage } from './EmailSendMessage';

const getUserByCustomerId = async (customerId: string) => {
    const user = await db.user.findFirst({
        where: {
            stripeCustomerId: customerId,
        },
    });

    return user;
};

export default async function ResetPassword({
    params,
    searchParams,
}: TPageProps) {
    const sessionId = searchParams['session_id'] as string;
    const session = await findCheckoutSession(sessionId);

    // const user = await getUserByCustomerId(customerId);

    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />
                        <div className='max-w-md mx-auto w-full px-4 py-8'>
                            <EmailSendMessage
                                email={session!.customer_details?.email!}
                            />
                            <ResetPasswordForm
                                defaultValues={{
                                    email: session!.customer_details?.email!,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}
