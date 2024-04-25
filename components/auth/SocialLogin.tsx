'use client';

import { Separator } from '@radix-ui/react-separator';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { appConfig } from '@/config/shipper.appconfig';

export function SocialLogin({}) {
    return (
        <div className='flex w-full flex-col items-center space-y-2'>
            <Separator />
            <h4>Entra en {appConfig.general.appName} con </h4>
            {/* <Button
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
            </Button> */}
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
