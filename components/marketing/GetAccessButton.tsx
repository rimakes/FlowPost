'use client';

import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import {
    Calendar,
    CalendarPlus,
    GalleryHorizontal,
    Info,
    LayoutDashboard,
    MoreHorizontal,
    Newspaper,
    Palette,
    PersonStanding,
    Rocket,
    Save,
    Shield,
    Sparkle,
    Star,
    UserSquare,
} from 'lucide-react';
import { appConfig } from '@/config/shipper.appconfig';
import { Rating } from '../shared/rating';
import { CheckoutButton } from './CheckoutButton';
import { cn } from '@/lib/utils';

type GetAccessButtonProps = {
    buttonProps?: React.ComponentProps<typeof Button>;
    className?: string;
};
export function GetAccessButton({
    buttonProps,
    className,
}: GetAccessButtonProps) {
    const [step, setStep] = useState(1);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(`flex shadow-xl `, className)}
                    {...buttonProps}
                    onClick={() => {}}
                >
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
    subtitle?: string;
};

export const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => {
    return (
        <div className='flex flex-col gap-2 p-2 items-center'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            {subtitle && <p className='text-sm text-primary/70'>{subtitle}</p>}
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
            <Separator className='sm:-mt-4 sm:-mb-4 -mt-8 -mb-8' />
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
                    className='bg-gradient-to-tr from-fuchsia-500 to-indigo-600 w-full'
                >
                    Consigue {appConfig.general.appName}
                    <span className='relative -top-1'>+</span>{' '}
                </Button>
                <div className='flex flex-col gap-2 text-sm italic items-center text-muted-foreground text-center'>
                    <Rating value={5} />
                    <p className=''>
                        &quot;He pasado de dedicar 4 horas a la semana a crear
                        un post y carrusel, a crear{' '}
                        <span className='bg-indigo-400 text-primary-foreground'>
                            {' '}
                            7 posts y carrusels en 10 minutos{' '}
                        </span>
                        &quot;
                    </p>
                </div>
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
            {/* TODO: how could I do this? */}
            {/* @ts-ignore */}
            <Icon className='text-indigo-600' />
            <div className='flex flex-col'>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p className='text-sm text-primary/60'>{description}</p>
            </div>
        </div>
    );
};

