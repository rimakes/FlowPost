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
import { cn, getPostTemplateById, proToast } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Sparkles } from 'lucide-react';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
    SelectPostTemplate,
    SelectedPostTemplateCard,
} from './SelectPostTemplate';
import { PostWritterContext } from './PostWritterProvider';
import { CharCounter } from '@/components/shared/CharCounter';
import { RecordButton } from './RecordButton';
import Spinner from '@/components/icons/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { revalidateAllPaths } from '@/app/_actions/shared-actions';
import { VoiceTone } from '@/types/types';
import { VOICE_TONES } from '../config/const';
import { useUserCredits } from '@/hooks/use-user-credits';

export const MAX_LENGTH = 1000;
export const MIN_LENGTH = 10;
export const tooShortError = `Demasiado corto. Escribe al menos ${MIN_LENGTH} caracteres`;
export const tooLongError = `Demasiado largo. Escribe menos de ${MAX_LENGTH} caracteres`;

type PostWritterFormProps = {
    className?: string;
};

export type PostRequest = z.infer<typeof WritterFormSchema>;
export const WritterFormSchema = z.object({
    description: z
        .string()
        .min(MIN_LENGTH, tooShortError)
        .max(MAX_LENGTH, tooLongError),
    toneId: z
        .number()
        .nullable()
        .refine((value) => value !== null, {
            message: 'Selecciona un tono',
        }),
    templateId: z
        .string()
        .nullable()
        .refine((value) => value !== null && value !== '', {
            message: 'Selecciona una plantilla',
        }),
});

export function PostWritterForm({ className }: PostWritterFormProps) {
    const {
        requestPost,
        postRequest: { description, templateId, toneId },
    } = useContext(PostWritterContext);
    const { data: session, update } = useSession();
    const { creditBalance, update: updateCredits } = useUserCredits();

    const searchParams = useSearchParams();
    const urlDescription = searchParams.get('description');

    const form = useForm({
        resolver: zodResolver(WritterFormSchema),
        defaultValues: {
            description: urlDescription || description, // If we have both, we use the one from the url
            toneId,
            templateId,
        },
        mode: 'onBlur',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onSelectPostTemplate = (id: string) => {
        setIsDialogOpen(false);
        form.setValue('templateId', id, { shouldValidate: true });
    };

    const onDeselectPostTemplate = () => {
        form.setValue('templateId', null);
    };

    const onSelectTone = (id: VoiceTone['id']) => {
        form.setValue('toneId', id);
    };

    const onSubmit = async (data: PostRequest) => {
        if (creditBalance <= 0) {
            toast.error('No tienes créditos suficientes');
            return;
        }
        try {
            await requestPost(data);
            updateCredits(creditBalance - 1);
            await revalidateAllPaths();
        } catch (error) {
            console.log(error);
            return toast.error('Ha habido un error, revisa los campos');
        }
        toast.success('Post creado');
    };

    const onError = (errors: any) => {
        toast.error('Ha habido un error, revisa los campos');
    };

    const setDescription = useCallback(
        (text: string) => {
            form.setValue('description', text);
        },
        [form]
    );

    const buttonContent = form.formState.isSubmitting ? (
        <>
            <Spinner className='mr-2 h-5 w-5' />
            Creando post
        </>
    ) : (
        <>
            <Sparkles className='mr-2 h-5 w-5' />
            Crear post
        </>
    );

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
                                            className='resize-none overflow-auto'
                                            placeholder='Los mejores hooks para enganchar a tus seguidores en Linkedin'
                                            {...field}
                                        />
                                        <CharCounter
                                            minChars={MIN_LENGTH}
                                            maxChars={MAX_LENGTH}
                                            usedChars={
                                                form.watch('description').length
                                            }
                                        />
                                        <RecordButton
                                            onRecord={setDescription}
                                            text={field.value}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Suéltalo tal y como te salga, incluso puedes
                                    hacerlo POR VOZ. Nosotros le daremos forma.
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
                                    ¿En qué tono quires escribirlo?
                                </FormLabel>
                                <FormControl>
                                    <VoiceToneSelector
                                        selectedTone={field.value || 0}
                                        onSelectTone={onSelectTone}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
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
                                        ¿Qué plantilla probada quieres usar?
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            {field.value ? (
                                                <SelectedPostTemplateCard
                                                    template={getPostTemplateById(
                                                        field.value
                                                    )}
                                                    onDelete={
                                                        onDeselectPostTemplate
                                                    }
                                                    onEditClick={() => {
                                                        setIsDialogOpen(true);
                                                    }}
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
                                    <FormDescription>
                                        Hemos seleccionado más de 30 plantillas
                                        virales. Selecciona la que más se adapta
                                        a tu post
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={form.formState.isSubmitting}
                        className={`${form.formState.isSubmitting && 'cursor-not-allowed'}`}
                    >
                        {buttonContent}
                    </Button>
                </form>
            </Form>
        </>
    );
}

export const VoiceToneSelector = ({
    selectedTone,
    onSelectTone,
    availableTones = VOICE_TONES.map((tone) => tone.id),
}: {
    selectedTone?: VoiceTone['id'];
    onSelectTone: (value: VoiceTone['id']) => void;
    availableTones?: VoiceTone['id'][];
}) => {
    const router = useRouter();

    return (
        <div className='flex flex-wrap gap-2'>
            {VOICE_TONES.map((tone) => {
                const isAvailable = availableTones.includes(tone.id);
                return (
                    <Button
                        type='button'
                        key={tone.name}
                        variant={
                            selectedTone === tone.id ? 'secondary' : 'outline'
                        }
                        className={`${!isAvailable && 'opacity-50'} flex gap-2 rounded-full
                        ${selectedTone === tone.id ? 'bg-indigo-100' : ''}
                        `}
                        onClick={() => {
                            if (!isAvailable)
                                return proToast(
                                    router,
                                    'Este tono no está disponible para tu plan'
                                );
                            onSelectTone(tone.id);
                        }}
                    >
                        <span className='h-5 w-5'>{tone.emoji}</span>
                        {tone.name}
                    </Button>
                );
            })}
        </div>
    );
};
