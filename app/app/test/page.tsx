'use client';

import { TPageProps } from '@/types/types';
import { Button } from '@ui/button';

export default function Page({ params, searchParams }: TPageProps) {
    return (
        <div>
            <Button
                onClick={() => {
                    console.log('clicked');
                    throw new Error('error');
                }}
            >
                error here{' '}
            </Button>
        </div>
    );
}
