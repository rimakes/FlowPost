export const metadata = {
    title: 'Sign In - Mosaic',
    description: 'Page description',
};

import { Suspense } from 'react';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { LoginForm } from '@/components/auth/LoginForm';
import { SwitchLogin } from '@/components/auth/SwithLogin';
import { SocialLogin } from '@/components/auth/SocialLogin';

export default function SignIn() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='flex h-full min-h-[100dvh] flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='mx-auto w-full max-w-sm space-y-4 px-4 py-8'>
                            <h1 className='mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100'>
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
