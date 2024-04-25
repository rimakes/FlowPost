'use client';
import { ColorPalette } from '../../carrousel/_components/sidebar/ColorPalette';
import { Brand } from '@prisma/client';
import { TFont, TFontName } from '@/types/types';
import { Button } from '@/components/ui/button';
import { deleteBrand } from '@/app/_actions/settings-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BrandKitEditForm } from './BrandKitEditForm';
import { useState } from 'react';
import Image from 'next/image';
import { Select, SelectTrigger } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

type BrandKitCardProps = {
    brand: Brand;
};

export const BrandKitCard = ({ brand }: BrandKitCardProps) => {
    const router = useRouter();
    const handleDelete = async () => {
        await deleteBrand(brand.id);
        toast.success('Marca eliminada');
        router.refresh();
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div className='flex items-center justify-between gap-4 rounded-lg rounded-l-full border p-2'>
                <div className='flex items-center gap-4'>
                    <div className='relative h-20 w-20 overflow-hidden rounded-full'>
                        <Image
                            alt='brand profile pic'
                            src={brand.imageUrl}
                            fill
                            className='object-cover'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold'>{brand.name}</p>
                        <p className='text-primary/50'>{brand.handle}</p>
                    </div>
                </div>
                <ColorPalette
                    orientation='vertical'
                    className='w-4'
                    colors={brand.colorPalette}
                    onClick={() => {}}
                />
                <div className='flex-col gap-2'>
                    {Object.keys(brand.fontPalette).map((fontType) => (
                        <div
                            key={fontType}
                            className={`flex items-center gap-2`}
                            style={{
                                fontFamily:
                                    brand.fontPalette[fontType as TFont],
                            }}
                        >
                            {fontType}
                        </div>
                    ))}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='rounded-full border'
                        >
                            <MoreHorizontal size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => {
                                setIsDialogOpen(true);
                            }}
                        >
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}>
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <BrandKitEditForm
                            defaultValues={brand}
                            onSave={() => {
                                setIsDialogOpen(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {Object.keys(brand.fontPalette).map((fontType) => (
                <>
                    <style>
                        {`#font-test {
    font-family: ${brand.fontPalette[fontType as TFont]} !important;
}`}
                    </style>
                    <link
                        rel='stylesheet'
                        href={`https://fonts.googleapis.com/css?family=${brand.fontPalette[fontType as TFont].replace(' ', '+')}`}
                    />
                </>
            ))}
        </>
    );
};
