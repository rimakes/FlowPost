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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SettingsSectionHeader } from './SettingsSectionHeader';

const iaSettingsSchema = z.object({
    autoPostGeneration: z.boolean(),
    shortBio: z.string(),
    topics: z.array(z.string()),
});

type IaSettings = z.infer<typeof iaSettingsSchema>;

export const IASettings = () => {
    const { data } = useSession();

    const form = useForm({
        resolver: zodResolver(iaSettingsSchema),
        defaultValues: {
            autoPostGeneration: true,
            shortBio: '',
            topics: [],
        },
    });

    // useEffect(() => {
    //     if (data?.user.name) {
    //         form.reset({
    //             name: data.user.name,
    //             // @ts-ignore
    //             image: data.user.image,
    //         });
    //     }
    // }, [data, form, form.reset]);

    const onSubmit = (data: IaSettings) => {};
    const onError = (error: any) => {};
    return (
        <>
            <SettingsSectionHeader
                title='Configuración general'
                subtitle='Configura tu cuenta'
            />
            <div className='max-w-md mt-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
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
                                            placeholder='Copywritter en Perbrand'
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
                                        ¿Sobre que quieres escribir?
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ecommerce, Marketing, Tecnología'
                                            {...field}
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
                        <Button type='submit' className='mt-4'>
                            Guardar
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};
