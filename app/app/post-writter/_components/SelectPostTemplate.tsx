import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';
import { POST_TEMPLATES, TEMPLATE_CATEGORIES } from './const';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

type SelectPostTemplateProps = {
    setSelected: (selected: number) => void;
};

export const SelectPostTemplate = ({
    setSelected,
}: SelectPostTemplateProps) => {
    const [selectedCategory, setSelectedTemplate] =
        useState<(typeof TEMPLATE_CATEGORIES)[number]>('todos');
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

    const selectedCategoryTemplates = POST_TEMPLATES.filter(
        (template) =>
            template.category === selectedCategory ||
            selectedCategory === 'todos'
    );

    // REVIEW: LAYOUT: Need to find a pattern to make this layout more responsive
    // DONE: Review in codepen: https://codepen.io/RicSala/pen/zYbpKwj
    return (
        <div className='flex flex-col gap-4 space-y-2 border-0 border-black max-h-[90vh]'>
            {/* HEADER */}
            <h2 className='font-semibold mb-4'>
                Selecciona el formato de tu post
            </h2>

            <div className='flex flex-col gap-2'>
                <Label className='text-sm font-semibold'>Categorías</Label>
                <div className='flex flex-wrap gap-2 border-0 border-green-400 max-h-24 overflow-x-auto'>
                    {TEMPLATE_CATEGORIES.map((category) => {
                        return (
                            <Button
                                key={category}
                                className='rounded-full'
                                variant={
                                    selectedCategory === category
                                        ? 'default'
                                        : 'outline'
                                }
                                size={'sm'}
                                onClick={() => setSelectedTemplate(category)}
                            >
                                {category}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* BODY */}
            <div className='flex grow min-h-0 border-0 border-yellow-600'>
                <div className='sidebar basis-64 grow overflow-y-scroll border-0 border-blue-500 max-h-full'>
                    {selectedCategoryTemplates.map((template, index) => {
                        return (
                            <div
                                // TODO: change the key to something more unique
                                key={index}
                                className={`p-2 cursor-pointer text-sm border border-muted ${selectedPreviewIndex && 'bg-muted border-r-8 border-r-primary'} ${index}`}
                                onClick={() => setSelectedPreviewIndex(index)}
                            >
                                <h3 className='font-semibold overflow-hidden line-clamp-2'>
                                    {template.name}
                                </h3>
                                <p className='overflow-hidden text-ellipsis line-clamp-2'>
                                    {template.content}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className='border-0 basis-0 grow-[999] min-w-[50%] border-red-400 flex flex-col max-h-full overflow-y-scroll'>
                    <div className='flex-grow border-0 border-green-400'>
                        <p className='whitespace-pre-line'>
                            {POST_TEMPLATES[selectedPreviewIndex].content}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap justify-between p-2 gap-2'>
                <Button variant={'outline'} type='button' className='flex-1'>
                    <Pen className='mr-2 h-5 w-5' />
                    Editar
                </Button>

                <Button
                    onClick={() => setSelected(selectedPreviewIndex)}
                    className='flex-1'
                >
                    Usar esta plantilla
                </Button>
            </div>
        </div>
    );
};

export type PostTemplate = {
    name: string;
    category: string;
    title: string;
    content: string;
};

export type PostTemplateCardProps = {
    template: PostTemplate;
    onDelete?: () => void;
    className?: string;
};

export const SelectedPostTemplateCard = ({
    template,
    onDelete,
    className,
}: PostTemplateCardProps) => {
    return (
        <div
            className={cn(
                `rounded-lg border border-muted space-y-2 p-4 w-full`,
                className
            )}
        >
            <p className='font-semibold'>{template.name}</p>
            <p className='w-full line-clamp-2'>{template.content}</p>
            <div className='flex justify-between'>
                <Button variant={'ghost'} type='button'>
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
