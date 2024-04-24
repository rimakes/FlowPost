'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { wait } from '@/lib/utils';
import { errors } from '@/config/const';
import { Route } from 'next';

type UrlErrorToasterProps = {};
export function UrlErrorToaster({}: UrlErrorToasterProps) {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        error &&
            wait(1).then(() => {
                console.log({ error });
                toast.error(errors[error as keyof typeof errors] || 'Error');
                router.replace(pathName as Route);
            });
    }, [error, pathName, router]);

    return <></>;
}
