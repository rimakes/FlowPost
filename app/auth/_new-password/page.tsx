export const metadata = {
    title: 'Reset Password - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../AuthHeader';
import AuthImage from '../AuthImage';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPassword() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='flex h-full min-h-[100dvh] flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='mx-auto w-full max-w-sm px-4 py-8'>
                            <h1 className='mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100'>
                                Actualiza tu contraseña ✨
                            </h1>
                            {/* Form */}
                            <ResetPasswordForm />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}
