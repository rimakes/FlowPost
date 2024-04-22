'use client';
// DOCS: https://react-dropzone.js.org
// https://cloudinary.com/blog/guest_post/upload-images-with-react-dropzone

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import { TExtendedFile } from './Thumbnails';
import { ReactNode } from 'react';
import { ThumbsUp } from 'lucide-react';

type DropzoneProps = {
    onDrop?: (files: File[]) => void;
    className?: string;
    children?: React.ReactNode;
    maxFiles?: number;
    dragActiveElement?: ReactNode;
    dragInactiveElement?: ReactNode;
    value?: string;
};
export function Dropzone({
    onDrop = () => {},
    className,
    children,
    maxFiles = 1,
    dragActiveElement: propDragActiveElement,
    dragInactiveElement: propDragInactiveElement,
    value,
}: DropzoneProps) {
    const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
        useDropzone({
            maxFiles,
            accept: {
                'image/*': [],
            },
            onDrop: () => {},
            onDropAccepted: (files) => {
                onDrop(files);
            },
            onDropRejected: (files) => {},
        });

    const dragActiveElement = propDragActiveElement || (
        <p className='text-center'>Suelta tu archivo</p>
    );

    const dragInactiveElement = propDragInactiveElement || (
        <p className='flex !flex-1 flex-col items-center text-center gap-2'>
            Arrastra o clicka aquí
            <span className='text-primary/60 text-sm'>
                para seleccionar tu archivo
            </span>
        </p>
    );

    const hasFilesElement = dragInactiveElement;
    // acceptedFiles.length > 0 && <ThumbsUp size={30} />;

    return (
        <div
            {...getRootProps({
                // Here you can add event handlers that will be executed BEFORE the ones registered by the library
            })}
            className={cn(
                `border border-primary/20 border-dashed rounded !py-0`,
                className
            )}
        >
            <Input type='file' {...getInputProps()} />
            {acceptedFiles.length > 0 || value
                ? hasFilesElement
                : isDragActive
                  ? dragActiveElement
                  : dragInactiveElement}
            {children}
        </div>
    );
}
