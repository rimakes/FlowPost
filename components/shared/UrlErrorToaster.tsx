'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { wait } from '@/lib/utils';
import { errors } from '@/config/const';

type UrlErrorToasterProps = {};
export function UrlErrorToaster({}: UrlErrorToasterProps) {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        error &&
            wait(1).then(() => {
                toast.error(errors[error as keyof typeof errors] || 'Error');
                router.replace(pathName);
            });
    }, [error, pathName, router]);

    return <></>;
}
