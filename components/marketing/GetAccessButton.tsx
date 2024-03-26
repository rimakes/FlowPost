'use client';

import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { MoreHorizontal, Palette, Shield, Sparkle } from 'lucide-react';
import { appConfig } from '@/config/shipper.appconfig';

type GetAccessButtonProps = {};
export function GetAccessButton({}: GetAccessButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [step, setStep] = useState(1);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex shadow-xl' onClick={() => {}}>
                    Consigue {appConfig.general.appName}+
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-full overflow-y-auto min-h-[2/3]'>
                {
                    {
                        1: <FirstStep onNext={setStep} />,
                        2: <SecondStep />,
                    }[step]
                }
            </DialogContent>
        </Dialog>
    );
}

type ModalHeaderProps = {
    title: string;
    subtitle: string;
};

export const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => {
    return (
        <div className='flex flex-col gap-2 p-2 items-center'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <p className='text-sm text-primary/70'>{subtitle}</p>
        </div>
    );
};

type FirstStepProps = {
    onNext: (n: number) => void;
};
const FirstStep = ({ onNext }: FirstStepProps) => {
    return (
        <div className='flex flex-col justify-start gap-12'>
            <ModalHeader
                title={`Consigue ${appConfig.general.appName}+`}
                subtitle={`Usa ${appConfig.general.appName} sin limitaciones`}
            />
            <Separator className='-mt-4 -mb-4' />
            <div className='flex flex-col gap-6 p-2'>
                {modalItems.map((item, index) => (
                    <ModalItem key={index} {...item} />
                ))}
            </div>
            <Separator className='-mt-4 -mb-4' />
            <div className='flex justify-center flex-col items-center gap-4 sticky bottom-0 bg-background '>
                <Button
                    onClick={() => {
                        onNext(2);
                    }}
                >
                    Consigue {appConfig.general.appName}+
                </Button>
                <p className='flex gap-2 text-xs items-center text-primary/50'>
                    <Shield className='h-4 w-4' />
                    Devolución gratuita 7 días
                </p>
            </div>
        </div>
    );
};

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
                <p className='text-sm text-primary/60'>{description}</p>
            </div>
        </div>
    );
};

const SecondStep = () => {
    return (
        <div className='flex flex-col justify-start gap-12'>
            <ModalHeader
                title={`Elige tu plan de ${appConfig.general.appName}+`}
                subtitle='y empieza a disfrutar de todas las funcionalidades'
            />
            <Separator className='-mt-4 -mb-4' />
            <div className='flex flex-col gap-6 p-2'>
                {modalItems.map((item, index) => (
                    <ModalItem key={index} {...item} />
                ))}
            </div>
            <Separator className='-mt-4 -mb-4' />
            <div className='flex justify-center flex-col items-center gap-4 sticky bottom-0 bg-background '>
                <Button>Consigue {appConfig.general.appName}+</Button>
                <p className='flex gap-2 text-xs items-center text-primary/50'>
                    <Shield className='h-4 w-4' />
                    Devolución gratuita 7 días
                </p>
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
        icon: MoreHorizontal,
        title: 'Más en camino!',
        description:
            'Añado funcionalidades cada semana basadas en tus sugerencias',
    },
];
