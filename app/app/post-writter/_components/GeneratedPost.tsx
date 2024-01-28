import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Edit, GalleryHorizontal, LucideIcon, Save } from 'lucide-react';

type GeneratedPostProps = {
    className?: string;
};

export const PostWritterResult = ({ className }: GeneratedPostProps) => {
    return (
        <div className={cn(``, className)}>
            <div className=''>
                <h2 className='text-2xl font-bold'>Post generado</h2>
                <p>Este es el texto generado por la IA</p>
                <Separator />
                <p>Generated post</p>
            </div>
            <div className='border border-muted p-2 space-y-2'>
                <Textarea
                    readOnly
                    rows={20}
                    className='border-none resize-none'
                    defaultValue={`Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci provident temporibus hic ut nihil quia molestias,
                    consectetur distinctio in totam, iure libero id fugiat
                    debitis laboriosam odio iusto, maiores dolorem. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Eos maxime
                    vero, quod, dignissimos hic eum placeat, iusto atque ratione
                    dolorem asperiores harum vel delectus. Impedit voluptatem
                    atque aspernatur provident doloremque!`}
                />

                <div className='flex gap-2'>
                    <PostActionButton icon={Save} label='Guardar post' />
                    <PostActionButton icon={Edit} label='Editar post' />
                    <PostActionButton
                        icon={GalleryHorizontal}
                        label='Crear carrusel'
                    />
                </div>
            </div>
        </div>
    );
};

type PostActionButtonProps = {
    label?: string;
    className?: string;
    icon: LucideIcon;
};

export const PostActionButton = ({
    icon: Icon,
    className,
    label,
}: PostActionButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className={className}>
                    <Button
                        className='flex-1 rounded-full bg-muted text-primary/50
                    hover:bg-primary/10
                    '
                    >
                        <Icon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
