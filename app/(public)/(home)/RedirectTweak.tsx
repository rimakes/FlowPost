'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

type RedirectTweakProps = {};
export function RedirectTweak(props: RedirectTweakProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) {
            router.push(callbackUrl);
        }
    }, [router, searchParams]);

    return <></>;
}
