'use client';

import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Palette, Shield, Sparkle } from 'lucide-react';

type GetAccessButtonProps = {};
export function GetAccessButton({}: GetAccessButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex shadow-xl' onClick={() => {}}>
                    Consigue PerBrand+
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2 p-2 items-center'>
                        <h1 className='text-2xl font-bold text-center'>
                            Consigue PerBrand+
                        </h1>
                        <p className='text-sm text-primary/70'>
                            Usa PerBrand sin limitaciones
                        </p>
                    </div>
                    <Separator className='-mt-4 -mb-4' />
                    <div className='flex flex-col gap-4 p-2'>
                        {modalItems.map((item, index) => (
                            <ModalItem key={index} {...item} />
                        ))}
                    </div>
                    <Separator className='-mt-4 -mb-4' />
                    <div className='flex justify-center flex-col items-center gap-4'>
                        <Button>Consigue PerBrand+</Button>
                        <p className='flex gap-2 text-xs items-center text-primary/50'>
                            <Shield className='h-4 w-4' />
                            Devolución gratuita 7 días
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

type ModalItemProps = {
    icon: FC;
    title: string;
    description: string;
};

const ModalItem = ({ icon: Icon, title, description }: ModalItemProps) => {
    return (
        <div className='flex gap-4 items-center'>
            <Icon />
            <div className='flex flex-col'>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p className='text-sm text-primary/70'>{description}</p>
            </div>
        </div>
    );
};

const modalItems: ModalItemProps[] = [
    {
        icon: Palette,
        title: 'Plantillas ilimitadas',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Sparkle,
        title: 'Guarda tus ajustes de marca',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Palette,
        title: 'Plantillas ilimitadas',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Sparkle,
        title: 'Guarda tus ajustes de marca',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Palette,
        title: 'Plantillas ilimitadas',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Sparkle,
        title: 'Guarda tus ajustes de marca',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Palette,
        title: 'Plantillas ilimitadas',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
    {
        icon: Sparkle,
        title: 'Guarda tus ajustes de marca',
        description: 'Usa todas las plantillas que quieras asdf asdf asdf adsf',
    },
];
