'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen, Plus, Sparkles } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    POST_TEMPLATES,
    TEMPLATE_CATEGORIES,
    VOICE_TONES,
    VoiceTone,
} from './const';
import { toast } from 'sonner';
import {
    SelectPostTemplate,
    SelectedPostTemplateCard,
} from './SelectPostTemplate';
import { PostWritterContext } from './PostWritterProvider';
import { CharCounter } from '@/components/shared/CharCounter';

const MAX_LENGTH = 200;
const MIN_LENGTH = 10;

type PostWritterFormProps = {
    className?: string;
};

export type PostRequest = z.infer<typeof CustomFormSchema>;
export const CustomFormSchema = z.object({
    description: z
        .string()
        .min(MIN_LENGTH, 'Too short')
        .max(MAX_LENGTH, 'Too long'),
    toneId: z.number(),
    // templateId can't be null, but I want to refine the message error when it is null
    templateId: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: 'Selecciona una plantilla',
        }),
});

export function PostWritterForm({ className }: PostWritterFormProps) {
    const {
        requestPost,
        postRequest: { description, templateId, toneId },
    } = useContext(PostWritterContext);

    //

    const form = useForm({
        resolver: zodResolver(CustomFormSchema),
        defaultValues: {
            description,
            toneId,
            templateId,
        },
        mode: 'onChange',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onSelectPostTemplate = (index: number) => {
        setIsDialogOpen(false);
        form.setValue('templateId', index, { shouldValidate: true });
    };

    const onDeselectPostTemplate = () => {
        form.setValue('templateId', null);
    };

    const onSelectTone = (value: VoiceTone['id']) => {
        form.setValue('toneId', value);
    };

    const onSubmit = async (data: PostRequest) => {
        console.log(data);
        const res = await requestPost(data);
        console.log(res);
        toast.success('Post creado');
    };

    const onError = (errors: any) => {
        console.log(errors);
        toast.error('Ha habido un error, revisa los campos');
    };

    const charCounterClasses = cn(
        `absolute bottom-0 right-2 text-xs text-yellow-700/50`,
        form.watch('description').length < MIN_LENGTH && 'text-red-500',
        form.watch('description').length > Math.round(MAX_LENGTH / 2) &&
            'text-green-500',
        form.watch('description').length > MAX_LENGTH && 'text-destructive'
    );

    const charCounter = `${form.watch('description').length} / ${MAX_LENGTH}`;
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className={cn(`flex flex-col gap-8`, className)}
                >
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
                                            className='resize-none overflow-hidden'
                                            placeholder='Los mejores hooks para enganchar a tus seguidores en Linkedin'
                                            {...field}
                                        />
                                        <CharCounter
                                            maxChars={MAX_LENGTH}
                                            usedChars={
                                                form.watch('description').length
                                            }
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Nuestra IA generará un post basado en este
                                    texto y el tono que elijas
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='toneId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Selecciona el tono del post
                                </FormLabel>
                                <FormControl>
                                    <VoiceToneSelector
                                        selectedTone={field.value}
                                        onSelectTone={onSelectTone}
                                    />
                                </FormControl>
                                <FormDescription>xxx</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <FormField
                            control={form.control}
                            name='templateId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=''>
                                        Selecciona una plantilla
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            {field.value ? (
                                                <SelectedPostTemplateCard
                                                    template={
                                                        POST_TEMPLATES[
                                                            field.value
                                                        ]
                                                    }
                                                    onDelete={
                                                        onDeselectPostTemplate
                                                    }
                                                />
                                            ) : null}
                                            <Dialog
                                                open={isDialogOpen}
                                                onOpenChange={(isOpen) =>
                                                    setIsDialogOpen(isOpen)
                                                }
                                            >
                                                <DialogTrigger
                                                    asChild
                                                    className=''
                                                >
                                                    <Button
                                                        variant={'outline'}
                                                        type='button'
                                                        className={`${
                                                            field.value &&
                                                            'hidden'
                                                        }`}
                                                    >
                                                        <Plus className='mr-2 h-5 w-5' />
                                                        Elige Plantilla
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className='max-w-full md:max-w-4xl border-0 border-green-500'>
                                                    <SelectPostTemplate
                                                        setSelected={
                                                            onSelectPostTemplate
                                                        }
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </FormControl>
                                    <FormDescription>xxx</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button>
                        <Sparkles className='mr-2 h-5 w-5' /> Crear post
                    </Button>
                </form>
            </Form>
        </>
    );
}

type VoiceToneSelectorProps = {
    selectedTone: VoiceTone['id'];
    onSelectTone: (value: VoiceTone['id']) => void;
};

export const VoiceToneSelector = ({
    selectedTone,
    onSelectTone,
}: VoiceToneSelectorProps) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {VOICE_TONES.map((tone) => {
                return (
                    <Button
                        type='button'
                        key={tone.name}
                        variant={
                            selectedTone === tone.id ? 'default' : 'outline'
                        }
                        className='flex gap-2 rounded-full'
                        onClick={() => onSelectTone(tone.id)}
                    >
                        <span className='h-5 w-5'>{tone.emoji}</span>
                        {tone.name}
                    </Button>
                );
            })}
        </div>
    );
};
