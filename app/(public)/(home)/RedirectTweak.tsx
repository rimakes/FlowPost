'use client';

import { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type RedirectTweakProps = {};
export function RedirectTweak(props: RedirectTweakProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) {
            router.push(callbackUrl as Route);
        }
    }, [router, searchParams]);

    return <></>;
}
