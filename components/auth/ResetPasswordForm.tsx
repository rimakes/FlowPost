'use client';

// import zod
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
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
import { resetPasswordFormSchema } from '@/schemas/auth-schemas';
import { appConfig } from '@/config/shipper.appconfig';

type ResetPasswordFormProps = {
    defaultValues?: {
        email: string;
    };
};

export function ResetPasswordForm({ defaultValues }: ResetPasswordFormProps) {
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: defaultValues || {
            email: 'ricardo@grouz.io',
        },
    });

    // @ts-ignore
    const onSubmit = async (values) => {
        toast.promise(
            signIn('email', {
                callbackUrl: appConfig.routes.defaultLogingRedirect,
                email: 'ricardo@grouz.io',
                redirect: false,
            }),
            {
                loading: 'Enviando link...',
                success: 'Link enviado, por favor revisa tu correo',
                error: 'Error al enviar el link',
            }
        );
    };

    return (
        <>
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
                                        placeholder='Aquí va tu email'
                                        {...field}
                                        autoComplete='email'
                                    />
                                </FormControl>
                                <FormDescription>
                                    Email con el que te diste de alta en{' '}
                                    {appConfig.general.appName}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <div className='flex flex-row gap-2'>
                                Enviando link
                            </div>
                        ) : (
                            `Enviar link`
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}
