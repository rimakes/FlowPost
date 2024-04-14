'use client';

import { Separator } from '@radix-ui/react-separator';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export function SocialLogin({}) {
    return (
        <div className='flex flex-col items-center space-y-2 w-full'>
            <Separator />
            <h4>También puedes acceder con</h4>
            <Button
                variant='outline'
                type='button'
                className='w-full'
                onClick={async () => {
                    const res = await signIn('google', {
                        callbackUrl: '/app',
                        redirect: true,
                    });
                }}
            >
                Google
            </Button>
            <Button
                variant='outline'
                type='button'
                className='w-full'
                onClick={async () => {
                    const res = await signIn('linkedin', {
                        callbackUrl: '/app',
                    });
                    console.log({ res });
                }}
            >
                {
                    //TODO: review callback después de logearse con google
                }
                Linkedin
            </Button>
        </div>
    );
}
