'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Error from 'next/error';
import { ErrorWithReset } from '@/components/shared/ErrorWithReset';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <>
            <html>
                <body>
                    <ErrorWithReset reset={reset} />;
                </body>
            </html>
        </>
    );
}
