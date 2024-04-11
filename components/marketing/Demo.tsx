'use client';

import { VoiceToneSelector } from '@/app/app/post-writter/_components/PostWritterForm';
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
    Square,
    Trash,
    Trash2,
} from 'lucide-react';
import { useContext, useState } from 'react';
import { TStatus } from '@/types/types';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';
import { VOICE_TONES } from '@/app/app/post-writter/config/const';
import { getPostTemplateById, wait } from '@/lib/utils';
import { Label } from '../ui/label';
import Spinner from '../icons/spinner';
import { PostWritterContext } from '@/app/app/post-writter/_components/PostWritterProvider';
import { CarouselContext } from '@/app/app/carrousel/_components/ContextProvider';
import { toast } from 'sonner';
import { CarouselWorkbench } from '@/app/app/carrousel/_components/CarouselWorkbench';
import { DownloadButton } from '@/app/app/carrousel/_components/sidebar/downloadButton';

type DemoWidgetProps = { className?: string };
export function DemoWidget({ className }: DemoWidgetProps) {
    const [status, setStatus] = useState<TStatus | 'recording'>('idle');
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [voiceTone, setVoiceTone] = useState<number | null>(null);
    const [template, setTemplate] = useState<string>('');
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isOpenPostDialog, setisOpenPostDialog] = useState(true);
    const [description, setDescription] = useState('');
    const { requestPost, post } = useContext(PostWritterContext);
    const [dialogContent, setDialogContent] = useState<'post' | 'carousel'>(
        'carousel'
    );

    const buttonContent = () => {
        switch (status) {
            case 'idle':
                return (
                    <>
                        <Pen className='h-5 w-5 mr-2' />
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
            <div className='anchor lg:-top-32 -top-32 absolute' id='try-it' />
            <p>Para elegir otros estilos y plantillas, prueba Perbrand+</p>
            <Dialog open={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen}>
                <DialogTrigger asChild>
                    <div className='mx-auto'>
                        {voiceTone ? (
                            <Button
                                type='button'
                                variant={'outline'}
                                className='flex gap-2 rounded-full'
                            >
                                <span className='h-5 w-5'>
                                    {VOICE_TONES[voiceTone - 1].emoji}
                                </span>
                                {VOICE_TONES[voiceTone - 1].name}
                            </Button>
                        ) : (
                            <Button>Elige tono</Button>
                        )}
                    </div>
                </DialogTrigger>
                <DialogContent className='max-w-full md:max-w-4xl'>
                    <VoiceToneSelector
                        onSelectTone={(value) => {
                            setIsVoiceModalOpen(false);
                            setVoiceTone(value);
                            // set the voice state
                        }}
                        selectedTone={voiceTone ? voiceTone : 0}
                        availableTones={[1, 2, 3]}
                    />
                </DialogContent>
            </Dialog>
            {template ? (
                <SelectedPostTemplateCard
                    template={getPostTemplateById(template)}
                    onDelete={() => setTemplate('')}
                    onEditClick={() => setIsTemplateModalOpen(true)}
                />
            ) : (
                <Button onClick={() => setIsTemplateModalOpen(true)}>
                    Elige formato
                </Button>
            )}
            <Dialog
                open={isTemplateModalOpen}
                onOpenChange={setIsTemplateModalOpen}
            >
                <DialogContent className='max-w-full md:max-w-4xl overflow-hidden'>
                    <SelectPostTemplate
                        availablePostTemplateIds={['0', '1', '2']}
                        setSelected={(value) => {
                            console.log(value);
                            setIsTemplateModalOpen(false);
                            setTemplate(value);
                        }}
                    />
                </DialogContent>
            </Dialog>
            <Label>Temática de tu post</Label>
            <p className='text-sm text-primary/50'>
                Escribe brevemente sobre qué quieres que escribamos tu post y tu
                carrusel
            </p>
            <Textarea
                value={description}
                placeholder='Ej. Cómo mejorar la conversión de tu landing page en x pasos'
                rows={3}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            {/* <RecordControls status={status} timeRemaining={30} /> */}
            <Button
                onClick={async () => {
                    setStatus('loading');
                    requestPost({
                        description,
                        toneId: voiceTone!,
                        templateId: template,
                    })
                        .catch((e) => {
                            console.error(e);
                            setStatus('error');
                            toast.error('Error al generar el post');
                        })
                        .finally(() => {
                            setStatus('idle');
                        });

                    setisOpenPostDialog(true);
                }}
            >
                {buttonContent()}
            </Button>
            <Dialog open={isOpenPostDialog} onOpenChange={setisOpenPostDialog}>
                <DialogContent className='max-w-3xl overflow-x-hidden overflow-y-auto'>
                    {dialogContent === 'post' && (
                        <PostWritterResult
                            isDemo
                            onDemoCarouselCreated={() => {
                                setDialogContent('carousel');
                            }}
                        />
                    )}
                    {dialogContent === 'carousel' && (
                        <div>
                            <CarouselWorkbench />
                            <div className='flex justify-between'>
                                <DownloadButton />
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
