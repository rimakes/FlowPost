'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { cn } from '@/lib/utils';
import { SwitchLogin } from './SwithLogin';
import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

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
                // BOILER: isOpen and onOpenChange updated so it redirects to app if user is logged in
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
                        </Suspense>
                        <SwitchLogin signUp resetPassword />
                    </>
                </DialogContent>
            </Dialog>
        );
}
