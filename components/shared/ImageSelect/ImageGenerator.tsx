import { generateNImages } from '@/app/_actions/image-actions';
import Spinner from '@/components/icons/spinner';
import { Input } from '@/components/ui/input';
import { ImageWithDataUrl, TStatus } from '@/types/types';
import { range } from '@mantine/hooks';
import { useState } from 'react';
import { ImageWithLoading } from '../ImageWithLoading';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type ImageGeneratorProps = {
    onImageSelect: (url: string) => void;
};

export const ImageGenerator = ({ onImageSelect }: ImageGeneratorProps) => {
    const [query, setQuery] = useState<string>('');
    const [images, setImages] = useState<ImageWithDataUrl[]>([]);
    const [status, setStatus] = useState<TStatus>('idle');

    const onSubmit = () => {
        setStatus('loading');
        generateNImages(query, 4).then((images) => {
            console.log('images', images);
            setImages(
                images.filter(
                    (image) => image?.url !== null
                ) as ImageWithDataUrl[]
            );
            setStatus('success');
        });
    };

    return (
        <div>
            <Dialog defaultOpen={true}>
                <DialogContent>
                    <div className='grid grid-cols-2 gap-2 justify-items-center '>
                        {range(0, 3).map((_, index) => (
                            <ImageWithLoading
                                key={index}
                                imageUrl={images[index]?.url}
                                dataUrl={images[index]?.dataUrl}
                                status={status}
                                onImageSelect={onImageSelect}
                            />
                        ))}
                    </div>
                    <Label>Describe tu imagen</Label>
                    <form
                        onSubmit={(ev) => {
                            ev.preventDefault();
                            onSubmit();
                        }}
                    >
                        <Input
                            placeholder='Un oso panda montando en bicicleta'
                            value={query}
                            onChange={(ev) => setQuery(ev.target.value)}
                        />
                        <Button type='submit' className='w-full mt-2'>
                            {status === 'loading' ? (
                                <>
                                    <Spinner className='mr-2' />
                                    Generando
                                </>
                            ) : (
                                `Generar Imagen`
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
