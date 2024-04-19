'use client';

import { ErrorWithReset } from '@/components/shared/ErrorWithReset';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        // console.error(error);
    }, [error]);

    return <ErrorWithReset reset={reset} />;
}
