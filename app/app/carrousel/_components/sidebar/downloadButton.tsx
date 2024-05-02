'use client';

import { Download } from 'lucide-react';
import { useContext, useState } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
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
        <div className='isolate z-50'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className=''>
                    {downloadButton}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='isolate z-50 flex flex-col items-center gap-2 bg-background'>
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
                        className='PDF-button z-[9999] w-full justify-center'
                    >
                        PDF
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const addSlidetoCarousel = async (htmlElement: HTMLDivElement, pdf: jsPDF) => {
    try {
        const dataUrl = await toPng(htmlElement, {
            quality: 1,
            includeQueryParams: true,
            pixelRatio: 2,
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
    } catch (error) {}
};
