import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export type TExtendedFile = File & {
    preview: string;
};

type ThumbnailsProps = {
    files: TExtendedFile[];
    classNamesImage?: string;
    classNamesThumbnails?: string;
};

export function Thumbnails({
    files,
    classNamesImage,
    classNamesThumbnails,
}: ThumbnailsProps) {
    useEffect(() => {
        // Clean up function to make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    console.log({ files });

    return (
        <>
            {files.map((file) => (
                <div
                    key={file.preview}
                    className={cn(
                        `relative h-8 w-8 overflow-hidden`,
                        classNamesThumbnails
                    )}
                >
                    {!file ? (
                        <div>no file</div>
                    ) : (
                        <Image
                            src={file.preview}
                            // Revoke data uri after image is loaded, otherwise we will keep the memory used by the image
                            onLoad={() => {
                                URL.revokeObjectURL(file.preview);
                            }}
                            fill
                            alt='Image preview'
                            className={cn(`object-cover`, classNamesImage)}
                        />
                    )}
                </div>
            ))}
        </>
    );
}
