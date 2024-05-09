'use client';

import { useState } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { CopyPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@ui/textarea';
import {
    applyInvertedFormatting,
    toggleBold,
    toggleCircled,
    toggleItalic,
    toggleSquare,
    toggleStrikeThrough,
    toggleUnderline,
} from '@/lib/unicodeFormatter';
import { Button } from '@ui/button';

type TextFormatterProps = {};
export function TextFormatter({}: TextFormatterProps) {
    const [content, setContent] = useState('');
    const [copiedText, copy] = useCopyToClipboard();

    return (
        <div className='space-y-8'>
            <Textarea
                className='bg-white'
                value={content}
                onChange={(ev) => {
                    setContent(ev.target.value);
                }}
            />
            {/* TODO: We keep this hidden until we get some seo traction  */}
            {/* <Message className='' variant={'success'}>
                Si quieres probar más estilos, y hacer crecer tu LinkedIn, crea
                una cuenta en FlowPost mejora el engagement de tus posts en
                segundos! Tienes 10 post gratis, sin tarjeta de crédito!
                <GetAccessButton className='mx-auto mt-2' />
            </Message> */}

            <div className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                {formatItems.map((item) => (
                    <FormattedText
                        format={item.name}
                        key={item.name}
                        content={content}
                        formattingFn={item.formattingFn}
                    />
                ))}
            </div>
        </div>
    );
}

export const FormattedText = ({
    format,
    content,
    formattingFn,
}: {
    format: string;
    content: string;
    formattingFn: (content: string) => string;
}) => {
    const [copiedText, copy] = useCopyToClipboard();

    return (
        <div>
            <h3>
                {format}{' '}
                <span>
                    Ej. {formattingFn('A')} {formattingFn('a')}
                </span>
            </h3>
            <p
                className={`relative min-h-[2.7rem] select-all rounded-lg border bg-white p-2 font-sans`}
            >
                {formattingFn(content)}

                <Button
                    onClick={() => {
                        copy(formattingFn(content));
                        toast.success('Texto copiado al portapapeles');
                    }}
                    variant='outline'
                    className='absolute right-0 top-0 aspect-square bg-muted p-2'
                >
                    <CopyPlus height={15} width={15} />
                </Button>
            </p>
        </div>
    );
};

const formatItems = [
    {
        name: 'Negrita',
        formattingFn: toggleBold,
    },
    {
        name: 'Cursiva',
        formattingFn: toggleItalic,
    },
    {
        name: 'Negrita y Cursiva',
        formattingFn: (text: string) => toggleBold(toggleItalic(text)),
    },
    {
        name: 'Subrayado',
        formattingFn: toggleUnderline,
    },
    {
        name: 'Tachado',
        formattingFn: toggleStrikeThrough,
    },
    {
        name: 'En Círculo',
        formattingFn: toggleCircled,
    },
    {
        name: 'En Cuadrado',
        formattingFn: toggleSquare,
    },
    {
        name: 'Invertido',
        formattingFn: applyInvertedFormatting,
    },
];
