'use client';
// DOCS: https://react-dropzone.js.org
// https://cloudinary.com/blog/guest_post/upload-images-with-react-dropzone

import { useDropzone } from 'react-dropzone';
import { ReactNode } from 'react';
import { ThumbsUp } from 'lucide-react';
import { TExtendedFile } from './Thumbnails';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

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
        <p className='flex !flex-1 flex-col items-center gap-2 text-center'>
            Arrastra o clicka aquí
            <span className='text-sm text-primary/60'>
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
                `rounded border border-dashed border-primary/20 !py-0`,
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
