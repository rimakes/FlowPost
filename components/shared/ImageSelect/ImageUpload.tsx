import { Button } from '@/components/ui/button';
import { Dropzone } from '../dropzone/Dropzone';
import { TStatus } from '@/types/types';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TExtendedFile, Thumbnails } from '../dropzone/Thumbnails';
import { uploadFileToCloudinary } from '@/lib/cloudinary';

type ImageUploadProps = {
    onImageSelect: (url: string) => void;
};
export const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
    const [pictures, setPictures] = useState<TExtendedFile[]>([]);
    const [status, setStatus] = useState<TStatus>('idle');

    const onDrop = (acceptedFiles: File[]) => {
        const fileWithPreview = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        )[0];
        // onImageSelect(fileWithPreview.preview);
        setPictures(() => [fileWithPreview]);
        // form.setValue('imageUrl', fileWithPreview.preview);
    };

    const handleConfirmtImage = async () => {
        setStatus('loading');

        const formData = new FormData();
        formData.append('file', pictures[0]);

        const cloudinaryResponse = await uploadFileToCloudinary(formData);
        console.log('cld response!', cloudinaryResponse);
        const uploadedImageUrl = cloudinaryResponse.url as string;
        setStatus('success');
        // router.refresh();
        toast.success('Imagen subida correctamente');
        setStatus('idle');
        // setIsNewPicture(false);
        // onSave();
        return uploadedImageUrl;
    };

    return (
        <div className='flex items-center justify-stretch gap-4'>
            <Thumbnails
                files={pictures}
                classNamesThumbnails='h-24 w-24 rounded-full'
            />
            <Dropzone
                onDrop={onDrop}
                className='flex h-28 flex-grow flex-col items-center justify-center py-2'
            >
                {pictures.length > 0 && (
                    <div
                        className='flex h-full w-full flex-col items-center justify-center border-0 border-red-500'
                        onClick={(ev) => {
                            ev.stopPropagation();
                        }}
                    >
                        <p>Por favor, confirma</p>
                        <p className='text-sm text-primary/60'>
                            ¿Quieres subir esta imagen?
                        </p>
                        <Button
                            variant={'outline'}
                            size={'sm'}
                            onClick={(ev) => {
                                // prevent event from bubbling up
                                setStatus('loading');
                                ev.stopPropagation();
                                handleConfirmtImage().then((url) => {
                                    onImageSelect(url);
                                });
                            }}
                            className='mt-2 gap-1'
                        >
                            <Upload size={12} />
                            {status === 'loading' ? 'Subiendo...' : 'Subir'}
                        </Button>
                    </div>
                )}
            </Dropzone>
        </div>
    );
};
