'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { PostWritterContext } from '../PostWritterProvider';
import { RecordButton } from '../RecordButton';
import { SelectedPostTemplateCard } from './SelectPostTemplate';
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
import { Textarea } from '@/components/ui/textarea';
import { cn, getPostTemplateById } from '@/lib/utils';
import { CharCounter } from '@/components/shared/CharCounter';
import { revalidateAllPaths } from '@/app/_actions/other-actions';
import { VoiceTone } from '@/types/types';
import { useUserCredits } from '@/hooks/use-user-credits';
import Spinner from '@/components/icons/SpinnerIcon';
import {
    PostWritterFormProps,
    WritterFormSchema,
} from '@/app/app/(writters)/framework/_components/postWritterForm/postWritterFormSchema';
import {
    MIN_LENGTH,
    MAX_LENGTH,
} from '@/app/app/(writters)/_copy/_components/CopyWritterForm';
import { GenerationSelector } from '@/app/app/(writters)/framework/_components/postWritterForm/GenerationSelector';
import { VoiceToneSelector } from '@/app/app/(writters)/framework/_components/postWritterForm/VoiceToneSelector';

export type PostRequest = z.infer<typeof WritterFormSchema>;

export function PostWritterForm({
    className,
    writtingStyles,
}: PostWritterFormProps) {
    const {
        requestPost,
        postRequest: { description, templateId, toneId },
    } = useContext(PostWritterContext);
    const { creditBalance, update: updateCredits } = useUserCredits();
    const searchParams = useSearchParams();
    const urlDescription = searchParams.get('description');

    const form = useForm({
        resolver: zodResolver(WritterFormSchema),
        defaultValues: {
            description: urlDescription || description, // If we have both, we use the one from the url
            toneId,
            templateId,
            writtingStyleId: '',
            generationType: 'framework' as 'framework' | 'writtingStyle',
        },
        mode: 'onBlur',
    });

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
                        render={({}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    ¿Sobre qué quieres escribir?
                                </FormLabel>
                                <FormControl>
                                    <RelativeTextarea name='description' />
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
                        {form.getValues('templateId') ? (
                            <SelectedPostTemplateCard
                                template={getPostTemplateById(
                                    form.getValues('templateId')!
                                )}
                                onDelete={onDeselectPostTemplate}
                            />
                        ) : null}

                        <FormField
                            control={form.control}
                            name='generationType'
                            render={({}) => (
                                <GenerationSelector
                                    writtingStyles={writtingStyles}
                                />
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

const RelativeTextarea = ({ name }: { name: string }) => {
    const field = useController({ name }).field;

    return (
        <div className='relative'>
            <Textarea
                className='resize-none overflow-auto'
                placeholder='Los mejores hooks para enganchar a tus seguidores en Linkedin'
                {...field}
            />
            <CharCounter
                minChars={MIN_LENGTH}
                maxChars={MAX_LENGTH}
                usedChars={field.value.length}
            />
            <RecordButton onRecord={field.onChange} text={field.value} />
        </div>
    );
};
