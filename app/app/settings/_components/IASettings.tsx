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
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { saveIASettings } from '@/app/_actions/settings-actions';
import { Message } from '@/components/auth/message';
import { appConfig } from '@/config/shipper.appconfig';

const iaSettingsSchema = z.object({
    autoPostGeneration: z.boolean(),
    shortBio: z.string(),
    topics: z.string(), //TODO: in the future, this should be an array of strings
    other: z.string(),
});

type IaSettings = z.infer<typeof iaSettingsSchema>;

export const IASettings = ({
    userIaSettings,
}: {
    userIaSettings?: IaSettings;
}) => {
    const { data: session } = useSession();
    const [status, setStatus] = useState<TStatus>('idle');

    const form = useForm({
        resolver: zodResolver(iaSettingsSchema),
        defaultValues: {
            autoPostGeneration: true,
            shortBio: userIaSettings?.shortBio || '',
            topics: userIaSettings?.topics || '',
            other: userIaSettings?.other || '',
        },
    });

    const onSubmit = async (data: IaSettings) => {
        setStatus('loading');
        toast.promise(saveIASettings(session?.user.id!, data), {
            loading: 'Guardando configuración',
            success: 'Configuración guardada',
            error: 'Error al guardar la configuración',
            finally: () => {
                setStatus('idle');
            },
        });
    };

    const onError = (error: any) => {
        toast('Error al guardar la configuración', {});
    };
    return (
        <>
            <SettingsSectionHeader
                title='Configura tu IA'
                subtitle='Creará contenido para ti basado en tus preferencias'
            />
            <div className='max-w-md mt-4'>
                <Message className='mb-4'>
                    <p>
                        Configurar tu IA puede dar lugar a resultados
                        repetitivos.
                    </p>
                    <p>
                        Si quieres más variedad, incluye varios temas y déjalo
                        muy abierto, o no pongas preferencias
                    </p>
                </Message>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className='flex flex-col gap-4 items-stretch'
                    >
                        <FormField
                            control={form.control}
                            name='shortBio'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Breve descripción de quién eres
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`Copywritter en ${appConfig.general.appName}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        La IA lo utilizará para personalizar el
                                        contenido que escriba
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='topics'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        ¿Sobre qué quieres escribir?
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ecommerce, Marketing, Tecnología'
                                            {...field}
                                            className=''
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        La IA lo utilizará para darte ideas de
                                        contenido
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='other'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        ¿Algo más que quieres que tengamos en
                                        cuenta?
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Vendo un curso de copywriting y quiero que la IA me ayude a promocionarlo.'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        La IA intentará tenerlo en cuenta al
                                        crear contenido
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-4'>
                            Guardar
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};
