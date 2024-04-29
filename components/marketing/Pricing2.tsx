'use client';

import { Check, GiftIcon, ShieldCheck } from 'lucide-react';
import { GetAccessButton } from './GetAccessButton';
import { cn } from '@/lib/utils';
import { appConfig } from '@/config/shipper.appconfig';
// import Highlight from '../utils/highlight';
import { secondaryFont } from '@/config/fonts';

export const Pricing2 = () => {
    return (
        <section className='relative flex max-w-7xl flex-col gap-6'>
            <div className='anchor absolute -top-32' id='pricing' />
            <div className='flex flex-col gap-2 text-center'>
                <h2
                    className={`${secondaryFont.className} border-b-0 text-6xl font-extrabold`}
                >
                    Precio
                </h2>
                <div className='text-primary'>
                    <p className='text-2xl'>
                        Crea carrusels y post de Linkedin en segundos
                    </p>
                </div>{' '}
            </div>
            {/*TODO: With grid -> <div className="mx-auto grid max-w-sm grid-cols-[repeat(auto-fit,_minmax(min(250px,_100%),_1fr))] justify-center gap-5 sm:max-w-none"> */}

            <div className='flex flex-col items-center justify-center gap-5'>
                <p className='flex items-center justify-center gap-2 text-sm'>
                    <GiftIcon className='animate-bounce text-teal-500' />
                    <span className='text-teal-500'>
                        60% de descuento &nbsp;
                        <span className={cn(`text-primary`)}>
                            a las primeras 20 compras
                        </span>
                    </span>
                </p>
                <div className='flex flex-col items-center gap-12 rounded-lg bg-white p-8 shadow-[0_3px_8px_rgba(0,0,0,.24)]'>
                    <div className='flex flex-col items-center gap-4'>
                        <p className='relative text-6xl font-bold'>
                            {appConfig.plans[0].priceString}
                            {/* <span className='text-2xl text-muted-foreground font-semibold line-through absolute -top-2'>
                                {appConfig.plans[0].comparedAtPriceString}
                            </span> */}
                            <span className='absolute bottom-0 text-base font-semibold text-muted-foreground'>
                                6,7€/mes
                            </span>
                        </p>
                        <div className='flex flex-col items-center'>
                            <p className='text-muted-foreground'>
                                Un año de acceso a {appConfig.general.appName}
                            </p>
                        </div>
                        <div>
                            <GetAccessButton
                                className='mx-auto mb-1 w-full bg-gradient-to-tr
                            from-pink-400  to-indigo-400 text-lg text-pink-50 shadow-none
                            
                            '
                            />
                            <p className='mb-2 flex w-full items-center justify-center gap-2 text-xs text-muted-foreground'>
                                <ShieldCheck className='h-4 w-4' />
                                Pago seguro con Stripe
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className='mb-2 text-center font-semibold'>
                            {appConfig.general.appName}
                            <span className='relative -top-1'>+</span> incluye:
                        </p>
                        <ul className='flex flex-col gap-1'>
                            <li className='flex items-center gap-1'>
                                <Check size={20} className='text-indigo-400' />
                                Personaliza tus publicaciones (textos, fotos,
                                etc...)
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} className='text-indigo-400' />
                                Accede a más de 30 plantillas de post
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} className='text-indigo-400' />
                                Crea hasta 600 post y carrusels
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} className='text-indigo-400' />
                                Guarda tus ajustes de marca
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} className='text-indigo-400' />
                                Nuevas funcionalidades cada mes
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
