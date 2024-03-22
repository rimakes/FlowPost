import Image from 'next/image';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';

type ImageSearchProps = {
    // query: string;
    // setPhotoUrls: (urls: string[]) => void;
    getImages: (query: string) => Promise<string[]>;
    onImageSelect: (url: string) => void;
};
export function ImageSearch({
    // query,
    // setPhotoUrls,
    getImages,
    onImageSelect,
}: ImageSearchProps) {
    const [query, setQuery] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const onSearch = async () => {
        if (query === '') return toast('Debes ingresar un término de búsqueda');
        const pictures = await getImages(query);
        console.log('pictures', pictures);
        setImageUrls(pictures);
    };

    return (
        <form className='overflow-x-auto flex flex-col gap-2' action={onSearch}>
            <Label htmlFor='paragraph'>Imagen</Label>
            <div className='flex gap-2'>
                <Input
                    className='inline-block'
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    placeholder='Ej. "Coches" · Imágenes por pexels.com'
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
                            }}
                        />
                    </div>
                ))}
            </div>
        </form>
    );
}
