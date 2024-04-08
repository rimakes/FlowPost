'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { apiClient } from '@/lib/apiClient';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

type AccountButtonProps = {};
export function AccountButton({}: AccountButtonProps) {
    const [status, setStatus] = useState('idle');

    const navigateToPortal = async () => {
        setStatus('loading');

        try {
            const res = await apiClient.post('/stripe/portal', {
                returnUrl: window.location.href,
            });

            window.location.href = res.data.url;
        } catch (e: any) {
            console.error(e);
            const error: Error = e;
            if ((error.name = 'AxiosError')) {
                const axiosError = error as AxiosError;
                toast.error(
                    // @ts-ignore
                    axiosError.response?.data.error ||
                        'An error occurred. Please try again.'
                );
            }
        }

        setStatus('idle');
    };

    return <Button onClick={navigateToPortal}>Ver plan</Button>;
}
