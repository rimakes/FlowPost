'use client';
import { generateIdeas } from '@/app/_actions/ideas-actions';
import Spinner from '@/components/icons/spinner';
import { ButtonWithTooltip } from '@/components/shared/ButtonWithTooltip';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather, Save, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type IdeasPageClientProps = {};
export function IdeasPageClient({}: IdeasPageClientProps) {
    const form = useForm({
        resolver: zodResolver(IdeaRequestFormSchema),

        defaultValues: {
            topic: '',
        },
    });

    const [status, setStatus] = useState<TStatus>('success');
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
        <div className='flex flex-col sm:flex-row gap-2'>
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
                    <div className='border w-full rounded-md p-4 space-y-4'>
                        <Skeleton className='w-1/4 h-4' />
                        <Skeleton className='w-3/5 h-4' />
                        <Skeleton className='w-1/2 h-4' />
                        <Skeleton className='w-full h-4' />
                    </div>
                )}
                {status === 'success' && (
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                        {ideas.map((idea, index) => (
                            <PostIdeaCard key={index} ideaDescription={idea} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

type PostIdeaCardProps = {
    ideaDescription: string;
};

export const PostIdeaCard = ({ ideaDescription }: PostIdeaCardProps) => {
    const router = useRouter();
    return (
        <div className='border rounded-lg p-4 shadow-sm flex flex-col gap-2'>
            <div className='flex justify-end text-primary/50'>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <ThumbsUp size={18} />
                </Button>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <ThumbsDown size={18} />
                </Button>
            </div>
            <p>{ideaDescription}</p>
            <div className='flex gap-4'>
                <ButtonWithTooltip
                    icon={Feather}
                    label='Crear Post'
                    onClick={async () => {
                        toast.success('Creando.post..');
                        // setStatus('loading');
                        // const newCarousel = await createLinkedinCarousel(post);
                        // setStatus('idle');
                        router.push(
                            `/app/post-writter?description=${encodeURIComponent(ideaDescription)}`
                        );
                        // console.log(newCarousel);
                    }}
                />
                <ButtonWithTooltip
                    icon={Save}
                    label='Guardar Idea'
                    onClick={async () => {
                        toast.success('Creando.post..');
                        // setStatus('loading');
                        // const newCarousel = await createLinkedinCarousel(post);
                        // setStatus('idle');
                        // router.push(`/app/carrousel/${newCarousel.id}`);
                        // console.log(newCarousel);
                    }}
                />
            </div>
        </div>
    );
};
