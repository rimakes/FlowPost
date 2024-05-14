'use client';

import { useState } from 'react';
import { v4 as v4uuid } from 'uuid';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { SettingsSectionHeader } from '@/app/app/settings/_components/SettingsSectionHeader';
import { TLinkedinPost, TWrittingStyle } from '@/types/types';
import { Button } from '@ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@ui/dialog';
import { toggleElementInArray } from '@/lib/utils';
import { createWrittingStyle } from '@/app/_actions/user-actions';
import { Input } from '@ui/input';

type WrittingStylesClientProps = {
    posts: TLinkedinPost[];
    writtingStyle: TWrittingStyle;
};

export function WrittingStylesClient({
    posts,
    writtingStyle: initialWrittingStyle,
}: WrittingStylesClientProps) {
    const [writtingStyle, setWrittingStyle] = useState(initialWrittingStyle);
    const [isOpen, setIsOpen] = useState(false);

    const onCreateStyle = async () => {
        if (initialWrittingStyle.inputs.posts.length < 10) {
            return toast.error('Debes seleccionar al menos 10 posts');
        }
        if (initialWrittingStyle.name === '') {
            return toast.error('Debes darle un nombre al estilo');
        }
        const newStyle = createWrittingStyle(writtingStyle);

        toast.promise(newStyle, {
            loading: 'Creando estilo...',
            success: () => {
                console.log(newStyle);
                return 'Estilo creado';
            },
            error: 'Error al crear el estilo',
        });
    };

    const onSave = (postIds: string[]) => {
        setWrittingStyle((prev) => {
            const newPosts = postIds.map(
                (postId) => posts.find((p) => p.id === postId)!.content
            );
            return {
                ...prev,
                inputs: {
                    posts: newPosts,
                },
            };
        });
        setIsOpen(false);
    };
    // REVIEW: Again, how I assign an id to each post that doesn't change or get lost when the component re-renders?

    return (
        <>
            <SettingsSectionHeader
                title='Haz que tu IA escriba como tú'
                subtitle='Configura tu estilo de escritura'
            >
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>+ Añadir Posts</Button>
                    </DialogTrigger>
                    <DialogContent className='max-h-[100vh] md:max-w-[75%]'>
                        <DialogHeader>
                            <h2 className='text-center text-lg font-bold'>
                                Selecciona al menos 10 posts
                            </h2>
                        </DialogHeader>
                        <PostSelector posts={posts} onSave={onSave} />
                    </DialogContent>
                </Dialog>
            </SettingsSectionHeader>
            <Button
                disabled={writtingStyle.inputs.posts.length < 10}
                onClick={onCreateStyle}
            >
                Guardar Estilo
            </Button>
            <Input
                value={writtingStyle.name}
                onChange={(e) =>
                    setWrittingStyle((prev) => ({
                        ...prev,
                        name: e.target.value,
                    }))
                }
                placeholder='Nombre del estilo'
            />
            <Link href={'/app/settings?tab=writtingStyle'}>Volver</Link>
            <div className='grid grid-cols-3 gap-4'>
                {writtingStyle.inputs.posts.map((post, index) => (
                    // TODO: change this!
                    <div
                        key={v4uuid()}
                        className='group relative rounded-lg bg-white p-4 transition-transform hover:-translate-y-1'
                    >
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='absolute right-1 top-1 rounded-full p-0 opacity-0 group-hover:opacity-100'
                            onClick={() =>
                                setWrittingStyle((prev) => ({
                                    ...prev,
                                    inputs: {
                                        posts: prev.inputs.posts.filter(
                                            (_, i) => i !== index
                                        ),
                                    },
                                }))
                            }
                        >
                            <XIcon className='h-5 w-5' />
                        </Button>

                        <p className='line-clamp-4 '>{post}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export const PostSelector = ({
    posts,
    onSave,
}: {
    posts: TLinkedinPost[];
    onSave: (postIds: string[]) => void;
}) => {
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    return (
        <div className='space-y-4'>
            <div className='grid max-h-[70vh] grid-cols-3 gap-4 overflow-y-auto'>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className='cursor-pointer rounded-lg bg-white p-4 transition-transform hover:-translate-y-1'
                        onClick={() => {
                            setSelectedPosts(
                                toggleElementInArray(selectedPosts, post.id)
                            );
                            console.log(selectedPosts);
                        }}
                    >
                        <p
                            className={`line-clamp-6 h-full w-full text-xs  ${selectedPosts.includes(post.id) ? 'text-blue-500' : 'text-gray-500'}`}
                        >
                            {post.content}
                        </p>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <Button variant={'secondary'}>Cancelar</Button>
                <Button onClick={() => onSave(selectedPosts)}>
                    Guardar {selectedPosts.length}
                </Button>
            </div>
        </div>
    );
};
