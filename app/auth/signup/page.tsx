export const metadata = {
    title: 'Sign Up - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SwitchLogin } from '@/components/auth/SwithLogin';
import { LoginForm } from '@/components/auth/LoginForm';
import { Suspense } from 'react';
import { SocialLogin } from '@/components/auth/SocialLogin';

export default function SignUp() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='max-w-sm mx-auto w-full px-4 py-8'>
                            <h1 className='text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6'>
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
