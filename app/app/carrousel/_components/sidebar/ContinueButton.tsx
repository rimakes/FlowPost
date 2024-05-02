'use client';

import { Download } from 'lucide-react';
import { toCanvas } from 'html-to-image';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CarouselContext } from '../CarouselProvider';
import { DownloadButton } from './downloadButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { TStatus } from '@/types/types';
import { revalidateAllPaths } from '@/app/_actions/other-actions';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dataUrl, fromPdfUrlToThumnailUrl } from '@/lib/utils';
import { upsertCarousel } from '@/app/_actions/carousel-actions';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import Spinner from '@/components/icons/SpinnerIcon';
import { fromHtmlElementsToPdf } from '@/lib/toPdf';

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
        router.refresh();

        carousel.linkedinPostId
            ? router.push(`/app/post-writter/${carousel.linkedinPostId}`)
            : router.push(`/app/post-writter/new`);
    };

    const onCarouselLoad = async () => {
        setStatus('loading');
        setThumbnailUrls([]);
        const currentArray = arrayOfRefs.map((ref) => ref.current!);
        const arrayBuffer = await fromHtmlElementsToPdf(currentArray);
        const formData = new FormData();
        formData.append(
            'file',
            new Blob([arrayBuffer], { type: 'application/pdf' })
        );

        const cldResPromise = uploadFileToCloudinary(formData);
        const canvasPromise = toCanvas(arrayOfRefs[0].current!);

        const [cldRes, canvas] = await Promise.all([
            cldResPromise,
            canvasPromise,
        ]);

        const dataUrl = canvas.toDataURL();

        const savedCarousel = await upsertCarousel(
            {
                ...carousel,
                thumbnailDataUrl: dataUrl,
                publicId: cldRes.publicId,
                pdfUrl: cldRes.url,
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
            const url = fromPdfUrlToThumnailUrl(cldRes.publicId, index + 1);
            setThumbnailUrls((prev) => [...prev, url]);
        });
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
            <Button
                onClick={() => {
                    toast.promise(onCarouselLoad(), {
                        loading: 'Creando pdf y guardando tu carrusel...',
                        success: 'Carrusel cargado y guardado',
                        error: 'Error al crear carrusel',
                        finally: async () => {
                            await revalidateAllPaths();
                            setIsOpen(true);
                            setStatus('idle');
                        },
                    });
                }}
            >
                {buttonText}
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className=' md:max-w-5xl'>
                    <DialogHeader className='text items-center justify-center'>
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
                                            blurDataURL={dataUrl}
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
