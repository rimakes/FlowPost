'use client';

import {
    MAX_LENGTH,
    MIN_LENGTH,
    VoiceToneSelector,
    WritterFormSchema,
} from '@/app/app/post-writter/_components/PostWritterForm';
import { Button } from '../ui/button';
import {
    SelectPostTemplate,
    SelectedPostTemplateCard,
} from '@/app/app/post-writter/_components/SelectPostTemplate';
import { PostWritterResult } from '@/app/app/post-writter/_components/GeneratedPost';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
    Mic,
    Pen,
    Play,
    Recycle,
    Redo,
    Sparkles,
    Square,
    Trash,
    Trash2,
} from 'lucide-react';
import { useContext, useRef, useState } from 'react';
import { TStatus } from '@/types/types';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';
import { VOICE_TONES } from '@/app/app/post-writter/config/const';
import { cn, getPostTemplateById, wait } from '@/lib/utils';
import { Label } from '../ui/label';
import Spinner from '../icons/spinner';
import { PostWritterContext } from '@/app/app/post-writter/_components/PostWritterProvider';
import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import { toast } from 'sonner';
import { CarouselWorkbench } from '@/app/app/carrousel/_components/CarouselWorkbench';
import { DownloadButton } from '@/app/app/carrousel/_components/sidebar/downloadButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { CharCounter } from '../shared/CharCounter';
import { RecordButton } from '@/app/app/post-writter/_components/RecordButton';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { GetAccessButton } from './GetAccessButton';
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
                        <Sparkles className='h-5 w-5 mr-2' />
                        Generar post
                    </>
                );
            case 'loading':
                return (
                    <>
                        <Spinner className='h-5 w-5 mr-2' />
                        Generando post...
                    </>
                );
            default:
                return 'Generar post';
        }
    };

    return (
        <div className='rounded-md border border-border shadow-md w-full p-4 gap-4 flex flex-col relative bg-white justify-center isolate'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className={cn(
                        `flex flex-col gap-8 items-center`,
                        className
                    )}
                >
                    <div
                        className='anchor lg:-top-32 -top-24 absolute'
                        id='try-it'
                    />
                    <p className='text-center text-muted-foreground text-sm -mb-4'>
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
                                                    className='flex gap-2 rounded-full mx-auto'
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
                                            <DialogContent className='max-w-full md:max-w-4xl overflow-hidden'>
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
                            <FormItem>
                                <FormLabel className=''>
                                    ¿Sobre qué quieres escribir?
                                </FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <Textarea
                                            className='resize-none overflow-auto'
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
                                        <RecordButton
                                            onRecord={field.onChange}
                                            text={field.value}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription className=''>
                                    Suéltalo tal y como te salga, incluso puedes
                                    hacerlo POR VOZ. Nosotros le daremos forma.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='bg-gradient-to-tr  from-pink-400 to-indigo-500 text-pink-50 text-lg font-semibold w-full animate-pulse'
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
                    className='demo-dialog max-w-3xl overflow-x-hidden overflow-y-auto max-h-full  bg-white focus-within:!border-transparent'
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    {dialogContent === 'post' && (
                        <PostWritterResult
                            isDemo
                            onDemoCarouselCreated={() => {
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
                                    <PopoverContent className='w-fit flex flex-col items-center gap-2'>
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
        <div className='flex gap-2 flex-col'>
            <p className='text-center font-semibold text-xl'>
                00:{timeRemaining ? timeRemaining : '00'}
            </p>

            <div className='flex gap-2 justify-center items-center'>
                <Button variant={'secondary'}>
                    <Recycle />
                </Button>
                <Button size={'lg'} className='rounded-full _animate-pulse'>
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
                className='mx-auto rounded-full h-10 aspect-square p-3 text-primary/50'
            >
                <Play className='fill-current' />
            </Button>
        </div>
    );
}
