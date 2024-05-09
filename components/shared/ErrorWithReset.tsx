'use client';

import Error from 'next/error';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type ErrorWithResetProps = {
    error: Error;
    reset: () => void;
    children?: React.ReactNode;
    className?: string;
};
export function ErrorWithReset({
    error,
    reset,
    children,
    className,
}: ErrorWithResetProps) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <div
            className={cn(
                `flex h-full flex-col items-center justify-center gap-8`,
                className
            )}
        >
            {children ?? (
                <div className='text-center'>
                    <h2 className='mb-2 text-xl font-semibold text-primary'>
                        Ups! Algo ha ido mal!
                    </h2>
                    <p>Por favor, vuelva a intentarlo</p>
                </div>
            )}
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Volver a intentar
            </Button>
        </div>
    );
}
