export const metadata = {
    title: 'Sign Up - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import { RegisterForm } from '@/components/auth/register-form';
import { SwitchLogin } from '@/components/auth/SwithLogin';

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
                            <RegisterForm />
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
