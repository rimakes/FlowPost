export const metadata = {
    title: 'Sign In - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { LoginForm } from '@/components/auth/LoginForm';
import { Message } from '@/components/auth/Message';
import { SwitchLogin } from '@/components/auth/SwithLogin';
import { Suspense } from 'react';
import { SocialLogin } from '@/components/auth/SocialLogin';

export default function SignIn() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='max-w-sm mx-auto w-full px-4 py-8 space-y-4'>
                            <h1 className='text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6'>
                                Bienvenid@ de vuelta ✨
                            </h1>
                            {/* Form */}

                            <Suspense>
                                <LoginForm />
                                <SocialLogin />
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
