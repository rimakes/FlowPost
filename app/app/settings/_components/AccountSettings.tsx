'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SettingsSectionHeader } from './SettingsSectionHeader';
import { TStatus } from '@/types/types';
import { SettingsRes } from '@/app/api/settings/[userId]/route';
import { wait } from '@/lib/utils';

const generalSettingsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});

export type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

export const AccountSettings = () => {
    const { data: session, update } = useSession();
    const user = session?.user;

    const [status, setStatus] = useState<TStatus>('idle');

    const form = useForm({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            image: user?.image || '',
        },
    });

    const onSubmit = async (values: GeneralSettingsForm) => {
        setStatus('loading');
        const res = await fetch(`/api/settings/${session?.user.id}`, {
            method: 'POST',
            body: JSON.stringify({ action: 'GENERAL', data: values }),
        });

        if (res.ok) {
            const data: SettingsRes<'GENERAL'> = await res.json();
            // @ts-ignore
            const { name } = data.data;
            setStatus('success');
            await update({ ...user, name });
        }
    };

    return (
        <>
            <SettingsSectionHeader
                title='Configuración general'
                subtitle='Configura tu cuenta'
            />
            <div className='max-w-md mt-4'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-2'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ej. Juan'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='ricardo@flowpost.io'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='mt-4'
                            disabled={status === 'loading'}
                        >
                            {status !== 'loading' ? 'Guardar' : 'Guardando...'}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};
