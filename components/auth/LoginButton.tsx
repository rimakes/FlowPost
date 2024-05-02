'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { SwitchLogin } from './SwithLogin';
import { SocialLogin } from './SocialLogin';
import { cn } from '@/lib/utils';

type LoginButtonProps = {
    mode: 'modal' | 'redirect';
    children: React.ReactNode;
    className?: string;
};

export function LoginButton({ mode, children, className }: LoginButtonProps) {
    const router = useRouter();
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('/auth/signin');
    }, [router]);

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
            <Dialog
                open={isOpen}
                onOpenChange={(isOpen) => {
                    if (session.data?.user) return router.push('/app');
                    setIsOpen(isOpen);
                }}
            >
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <>
                        <Suspense>
                            <LoginForm isRedirected={true} />
                            <SocialLogin />
                        </Suspense>
                        <SwitchLogin signUp resetPassword />
                    </>
                </DialogContent>
            </Dialog>
        );
}
