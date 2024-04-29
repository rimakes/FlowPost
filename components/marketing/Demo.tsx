'use client';

import { Mic, Play, Recycle, Sparkles, Square, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import Spinner from '../icons/SpinnerIcon';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { GetAccessButton } from './GetAccessButton';
import {
    VoiceToneSelector,
    WritterFormSchema,
} from '@/app/app/post-writter/_components/PostWritterForm';
import {
    SelectPostTemplate,
    SelectedPostTemplateCard,
} from '@/app/app/post-writter/_components/SelectPostTemplate';
import { PostWritterResult } from '@/app/app/post-writter/_components/GeneratedPost';
import { TStatus } from '@/types/types';
import { VOICE_TONES } from '@/app/app/post-writter/config/const';
import { cn, getPostTemplateById, wait } from '@/lib/utils';
import { PostWritterContext } from '@/app/app/post-writter/_components/PostWritterProvider';
import { CarouselWorkbench } from '@/app/app/carrousel/_components/CarouselWorkbench';
import { DownloadButton } from '@/app/app/carrousel/_components/sidebar/downloadButton';
import { appConfig } from '@/config/shipper.appconfig';

type DemoWidgetProps = { className?: string };
export function DemoWidget({ className }: DemoWidgetProps) {
    const [status, setStatus] = useState<TStatus | 'recording'>('idle');
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isOpenResultDialog, setisOpenResultDialog] = useState(false);
    const { requestPost, post, createCarouselButtonRef } =
        useContext(PostWritterContext);
    const [dialogContent, setDialogContent] = useState<'post' | 'carousel'>(
        'post'
    );
    const form = useForm({
        resolver: zodResolver(WritterFormSchema),
        defaultValues: {
            description: '', // If we have both, we use the one from the url
            toneId: null,
            templateId: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        setStatus('loading');
        const requestPostPromise = async () => {
            setDialogContent('post');
            await requestPost(data);
        };
        toast.promise(requestPostPromise(), {
            loading: 'Generando post...',
            duration: 5000,
            success: () => {
                wait(2000).then(() => {
                    toast.success(
                        'Ahora crea tu carrusel en 15 segundos con un solo click',
                        {
                            action: {
                                label: 'Crear carrusel',
                                onClick: () => {
                                    console.log('clicked');
                                    console.log({ createCarouselButtonRef });
                                    createCarouselButtonRef!.current?.click();
                                },
                            },
                        }
                    );
                });
                return 'Post generado con éxito';
            },
            error: (e) => {
                setStatus('error');
                toast.error('Error al generar el post');
                setisOpenResultDialog(false);
                return 'Error al generar el post';
            },
            finally: () => {
                setStatus('idle');
            },
        });

        setisOpenResultDialog(true);
    };

    const onError = (errors: any) => {
        console.log(errors);
    };

    const buttonContent = () => {
        switch (status) {
            case 'idle':
                return (
                    <>
                        <Sparkles className='mr-2 h-5 w-5' />
                        Generar post
                    </>
                );
            case 'loading':
                return (
                    <>
                        <Spinner className='mr-2 h-5 w-5' />
                        Generando post...
                    </>
                );
            default:
                return 'Generar post';
        }
    };

    return (
        <div className='relative isolate flex w-full flex-col justify-center gap-4 rounded-md border border-border bg-white p-4 shadow-md'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className={cn(
                        `flex flex-col items-center gap-8`,
                        className
                    )}
                >
                    <div
                        className='anchor absolute -top-24 lg:-top-32'
                        id='try-it'
                    />
                    <p className='-mb-4 text-center text-sm text-muted-foreground'>
                        Completa el formulario y descubre como la IA de{' '}
                        {appConfig.general.appName} hace su magia
                    </p>

                    <FormField
                        control={form.control}
                        name='toneId'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className=''></FormLabel>

                                <Dialog
                                    open={isVoiceModalOpen}
                                    onOpenChange={setIsVoiceModalOpen}
                                >
                                    <DialogTrigger asChild>
                                        <div className='w-full'>
                                            {field.value ? (
                                                <Button
                                                    type='button'
                                                    variant={'outline'}
                                                    className='mx-auto flex gap-2 rounded-full'
                                                >
                                                    <span className='h-5 w-5'>
                                                        {
                                                            VOICE_TONES[
                                                                field.value - 1
                                                            ].emoji
                                                        }
                                                    </span>
                                                    {
                                                        VOICE_TONES[
                                                            field.value - 1
                                                        ].name
                                                    }
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant={'secondary'}
                                                    type='button'
                                                    className='w-full'
                                                >
                                                    Elige tono
                                                </Button>
                                            )}
                                        </div>
                                    </DialogTrigger>
                                    <FormMessage />

                                    <DialogContent className='max-w-full md:max-w-4xl'>
                                        <VoiceToneSelector
                                            onSelectTone={(value) => {
                                                field.onChange(value);
                                                setIsVoiceModalOpen(false);
                                                // set the voice state
                                            }}
                                            selectedTone={field.value || 1}
                                            availableTones={[1, 2, 3]}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='templateId'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className=''></FormLabel>
                                <FormControl>
                                    {/*  */}
                                    <>
                                        {field.value ? (
                                            <SelectedPostTemplateCard
                                                template={getPostTemplateById(
                                                    field.value
                                                )}
                                                onDelete={() =>
                                                    field.onChange(0)
                                                }
                                                onEditClick={() =>
                                                    setIsTemplateModalOpen(true)
                                                }
                                            />
                                        ) : (
                                            <Button
                                                variant={'secondary'}
                                                type='button'
                                                className='w-full'
                                                onClick={() =>
                                                    setIsTemplateModalOpen(true)
                                                }
                                            >
                                                Elige formato
                                            </Button>
                                        )}
                                        <Dialog
                                            open={isTemplateModalOpen}
                                            onOpenChange={
                                                setIsTemplateModalOpen
                                            }
                                        >
                                            <DialogContent className='max-w-full overflow-hidden md:max-w-4xl'>
                                                <SelectPostTemplate
                                                    availablePostTemplateIds={[
                                                        '0',
                                                        '1',
                                                        '2',
                                                    ]}
                                                    setSelected={(value) => {
                                                        field.onChange(value);
                                                        setIsTemplateModalOpen(
                                                            false
                                                        );
                                                    }}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                        {/*  */}
                                    </>
                                </FormControl>
                                <FormDescription>
                                    Hemos creado más de 30 plantillas virales
                                    para ti
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className=''>
                                    ¿Sobre qué quieres escribir?
                                </FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Textarea
                                            className='w-full resize-none overflow-auto'
                                            placeholder='Los mejores hooks para enganchar a tus seguidores en Linkedin'
                                            {...field}
                                        />
                                        {/* <CharCounter
                                            minChars={MIN_LENGTH}
                                            maxChars={MAX_LENGTH}
                                            usedChars={
                                                form.watch('description').length
                                            }
                                        /> */}
                                        {/* <RecordButton
                                            onRecord={field.onChange}
                                            text={field.value}
                                        /> */}
                                    </div>
                                </FormControl>
                                <FormDescription className=''>
                                    Suéltalo tal y como te salga. Nosotros le
                                    daremos forma.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='w-full  animate-pulse bg-gradient-to-tr from-pink-400 to-indigo-500 text-lg font-semibold text-pink-50'
                        type='submit'
                    >
                        {buttonContent()}
                    </Button>
                </form>
            </Form>
            <Dialog
                modal={false}
                open={isOpenResultDialog}
                onOpenChange={setisOpenResultDialog}
            >
                <DialogContent
                    className='demo-dialog max-h-full max-w-3xl overflow-y-auto overflow-x-hidden  bg-white focus-within:!border-transparent'
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    {dialogContent === 'post' && (
                        <PostWritterResult
                            isDemo
                            onDemoCarouselCreated={() => {
                                console.log('onDemoCarouselCreated');
                                setDialogContent('carousel');
                            }}
                        />
                    )}
                    {dialogContent === 'carousel' && (
                        <div className='-ml-6 -mr-6 -mt-6  overflow-x-hidden'>
                            <CarouselWorkbench />
                            <div className='flex justify-between p-4'>
                                <DownloadButton />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className='flex gap-4'>
                                            <Button>Editar</Button>
                                            <Button>Publicar</Button>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className='flex w-fit flex-col items-center gap-2'>
                                        <p>
                                            Esta funcionalidad es solo para
                                            usuarios Pro
                                        </p>
                                        <GetAccessButton />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

type RecordControlsProps = {
    status: TStatus | 'recording';
    timeRemaining?: number;
};

function RecordControls({ status, timeRemaining }: RecordControlsProps) {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-center text-xl font-semibold'>
                00:{timeRemaining ? timeRemaining : '00'}
            </p>

            <div className='flex items-center justify-center gap-2'>
                <Button variant={'secondary'}>
                    <Recycle />
                </Button>
                <Button size={'lg'} className='_animate-pulse rounded-full'>
                    {status === 'recording' ? (
                        <Square className='text-primary-foreground/50' />
                    ) : (
                        <Mic />
                    )}
                </Button>
                <Button variant={'secondary'}>
                    <Trash2 />
                </Button>
            </div>
            <Button
                variant={'outline'}
                size={`icon`}
                className='mx-auto aspect-square h-10 rounded-full p-3 text-primary/50'
            >
                <Play className='fill-current' />
            </Button>
        </div>
    );
}
