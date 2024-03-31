'use client';

import { Download } from 'lucide-react';
import { toPng, toSvg } from 'html-to-image';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CarouselContext } from '../ContextProvider';
import { Button, buttonVariants } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { TStatus } from '@/types/types';
import Spinner from '@/components/icons/spinner';
import { uploadFileToCloudinary } from '@/app/_actions/shared-actions';
import { cn } from '@/lib/utils';

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
        let dataUrl;
        let link = document.createElement('a');

        switch (format) {
            case 'pdf':
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [1350, 1080],
                });
                // REVIEW: How can we optimize this?
                for (let i = 0; i < arrayOfRefs.length; i++) {
                    await addSlidetoCaroulse(arrayOfRefs[i].current!, pdf);
                    if (i !== arrayOfRefs.length - 1) {
                        pdf.addPage();
                    }
                }
                const savedPdf = pdf.save('download.pdf');
                const blob = pdf.output('arraybuffer');
                const formData = new FormData();
                formData.append(
                    'file',
                    new Blob([blob], { type: 'application/pdf' })
                );

                await uploadFileToCloudinary(formData);

                console.log({ savedPdf });

                break;
            case 'svg':
                dataUrl = toSvg(arrayOfRefs[0].current!);
                link.download = `logo.svg`;
                break;
        }
        // // link.href = await dataUrl;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        setStatus('idle');
    };

    const downloadButton =
        status === 'loading' ? (
            <Button disabled={true} className={cn(``, className)}>
                Descargando...
                <Spinner className='ml-2' />
            </Button>
        ) : (
            <Button className={cn(``, className)} variant={'secondary'}>
                Descargar
                <Download className='ml-2' />
            </Button>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{downloadButton}</DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-2'>
                <DropdownMenuItem
                    onClick={() => {
                        onDownload('svg');
                    }}
                >
                    SVG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        onDownload('pdf');
                    }}
                >
                    PDF
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const addSlidetoCaroulse = async (htmlElement: HTMLDivElement, pdf: jsPDF) => {
    const dataUrl = await toPng(htmlElement, {
        quality: 1,
        pixelRatio: 4,
    });
    pdf.addImage({
        imageData: dataUrl,
        format: 'WEBP',
        x: 0,
        y: 0,
        height: 1350,
        width: 1080,
        compression: 'FAST', // or 'SLOW' for better compression
    });
};
