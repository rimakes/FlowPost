'use client';

import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Message } from './Message';
import { SocialLogin } from './SocialLogin';
import { apiClient } from '@/lib/apiClient';
import { RegisterReq } from '@/app/api/register/route';
import { registerFormSchema } from '@/schemas/auth-schemas';

export function RegisterForm({}) {
    const form = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: 'ricardo@grouz.io',
            name: 'Ricardo',
            password: '88888888',
            confirmPassword: '88888888',
        },
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
        setError(null);

        const body: RegisterReq<'CREATE'> = {
            action: 'CREATE',
            data: {
                email: values.email,
                name: values.name,
                password: values.password,
                confirmPassword: values.confirmPassword,
            },
        };
        return apiClient
            .post('/register', body)
            .then((res) => {
                signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    callbackUrl: '/app',
                });
            })
            .then(() => {
                toast.success('Cuenta creada con éxito', {});
            })
            .catch((error) => {
                // @ts-ignore
                console.log('CUSTOM', error.response.data.error);
                // @ts-ignore
                setError(error.response.data.error);
                toast.error('Error al crear la cuenta', {});
            });
    };

    return (
        <div className='flex flex-col gap-4'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>e-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu email'
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                        Email con el que te diste de alta en TATTUO
                                    </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu nombre'
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                        Para hacer todo un poco más personal!
                                    </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu contraseña'
                                        {...field}
                                        type='password'
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                        Si no la recuerdas, escríbenos a hello@tattuo.com.
                                    </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirma tu contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu contraseña'
                                        {...field}
                                        type='password'
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                        Así te aseguras que la has escrito bien.
                                    </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <Message variant={'error'}>{error}</Message>}
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting}
                        className='w-full'
                    >
                        {form.formState.isSubmitting ? (
                            <div className='flex flex-row gap-2'>
                                Registrando
                            </div>
                        ) : (
                            `Registrar`
                        )}
                    </Button>
                </form>
            </Form>

            <Separator />
            <SocialLogin />
        </div>
    );
}
