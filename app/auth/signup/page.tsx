export const metadata = {
    title: 'Sign Up - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import { Suspense } from 'react';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SwitchLogin } from '@/components/auth/SwithLogin';
import { LoginForm } from '@/components/auth/LoginForm';
import { SocialLogin } from '@/components/auth/SocialLogin';

export default function SignUp() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='flex h-full min-h-[100dvh] flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='mx-auto w-full max-w-sm px-4 py-8'>
                            <h1 className='mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100'>
                                Crea tu cuenta ✨
                            </h1>
                            {/* Form */}
                            {/* <RegisterForm /> */}
                            <Suspense>
                                {/* <LoginForm /> */}
                                <SocialLogin />
                            </Suspense>
                            {/* Footer */}
                            <SwitchLogin signIn className='mt-5' />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}
