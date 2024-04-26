'use client';

// BOILER: Message component updated

// import zod
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Message } from './Message';
import { signInFormSchema } from '@/schemas/auth-schemas';
import { appConfig } from '@/config/shipper.appconfig';
import { errors } from '@/config/const';

type LoginFormProps = {
    isRedirected?: boolean;
    onAuth?: () => void;
};

export function LoginForm({ isRedirected = false, onAuth }: LoginFormProps) {
    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            // password: '88888888k',
        },
    });

    const [errorRes, setErrorRes] = useState<string | null>(null);

    // get the callbackUrl from query params
    const query = useSearchParams();
    const callbackUrl = query.get('callbackUrl');
    const error = query.get('error');

    const { isSubmitted, isSubmitSuccessful } = form.formState;

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        try {
            const res = await signIn('email', {
                ...values,
                // redirect: isRedirected,
                redirect: false,
                callbackUrl:
                    // Send the user to where he was before or the default route
                    callbackUrl || appConfig.routes.defaultLogingRedirect,
            });

            if (res!.error) {
                setErrorRes(res!.error);
            } else {
                onAuth && onAuth();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>e-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={`ricardo@${appConfig.general.appDomain}`}
                                        {...field}
                                        autoComplete='email'
                                    />
                                </FormControl>
                                <FormDescription>
                                    {`Email de tu usuario en ${appConfig.general.appName}`}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu contraseña'
                                        {...field}
                                        autoComplete='current-password'
                                        type='password'
                                    />
                                </FormControl>
                                <FormDescription>
                                    {`Si no la recuerdas, escríbenos a
                                    ${appConfig.email.supportEmail}`}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {(errors[errorRes as TSigninErrors] ||
                        errors[error as TSigninErrors]) && (
                        <Message variant={'error'}>
                            {errors[errorRes as TSigninErrors] ||
                                errors[error as TSigninErrors]}
                        </Message>
                    )} */}

                    {isSubmitSuccessful && (
                        <Message variant={'info'}>
                            <p>
                                📩 Te hemos enviado un correo con tu link para
                                entrar. Revisa tu bandeja de entrada. <br />
                                <span className='text-xs'>
                                    {' '}
                                    Si no has recibido nada, ¿es el mail que
                                    usaste para registrarte?
                                </span>
                            </p>
                        </Message>
                    )}
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting}
                        className='w-full'
                    >
                        {form.formState.isSubmitting ? (
                            <div className='flex flex-row gap-2'>Enviando</div>
                        ) : (
                            `Enviar link`
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

type TSigninErrors = keyof typeof errors;

type SignInErrorProps = {
    error: string;
};
const SignInError = ({ error }: SignInErrorProps) => {
    const errorMessage = error;
    return <div>error: {errorMessage}</div>;
};
