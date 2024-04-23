'use client';

import { Download } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Button, buttonVariants } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { TStatus } from '@/types/types';
import Spinner from '@/components/icons/Spinner';
import { uploadFileToCloudinary } from '@/app/_actions/shared-actions';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toPng } from 'html-to-image';

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
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [1350, 1080],
                });
                // REVIEW: How can we optimize this?
                for (let i = 0; i < arrayOfRefs.length; i++) {
                    if (i === 4) {
                        console.log(
                            arrayOfRefs[i].current!.querySelector('img')?.src
                        );
                    }
                    await addSlidetoCarousel(arrayOfRefs[i].current!, pdf);
                    if (i !== arrayOfRefs.length - 1) {
                        pdf.addPage();
                    }
                }
                pdf.save('download.pdf');
                const blob = pdf.output('arraybuffer');
                const formData = new FormData();
                formData.append(
                    'file',
                    new Blob([blob], { type: 'application/pdf' })
                );

                await uploadFileToCloudinary(formData);

                break;
            // case 'svg':
            //     dataUrl = toSvg(arrayOfRefs[0].current!);
            //     link.download = `logo.svg`;
            //     link.href = await dataUrl;
            //     document.body.appendChild(link);
            //     link.click();
            //     document.body.removeChild(link);
            //     break;
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
        <div className='z-50 isolate'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className=''>
                    {downloadButton}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col items-center gap-2 z-50 bg-background isolate'>
                    {/* <DropdownMenuItem
                    onClick={() => {
                        onDownload('svg');
                    }}
                    className='justify-center w-full'
                >
                    SVG
                </DropdownMenuItem> */}
                    <DropdownMenuItem
                        onClick={() => {
                            onDownload('pdf');
                        }}
                        className='PDF-button justify-center w-full z-[9999]'
                    >
                        PDF
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const addSlidetoCarousel = async (htmlElement: HTMLDivElement, pdf: jsPDF) => {
    // This prints the correct image url!!!!
    console.log(htmlElement.querySelector('img')?.src);

    const dataUrl = await toPng(htmlElement, {
        quality: 1,
        pixelRatio: 4,
        // REVIEW: This was causing the issue! <Image> component use the query params
        // indeed, with Next <Image> component, the src is url path is the same for all images and the query params are used to fetch the image that is needed specifically. As toPng was removing the query params, the image was not being fetched correctly.
        includeQueryParams: true,
    });

    // ...but this prints the wrong image url!!!!!!
    console.log('dataUrl', dataUrl);

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
