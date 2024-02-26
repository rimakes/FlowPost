'use client';

import { VoiceToneSelector } from '@/app/app/post-writter/_components/PostWritterForm';
import { Button } from '../ui/button';
import {
    SelectPostTemplate,
    SelectedPostTemplateCard,
} from '@/app/app/post-writter/_components/SelectPostTemplate';
import { PostWritterResult } from '@/app/app/post-writter/_components/GeneratedPost';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Mic, Play, Recycle, Redo, Square, Trash, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { TStatus } from '@/types/types';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';

type DemoWidgetProps = { className?: string };
export function DemoWidget({ className }: DemoWidgetProps) {
    const [status, setStatus] = useState<TStatus | 'recording'>('recording');
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    if (status === 'loading')
        return (
            <div className='rounded-md border border-border shadow-md w-full p-4 gap-4'>
                <Skeleton className='w-full h-full' />
            </div>
        );

    if (status === 'success')
        return (
            <div>
                <Textarea>Post generado</Textarea>
            </div>
        );

    return (
        <div className='rounded-md border border-border shadow-md w-full p-4 gap-4 flex flex-col relative bg-white'>
            <div className='anchor -top-32 absolute' id='try-it' />
            <p>Para elegir otros estilos y plantillas, prueba Perbrand+</p>
            <Dialog open={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen}>
                <DialogTrigger asChild>
                    <Button>Elige tono</Button>
                </DialogTrigger>
                <DialogContent className='max-w-full md:max-w-4xl'>
                    <VoiceToneSelector
                        onSelectTone={(value) => {
                            setIsVoiceModalOpen(false);
                            // set the voice state
                        }}
                        selectedTone={2}
                    />
                </DialogContent>
            </Dialog>

            <SelectedPostTemplateCard
                template={{
                    id: '1',
                    name: 'test',
                    content: 'test',
                    tags: ['test'],
                }}
            />
            <Dialog
                open={isTemplateModalOpen}
                onOpenChange={setIsTemplateModalOpen}
            >
                <DialogTrigger asChild>
                    <Button>Elige formato</Button>
                </DialogTrigger>
                <DialogContent className='max-w-full md:max-w-4xl'>
                    <SelectPostTemplate
                        setSelected={(value) => {
                            console.log(value);
                            setIsTemplateModalOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
            <RecordControls status={status} timeRemaining={30} />
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
