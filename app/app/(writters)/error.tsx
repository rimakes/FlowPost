'use client';

import TError from 'next/error';
import { ErrorWithReset } from '@/components/shared/ErrorWithReset';

export default function Error({
    error,
    reset,
}: {
    error: TError & { digest?: string };
    reset: () => void;
}) {
    return <ErrorWithReset reset={reset} error={error} />;
}
