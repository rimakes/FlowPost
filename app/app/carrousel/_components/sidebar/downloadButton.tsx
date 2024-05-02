'use client';

import { Download } from 'lucide-react';
import { useContext, useState } from 'react';
import { CarouselContext } from '../CarouselProvider';
import { Button } from '@/components/ui/button';
import { TStatus } from '@/types/types';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import Spinner from '@/components/icons/SpinnerIcon';
import { fromHtmlElementsToPdf } from '@/lib/toPdf';

type ImageFormat = 'pdf' | 'svg';

type DownloadButtonProps = {
    className?: string;
};

export function DownloadButton({ className }: DownloadButtonProps) {
    const [status, setStatus] = useState<TStatus>('idle');
    const { arrayOfRefs } = useContext(CarouselContext);

    if (arrayOfRefs.length === 0) return null;

    const onDownload = async (format: ImageFormat) => {
        setStatus('loading');

        switch (format) {
            case 'pdf':
                const currentArray = arrayOfRefs.map((ref) => ref.current!);
                const arrayBuffer = await fromHtmlElementsToPdf(currentArray);

                const formData = new FormData();
                formData.append(
                    'file',
                    new Blob([arrayBuffer], { type: 'application/pdf' })
                );

                const cldRes = await uploadFileToCloudinary(formData);

                // download the pdf
                const a = document.createElement('a');
                a.href = cldRes.url;
                a.target = '_blank';
                a.download = 'carousel.pdf';
                a.click();

                break;
        }
        setStatus('idle');
    };

    const downloadButton =
        status === 'loading' ? (
            <Button disabled={true} className={cn(`w-full`, className)}>
                Descargando...
                <Spinner className='ml-2' />
            </Button>
        ) : (
            <Button className={cn(`w-full`, className)} variant={'secondary'}>
                Descargar
                <Download className='ml-2' />
            </Button>
        );

    return (
        <div className='isolate z-50'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className=''>
                    {downloadButton}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='isolate z-50 flex flex-col items-center gap-2 bg-background'>
                    <DropdownMenuItem
                        onClick={() => {
                            onDownload('pdf');
                        }}
                        className='PDF-button z-[9999] w-full justify-center'
                    >
                        PDF
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
