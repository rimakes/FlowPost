'use client';

import { Download } from 'lucide-react';
import { toCanvas, toPng } from 'html-to-image';
import { useContext, useState } from 'react';
import { CarouselContext } from '../ContextProvider';
import { Button, buttonVariants } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { TStatus } from '@/types/types';
import Spinner from '@/components/icons/spinner';
import { uploadFileToCloudinary } from '@/app/_actions/shared-actions';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { DownloadButton } from './downloadButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fromPdfUrlToThumnailUrl } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { upsertCarousel } from '@/app/_actions/writter-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type ImageFormat = 'pdf';

type ContinueButtonProps = {};

export function ContinueButton({}) {
    const router = useRouter();
    const [status, setStatus] = useState<TStatus>('idle');
    const [isOpen, setIsOpen] = useState(false);
    const {
        arrayOfRefs,
        carousel,
        carousel: { id },
        setCarousel,
        setPdfUrl,
    } = useContext(CarouselContext);
    const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
    const { data } = useSession();

    if (arrayOfRefs.length === 0) return null;

    const onAsignToPost = () => {
        carousel.linkedinPostId
            ? router.push(
                  `/app/post-writter/${carousel.linkedinPostId}?cid=${carousel.id}`
              )
            : router.push(`/app/post-writter/new?cid=${carousel.id}`);
    };

    const onCarouselLoad = async () => {
        setStatus('loading');
        setThumbnailUrls([]);

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
        const arrayBuffer = pdf.output('arraybuffer');
        const formData = new FormData();
        formData.append(
            'file',
            new Blob([arrayBuffer], { type: 'application/pdf' })
        );

        const res = await uploadFileToCloudinary(formData);

        const canvas = await toCanvas(arrayOfRefs[0].current!);
        const dataUrl = canvas.toDataURL();

        console.log('res', res);

        const savedCarousel = await upsertCarousel(
            {
                ...carousel,
                thumbnailDataUrl: dataUrl,
                publicId: res.publicId,
                pdfUrl: res.url,
            },
            data?.user.id!
        );
        window.history.replaceState(
            null,
            'unused',
            `/app/carrousel/${savedCarousel.id}`
        );
        setCarousel(savedCarousel); //REVIEW: Don't love doing it this way, but...is there a way to update the url and THEN load the dialog? (other than using a conditional useEffect)

        arrayOfRefs.forEach(async (ref, index) => {
            const url = fromPdfUrlToThumnailUrl(res.publicId, index + 1);
            setThumbnailUrls((prev) => [...prev, url]);
        });

        toast.success('Carrusel Guardado!');
        setIsOpen(true);
        setStatus('idle');
    };

    const buttonText =
        status === 'loading' ? (
            <>
                Cargando carrusel...
                <Spinner className='ml-2' />
            </>
        ) : (
            <>
                Continuar
                <Download className='ml-2' />
            </>
        );

    return (
        <>
            <Button onClick={onCarouselLoad}>{buttonText}</Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className=' md:max-w-5xl'>
                    <DialogHeader className='text justify-center items-center'>
                        <h2 className='text-2xl font-bold'>
                            ✨ ¡Carrusel creado!
                        </h2>
                        <p>
                            Ahora descárgalo o asígnalo a un post para
                            publicarlo
                        </p>
                    </DialogHeader>
                    <Label>Título del carrusel</Label>
                    <Input
                        placeholder='Como crear hooks de linkedin en 5 pasos'
                        value={carousel.title || ''}
                        onChange={(e) =>
                            setCarousel({ ...carousel, title: e.target.value })
                        }
                    />
                    <div className='overflow-auto'>
                        <div className='flex gap-2'>
                            {thumbnailUrls.length > 0 &&
                                thumbnailUrls.map((url) => (
                                    <div
                                        key={url}
                                        className='relative h-40 w-40 shrink-0'
                                    >
                                        <Image
                                            src={url}
                                            fill
                                            alt='carousel slide'
                                            className='object-contain'
                                            placeholder={'blur'}
                                            blurDataURL={url}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <DialogFooter className='flex !justify-end gap-4'>
                        <DownloadButton
                            className={buttonVariants({
                                variant: 'secondary',
                            })}
                        />
                        <Button
                            onClick={async () => {
                                await upsertCarousel(
                                    {
                                        ...carousel,
                                        title: carousel.title!,
                                    },
                                    data?.user.id!
                                );
                                onAsignToPost();
                            }}
                        >
                            {`Asignar a post`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
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
