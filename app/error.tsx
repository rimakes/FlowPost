'use client';

import { useEffect } from 'react';
import { ErrorWithReset } from '@/components/shared/ErrorWithReset';

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
