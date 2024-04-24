import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getPexelImages } from '@/lib/pexels';
import { TStatus } from '@/types/types';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

type ImageSearchOnlineProps = {
    onImageSelect: (url: string) => void;
};

export const ImageSearchOnline = ({
    onImageSelect,
}: ImageSearchOnlineProps) => {
    const [query, setQuery] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [status, setStatus] = useState<TStatus>('idle');

    const onSearch = async () => {
        if (query === '') return toast('Debes ingresar un término de búsqueda');
        try {
            const pictures = await getPexelImages(query);
            setImageUrls(pictures);
        } catch (error) {
            console.error('Error fetching images from Pexels', error);
            toast('Error fetching images from Pexels');
            setStatus('error');
        }
    };

    return (
        <form className='overflow-x-auto flex flex-col gap-2' action={onSearch}>
            {/* <Label htmlFor='paragraph'>Imagen</Label> */}
            <div className='flex gap-2 items-center p-1'>
                <Input
                    className='inline-block'
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    placeholder='Ej. "Coches" Imágenes por pexels.com'
                />
                <Button disabled={status === 'loading'}>
                    {status === 'loading' ? 'Buscando...' : 'Buscar'}
                </Button>
            </div>
            <div className='flex gap-2 items-center overflow-x-auto max-w-[22rem]'>
                {imageUrls.map((url) => (
                    <div
                        key={url}
                        className='relative h-24 aspect-square rounded-md overflow-hidden shrink-0'
                    >
                        <Image
                            src={url}
                            className='object-cover cursor-pointer'
                            alt=''
                            fill
                            onClick={() => {
                                onImageSelect(url);
                                setStatus('success');
                                setStatus('idle');
                            }}
                        />
                    </div>
                ))}
            </div>
        </form>
    );
};
