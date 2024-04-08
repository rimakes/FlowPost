export const metadata = {
    title: 'Sign In - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import { LoginForm } from '@/components/auth/LoginForm';
import { Message } from '@/components/auth/message';
import { SwitchLogin } from '@/components/auth/SwithLogin';
import { Suspense } from 'react';

export default function SignIn() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='max-w-sm mx-auto w-full px-4 py-8 space-y-4'>
                            {/* Form */}

                            <Suspense>
                                <LoginForm />
                            </Suspense>
                            {/* Footer */}
                            <SwitchLogin signUp resetPassword />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}
