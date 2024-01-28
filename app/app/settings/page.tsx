'use client';

import { Header } from '@/components/shared/header';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function IdeasPage() {
    return (
        <>
            <Header
                className='mt-6'
                title='Configuración'
                subtitle='Configura tu espacio de trabajo'
            />
            <Separator />
            <div className='mt-6 space-y-4 2xl:flex gap-8'>
                <Tabs defaultValue='general' className='w-full'>
                    <div className='overflow-x-auto mb-8 '>
                        <TabsList className='flex gap-2 w-fit'>
                            <TabsTrigger value='general'>General</TabsTrigger>
                            <TabsTrigger value='password'>
                                Subscripción
                            </TabsTrigger>
                            <TabsTrigger value='team'>Equipo</TabsTrigger>
                            <TabsTrigger value='ai'>IA</TabsTrigger>
                            <TabsTrigger value='brands'>Tus Marcas</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='general'>
                        <AccountSettings />
                    </TabsContent>
                    <TabsContent value='password'></TabsContent>
                    <TabsContent value='team'></TabsContent>
                    <TabsContent value='ai'></TabsContent>
                    <TabsContent value='brands'></TabsContent>
                </Tabs>
            </div>
        </>
    );
}

const generalSettingsSchema = z.object({
    name: z.string(),
});

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

export const AccountSettings = () => {
    const form = useForm({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            name: 'Javier',
        },
    });
    return (
        <>
            <SubsectionHeading
                title='Configuración general'
                subtitle='Configura tu cuenta'
            />
            <div className='max-w-md'>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Juan' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </>
    );
};

type SubsectionHeadingProps = {
    title: string;
    subtitle: string;
};

const SubsectionHeading = ({ title, subtitle }: SubsectionHeadingProps) => {
    return (
        <div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm text-primary/40'>{subtitle}</p>
        </div>
    );
};
