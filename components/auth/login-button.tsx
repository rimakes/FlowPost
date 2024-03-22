'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';
import { cn } from '@/lib/utils';
import { SwitchLogin } from './SwithLogin';

type LoginButtonProps = {
    mode: 'modal' | 'redirect';
    children: React.ReactNode;
    className?: string;
};

export function LoginButton({ mode, children, className }: LoginButtonProps) {
    const router = useRouter();

    if (mode === 'redirect')
        return (
            <span
                onClick={() => {
                    router.push(`/auth/signin`);
                }}
                className={cn(`w-full`, className)}
            >
                {children}
            </span>
        );

    if (mode === 'modal')
        return (
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <>
                        <LoginForm isRedirected={true} />
                        <SwitchLogin signUp resetPassword />
                    </>
                </DialogContent>
            </Dialog>
        );
}