export const SecondStep = ({
    successUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/payment-done?success=true&priceId=${appConfig.plans[0].stripePriceId}&session_id={CHECKOUT_SESSION_ID}`,
}: {
    successUrl?: string;
}) => {
    const [seletectedPlan, setSeletectedPlan] = useState<string | null>(
        appConfig.plans[0].stripePriceId
    );

    const [seatsAvailable, setSeatsAvailable] = useState({
        seats: 20,
        taken: 3,
    });

    return (
        <div className='flex flex-col justify-between gap-12 min-h-[600px]'>
            <ModalHeader title={`Elige tu plan`} />
            <Separator className='-mt-4 -mb-4' />
            <div className='flex flex-col justify-start items-center gap-2 p-2 grow'>
                <div className='text-center'>
                    <p className='mb-2'>Oferta de Lanzamiento Limitada</p>
                    <p className='text-xl font-bold '>Ahorra hasta un 75%</p>
                </div>
                <div className='text-sm text-muted-foreground'>
                    Plan disponible para{' '}
                    <span className='font-bold'>{seatsAvailable.seats}</span>{' '}
                    personas. Quedan{' '}
                    <span className='font-bold'>
                        {seatsAvailable.seats - seatsAvailable.taken}
                    </span>{' '}
                    plazas
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {appConfig.plans.map((plan, index) => (
                    <PriceCard
                        key={plan.stripePriceId}
                        name={plan.name}
                        compareAtPrice={plan.comparedAtPriceString}
                        price={plan.priceString}
                        comment={plan.comment}
                        isSelected={seletectedPlan === plan.stripePriceId}
                        frequency={plan.frequency}
                        credits={plan.credits}
                        handleClick={() => {
                            setSeletectedPlan(plan.stripePriceId);
                        }}
                    >
                        {plan.name === 'Anual' && (
                            <div
                                className={`flex gap-2 bg-gradient-to-tr from-fuchsia-500 to-indigo-600 rounded-full p-2 py-1  items-center justify-center absolute -top-2 right-0 ${
                                    seletectedPlan === plan.stripePriceId
                                        ? 'opacity-100'
                                        : 'opacity-50'
                                }`}
                            >
                                {' '}
                                <Star className='text-primary-foreground fill-current h-4 w-4' />{' '}
                                <p className='text-sm text-primary-foreground'>
                                    Ahorra 60%
                                </p>
                            </div>
                        )}
                    </PriceCard>
                ))}
            </div>
            <div className='flex flex-col items-center'>
                <p className='mb-4 text-sm'>Nos has visto en</p>
                <div className='flex justify-between w-full'>
                    <Sparkle className='h-8 w-8' />
                    <PersonStanding className='h-8 w-8' />
                    <Newspaper className='h-8 w-8' />
                    <Info className='h-8 w-8' />
                    <MoreHorizontal className='h-8 w-8' />
                </div>
            </div>
            <Separator className='-mt-4 -mb-4' />
            <div className='flex justify-center flex-col items-center gap-4 sticky bottom-0 bg-background '>
                <CheckoutButton
                    successUrl={successUrl}
                    priceId={seletectedPlan}
                    className='bg-gradient-to-tr from-fuchsia-500 to-indigo-600 w-full'
                >
                    {' '}
                    Consigue {appConfig.general.appName}
                    <span className='relative -top-1'>+</span>{' '}
                </CheckoutButton>
                <p className='flex gap-2 text-xs items-center text-muted-foreground'>
                    <Shield className='h-4 w-4' />
                    Cancela tu subscripción en cualquier momento
                </p>
            </div>
        </div>
    );
};

type PriceCardProps = {
    name: string;
    compareAtPrice: string;
    price: string;
    comment?: string;
    children?: React.ReactNode;
    handleClick: () => void;
    isSelected: boolean;
    frequency: string;
    credits: number;
};

export const PriceCard = ({
    name,
    compareAtPrice,
    price,
    comment,
    children,
    handleClick = () => {},
    isSelected = false,
    frequency,
    credits,
}: PriceCardProps) => {
    return (
        <div
            className={`
        border-4 rounded-lg flex gap-4 p-4 items-center relative transision-all duration-300
        ${isSelected ? 'border-indigo-600' : ''}
        `}
            onClick={handleClick}
        >
            <div
                className={`
            rounded-full h-4 w-4 bg-muted  transision-all
            ${isSelected ? 'bg-gradient-to-tr from-fuchsia-500 to-indigo-600' : ''}
            
            `}
            />
            <div>
                <h3 className='text-xl'>
                    <span className='line-through text-primary/30'>
                        {compareAtPrice}
                    </span>{' '}
                    <span className='font-bold'>
                        {price}/{frequency}
                    </span>
                </h3>
                {credits && (
                    <p className='text-sm text-muted-foreground'>
                        {credits} créditos
                    </p>
                )}
                {comment && (
                    <p className='text-sm text-muted-foreground'>{comment}</p>
                )}
            </div>
            {children}
        </div>
    );
};

const modalItems: ModalItemProps[] = [
    {
        icon: UserSquare,
        title: 'Personaliza tus publicaciones',
        description: 'Usa tu foto, tus colores, tu letra, tu tono de voz...',
    },
    {
        icon: CalendarPlus,
        title: 'Programa tus post y carrusels',
        description: `Deja tu semana o mes organizado sin salir de ${appConfig.general.appName}`,
    },
    {
        icon: LayoutDashboard,
        title: 'Accede a más de 30 plantillas',
        description: 'Hemos recopilado más de 30 plantillas virales para ti',
    },
    {
        icon: GalleryHorizontal,
        title: '50 carrusels y posts al mes',
        description: 'Y si necesitas más, escríbenos y te lo ampliamos',
    },
    {
        icon: Palette,
        title: 'Guarda tus ajustes de marca',
        description: 'Crea distintas marcas y guarda su estilo, foto, etc',
    },
    {
        icon: Rocket,
        title: 'Más en camino!',
        description:
            'Funcionalidades nuevas cada semana basadas en tus sugerencias',
    },
];
