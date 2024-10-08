'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { Message } from '@/components/auth/Message';
import { appConfig } from '@/config/shipper.appconfig';

export const EmailSendMessage = ({ email }: { email: string }) => {
    // TODO: check if the email is sent more than once...
    const memoizedEmail = useMemo(() => email, [email]);
    // REVIEW: is this really the best way to handle this?
    const [isEmailSent, setIsEmailSent] = useState(false);

    useEffect(() => {
        if (isEmailSent) return;
        signIn('email', {
            callbackUrl: appConfig.routes.defaultLogingRedirect,
            email: 'ricardo@grouz.io',
            redirect: false,
        });
    }, [isEmailSent, memoizedEmail]);

    return (
        <>
            <div className='mb-6 text-center'>
                <h1 className='mb-2 text-3xl font-bold text-slate-800 dark:text-slate-100'>
                    📩 Te hemos mandado un correo a {email}
                </h1>
                <p className='text-lg text-primary/50'>
                    (Revisa la bandeja de spam si no lo localizas)
                </p>
            </div>
            <Message variant={'info'} className='mb-4'>
                En el correo encontrarás un enlace para loguearte a tu cuenta.
            </Message>
            {/* Form */}
            <p className='text-primary/50'>
                ¿Necesitas que te lo enviemos de nuevo?
            </p>
        </>
    );
};
