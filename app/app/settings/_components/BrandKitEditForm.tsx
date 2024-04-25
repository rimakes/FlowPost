'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ColorPalette } from '../../carrousel/_components/sidebar/ColorPalette';
import { ColorPaletteSelect } from '../../carrousel/_components/sidebar/ColorPaletteSelector';
import { FontPaletteSelector } from '../../carrousel/_components/sidebar/Sidebar';
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
import { brandKitsSettingsSchema } from '@/types/schemas';
import { Pure, TFont, TFontName, TStatus } from '@/types/types';
import { Button } from '@/components/ui/button';
import { upsertBrandkit } from '@/app/_actions/settings-actions';
import { Dropzone } from '@/components/shared/dropzone/Dropzone';
import {
    TExtendedFile,
    Thumbnails,
} from '@/components/shared/dropzone/Thumbnails';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
// import { uploadFileToCloudinary } from '@/lib/utils';

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
    const formattedPicture: TExtendedFile[] = defaultValues.imageUrl
        ? ([{ preview: defaultValues.imageUrl }] as TExtendedFile[])
        : [];
    const [pictures, setPictures] = useState<TExtendedFile[]>(formattedPicture);
    const [colorsPopOverisOpen, setColorsPopOverisOpen] = useState(false);
    const [fontsPopOverisOpen, setFontsPopOverisOpen] = useState(false);
    const [isNewPicture, setIsNewPicture] = useState(false);
    const [status, setStatus] = useState<TStatus>('idle');

    const onDrop = (acceptedFiles: File[]) => {
        const fileWithPreview = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        )[0];
        setPictures(() => [fileWithPreview]);
        form.setValue('imageUrl', fileWithPreview.preview);
        setIsNewPicture(true);
    };

    const onSubmit = async (data: Omit<Pure<Brand>, 'author' | 'authorId'>) => {
        setStatus('loading');
        console.log(data);

        const formData = new FormData();
        formData.append('file', pictures[0]);

        let cloudinaryResponse;

        if (isNewPicture) {
            try {
                cloudinaryResponse = await uploadFileToCloudinary(formData);
                console.log('cloudinaryResponse', cloudinaryResponse);
            } catch (error) {
                toast.error('Error al subir la imagen');
                setStatus('error');
                return;
            }
            console.log('cld response!', cloudinaryResponse);
            data.imageUrl = cloudinaryResponse.url as string;
        }
        try {
            await upsertBrandkit(
                { ...data, id: form.getValues('id') },
                session!.user.id
            );
        } catch (error) {
            toast.error(
                'Error al guardar la marca. Por favor, intenta de nuevo.'
            );
            console.error(error);
            setStatus('error');
            return;
        }

        setStatus('success');
        router.refresh();
        toast.success('Marca guardada');
        setStatus('idle');
        setIsNewPicture(false);
        onSave();
    };
    const onError = (error: any) => {};

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className='flex flex-col gap-2'
            >
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
                            <FormLabel>Foto de perfil</FormLabel>
                            <FormControl>
                                <div className='flex items-center justify-stretch gap-4'>
                                    <Thumbnails
                                        files={pictures}
                                        classNamesThumbnails='h-24 w-24 rounded-full shrink-0'
                                    />
                                    <Dropzone
                                        onDrop={onDrop}
                                        value={form.getValues('imageUrl')}
                                        className='dropzone flex h-28 flex-grow items-center justify-center gap-4 py-2'
                                    >
                                        {session &&
                                            session!.user.image &&
                                            !form.getValues('imageUrl') && (
                                                <div className=' flex flex-1 flex-col items-center p-2'>
                                                    <p className='text-primary/70'>
                                                        También puedes
                                                    </p>
                                                    <Button
                                                        className='mt-2 whitespace-normal bg-emerald-50'
                                                        variant={'outline'}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            form.setValue(
                                                                'imageUrl',
                                                                session?.user
                                                                    .image!
                                                            );
                                                            console.log(
                                                                'session',
                                                                session?.user
                                                            );
                                                            setPictures([
                                                                // @ts-ignore
                                                                {
                                                                    preview:
                                                                        session
                                                                            ?.user
                                                                            .image!,
                                                                },
                                                            ]);
                                                        }}
                                                        type='button'
                                                    >
                                                        Usar tu foto de Linkedin
                                                    </Button>
                                                </div>
                                            )}
                                    </Dropzone>
                                </div>
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
                        <FormItem className='flex items-center justify-start gap-2 py-2'>
                            <FormLabel>Colores</FormLabel>
                            <FormControl>
                                <Dialog
                                    open={colorsPopOverisOpen}
                                    onOpenChange={setColorsPopOverisOpen}
                                >
                                    <DialogTrigger
                                        className='!mt-0 flex w-full items-center justify-between'
                                        asChild
                                    >
                                        <div className='flex cursor-pointer items-center'>
                                            {/* Colores */}
                                            <ColorPalette
                                                colors={form.getValues(
                                                    'colorPalette'
                                                )}
                                                onClick={() => {}}
                                                className='ml-2 flex justify-center'
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <>
                                            <ColorPaletteSelect
                                                colorPalette={form.getValues(
                                                    'colorPalette'
                                                )}
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
                                    </DialogContent>
                                </Dialog>
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
                                <FontPaletteSelector
                                    fontPalette={form.watch('fontPalette')}
                                    setFontByType={(
                                        type: TFont,
                                        font: TFontName
                                    ) => {
                                        console.log('type', type);
                                        form.setValue(
                                            `fontPalette.${type}`,
                                            font
                                        );
                                    }}
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
                    {status === 'loading' ? 'Guardando...' : 'Guardar'}
                </Button>
            </form>
        </Form>
    );
}
