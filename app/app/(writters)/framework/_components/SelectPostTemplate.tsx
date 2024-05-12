import { Pen } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { PostCategory, PostTemplate } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { POST_TEMPLATES } from '../../assisted/config/prompts';
import { POST_CATEGORIES } from '../../assisted/config/const';
import { Pure } from '@/types/types';
import { cn, getPostTemplateById, proToast } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SelectPostTemplateProps = {
    setSelected: (selected: string) => void;
    availablePostTemplateIds?: PostTemplate['id'][];
};

export const SelectPostTemplate = ({
    setSelected,
    availablePostTemplateIds = POST_TEMPLATES.map((template) => template.id),
}: SelectPostTemplateProps) => {
    const [selectedCategory, setSelectedCategory] = useState<
        Pure<PostCategory>
    >({
        id: '0',
        name: 'todos',
        tags: [``],
        description: '',
    });
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState('0');
    const router = useRouter();

    const selectedCategoryTemplates = POST_TEMPLATES.filter((template) => {
        return (
            template.tags.includes(selectedCategory.name) ||
            selectedCategory.name === 'todos'
        );
    });

    const selectedTemplate = getPostTemplateById(selectedPreviewIndex);

    // REVIEW: LAYOUT: Need to find a pattern to make this layout more responsive
    // DONE: Review in codepen: https://codepen.io/RicSala/pen/zYbpKwj
    return (
        <div className='flex max-h-[90vh] flex-col gap-4 space-y-2 border-0 border-black'>
            {/* HEADER */}
            <h2 className='mb-4 font-semibold'>
                Selecciona el formato de tu post
            </h2>

            <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold'>Categorías</Label>
                <div className='flex max-h-24 flex-wrap gap-2 overflow-x-auto border-0 border-green-400'>
                    {POST_CATEGORIES.map((category) => {
                        return (
                            <Button
                                key={category.id}
                                className='rounded-full'
                                variant={
                                    selectedCategory.id === category.id
                                        ? 'default'
                                        : 'outline'
                                }
                                size={'sm'}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.name}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* BODY */}
            <div className='flex min-h-0 grow border-0 border-yellow-600'>
                <div className='sidebar max-h-full grow basis-64 overflow-y-scroll border-0 border-blue-500'>
                    {selectedCategoryTemplates.map((template, index) => {
                        const isAvailable = availablePostTemplateIds?.includes(
                            template.id
                        );
                        return (
                            <div
                                // TODO: change the key to something more unique
                                key={template.id}
                                className={`cursor-pointer border border-muted p-2 text-sm ${selectedPreviewIndex === template.id && 'border-r-8 border-r-primary bg-muted'} ${index} ${!isAvailable && 'opacity-50'} }`}
                                onClick={() => {
                                    console.log(template.id);
                                    if (!isAvailable) {
                                        proToast(
                                            router,
                                            'Esta plantilla no está disponible para tu plan'
                                        );
                                        return;
                                    }
                                    setSelectedPreviewIndex(template.id);
                                }}
                            >
                                <h3 className='line-clamp-2 overflow-hidden font-semibold'>
                                    {template.name}
                                </h3>
                                <p className='line-clamp-2 overflow-hidden text-ellipsis'>
                                    {template.content}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className='flex max-h-full min-w-[50%] grow-[999] basis-0 flex-col overflow-y-scroll border-0 border-red-400'>
                    <div className='flex-grow border-0 border-green-400'>
                        <p className='whitespace-pre-line'>
                            {selectedTemplate!.content}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap justify-between gap-2 p-2'>
                <Button variant={'outline'} type='button' className='flex-1'>
                    <Pen className='mr-2 h-5 w-5' />
                    Editar
                </Button>

                <Button
                    type='button'
                    onClick={() => setSelected(selectedPreviewIndex)}
                    className='flex-1'
                >
                    Usar esta plantilla
                </Button>
            </div>
        </div>
    );
};

export type PostTemplateCardProps = {
    template: Pure<PostTemplate>;
    onDelete?: () => void;
    className?: string;
    onEditClick?: () => void;
};

export const SelectedPostTemplateCard = ({
    template,
    onDelete,
    className,
    onEditClick,
}: PostTemplateCardProps) => {
    return (
        <div
            className={cn(`w-full space-y-2 rounded-lg border p-4`, className)}
        >
            <p className='font-semibold'>{template.name}</p>
            <p className='line-clamp-2 w-full'>{template.content}</p>
            <div className='flex justify-between'>
                <Button variant={'ghost'} type='button' onClick={onEditClick}>
                    <Pen className='mr-2 h-5 w-5' />
                    Editar
                </Button>
                <Button
                    variant={'ghost'}
                    className='text-primary/50'
                    onClick={onDelete}
                >
                    Borrar
                </Button>
            </div>
        </div>
    );
};
