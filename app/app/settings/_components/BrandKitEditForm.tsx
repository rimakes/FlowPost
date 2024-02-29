'use client';

import { FontSelector } from '@/components/shared/FontSelector';
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
import { fontsMap } from '@/config/fonts';
import { brandKitsSettingsSchema } from '@/types/schemas';
import { Pure, TFontNames, TStatus } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@radix-ui/react-popover';
import { ChevronsUpDown, ThumbsUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ColorPalette } from '../../carrousel/_components/sidebar/ColorPalette';
import { ColorPaletteSelect } from '../../carrousel/_components/sidebar/ColorPaletteSelector';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { saveBrandKit } from '@/app/_actions/settings-actions';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type BrandKitEditFormProps = {
    defaultValues: Omit<Pure<Brand>, 'author' | 'authorId'>;
    onSave: () => void;
};
export function BrandKitEditForm({
    defaultValues,
    onSave,
}: BrandKitEditFormProps) {
    const form = useForm({
        resolver: zodResolver(brandKitsSettingsSchema),
        defaultValues,
    });

    const { data: session } = useSession();
    const router = useRouter();

    const [colorsPopOverisOpen, setColorsPopOverisOpen] = useState(false);
    const [fontsPopOverisOpen, setFontsPopOverisOpen] = useState(false);
    const [status, setStatus] = useState<TStatus>('idle');

    const onSubmit = async (data: Omit<Pure<Brand>, 'author' | 'authorId'>) => {
        setStatus('loading');
        console.log(data);
        await saveBrandKit(
            { ...data, id: form.getValues('id') },
            session!.user.id
        );
        setStatus('success');
        router.refresh();
        toast.success('Marca guardada');
        setStatus('idle');
        onSave();
    };
    const onError = (error: any) => {};

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                                <Input placeholder='Ricardo Sala' {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='handle'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Handle</FormLabel>
                            <FormControl>
                                <Input placeholder='@ric_sala' {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='imageUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image de perfil</FormLabel>
                            <FormControl>
                                <Input placeholder='https...' {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='colorPalette'
                    render={({ field }) => (
                        <FormItem className='flex gap-2 justify-start items-center'>
                            <FormLabel>Colores</FormLabel>
                            <FormControl>
                                <Popover
                                    open={colorsPopOverisOpen}
                                    onOpenChange={setColorsPopOverisOpen}
                                >
                                    <PopoverTrigger
                                        className='w-full flex items-center justify-between !mt-0'
                                        asChild
                                    >
                                        <div className='cursor-pointer flex items-center'>
                                            {/* Colores */}
                                            <ColorPalette
                                                colors={form.getValues(
                                                    'colorPalette'
                                                )}
                                                onClick={() => {}}
                                                className='ml-2 flex justify-center'
                                            />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <>
                                            <ColorPaletteSelect
                                                onChange={(colorPalette) => {
                                                    setColorsPopOverisOpen(
                                                        false
                                                    );
                                                    form.setValue(
                                                        'colorPalette',
                                                        colorPalette
                                                    );
                                                }}
                                            />
                                        </>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='fontPalette'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fuente (Letra)</FormLabel>
                            <FormControl>
                                <Popover
                                    open={fontsPopOverisOpen}
                                    onOpenChange={setFontsPopOverisOpen}
                                >
                                    <PopoverTrigger className='w-full flex items-center justify-between'>
                                        <div className='cursor-pointer flex gap-2 items-center'>
                                            <div
                                                className={`h-6 w-6 rounded-full ${
                                                    fontsMap[
                                                        form.watch(
                                                            'fontPalette'
                                                        ).primary as TFontNames
                                                    ].className
                                                }`}
                                            >
                                                {
                                                    form.watch('fontPalette')
                                                        .primary
                                                }
                                            </div>
                                        </div>
                                        <ChevronsUpDown
                                            size={20}
                                            className='ml-2'
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className='overflow-y-scroll'>
                                        <FontSelector
                                            onSelect={(fontPalette) => {
                                                setFontsPopOverisOpen(false);
                                                form.setValue('fontPalette', {
                                                    primary: fontPalette,
                                                    handWriting: fontPalette,
                                                    secondary: fontPalette,
                                                });
                                            }}
                                            selectedFont={
                                                form.getValues('fontPalette')
                                                    .primary
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
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
                    {status === 'loading' ? 'Guardando...' : 'Guardar'}
                </Button>
            </form>
        </Form>
    );
}
