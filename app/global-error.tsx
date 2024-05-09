'use client';

import Error from 'next/error';
import { ErrorWithReset } from '@/components/shared/ErrorWithReset';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <>
            <html>
                <body>
                    <ErrorWithReset reset={reset} error={error} />;
                </body>
            </html>
        </>
    );
}
