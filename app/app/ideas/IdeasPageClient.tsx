'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostIdeaCard } from './IdeaCard';
import { generateIdeas } from '@/app/_actions/idea-actions';
import Spinner from '@/components/icons/Spinner';
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
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { IdeaRequestFormSchema } from '@/types/schemas';
import { TStatus } from '@/types/types';

type IdeasPageClientProps = {};
export function IdeasPageClient({}: IdeasPageClientProps) {
    const form = useForm({
        resolver: zodResolver(IdeaRequestFormSchema),

        defaultValues: {
            topic: '',
        },
    });

    const [status, setStatus] = useState<TStatus>('idle');
    const [ideas, setIdeas] = useState<string[]>([]);
    const onSubmit = async (data: any) => {
        setStatus('loading');
        const ideas = await generateIdeas(data.topic);
        const formattedIdeas = ideas.map((idea) => idea.description);
        console.log(ideas[0]);
        console.log(ideas[1]);
        setStatus('success');
        setIdeas(formattedIdeas);
    };
    const onError = (errors: any) => {};

    return (
        <div className='flex flex-col gap-2 sm:flex-row'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className='flex-1'
                >
                    <FormField
                        control={form.control}
                        name='topic'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>
                                    ¿Sobre qué quieres recibir ideas?
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Ej. Marketing, Tecnología, Ecommerce, CRO, etc'
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className='flex gap-2'
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? (
                            <>
                                <Spinner />
                                Generando ideas
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generar ideas
                            </>
                        )}
                    </Button>
                </form>
            </Form>
            <div className='flex-1'>
                <h2>Ideas</h2>
                <p className='text-xs text-primary/50'>
                    Aquí tienes ideas para tu próximo post de Linkedin
                </p>
                {status === 'loading' && (
                    <div className='w-full space-y-4 rounded-md border p-4'>
                        <Skeleton className='h-4 w-1/4 bg-muted' />
                        <Skeleton className='h-4 w-3/5' />
                        <Skeleton className='h-4 w-1/2' />
                        <Skeleton className='h-4 w-full' />
                    </div>
                )}
                {status === 'success' && (
                    <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
                        {ideas.map((idea, index) => (
                            <PostIdeaCard
                                key={index}
                                ideaDescription={idea}
                                isSaveButtonShown={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
