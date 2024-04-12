'use client';

import { cn } from '@/lib/utils';
import { appConfig } from '@/config/shipper.appconfig';
// import Highlight from '../utils/highlight';
import { getStripeInstance } from '@/lib/stripe';
import { secondaryFont } from '@/config/fonts';
import Highlight from '../utils/Hightlight';
import { GetAccessButton } from './GetAccessButton';
import { Check, GiftIcon, ShieldCheck } from 'lucide-react';

export const Pricing2 = async () => {
    return (
        <section className='flex max-w-7xl flex-col gap-20 relative'>
            <div className='anchor -top-32 absolute' id='pricing' />
            <div className='gap2 flex flex-col text-center'>
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

            <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                <div className='flex flex-col items-center gap-12 p-8 shadow-[0_3px_8px_rgba(0,0,0,.24)] bg-white rounded-lg'>
                    <div className='flex flex-col gap-4 items-center'>
                        <p className='text-6xl font-bold'>
                            87€{' '}
                            <span className='text-2xl text-primary/50 font-semibold line-through relative -top-8'>
                                348€
                            </span>
                        </p>
                        <p>
                            Acceso durante un año{' '}
                            <span className='text-muted-foreground text-sm'>
                                (=7,25€/mes)
                            </span>{' '}
                        </p>
                        <div>
                            <GetAccessButton
                                className='mb-1 mx-auto shadow-none text-primary
                            bg-gradient-to-tr  from-pink-400 to-indigo-400 text-pink-50 text-lg w-full
                            
                            '
                            />
                            <p className='flex gap-2 text-xs items-center w-full justify-center text-primary/50'>
                                <ShieldCheck className='h-4 w-4' />
                                Pago seguro con Stripe
                            </p>
                            <p className='flex items-center justify-center gap-2 text-sm'>
                                <GiftIcon className='animate-bounce text-teal-500' />
                                <span className='text-teal-500'>
                                    75% de descuento &nbsp;
                                    <span className={cn(`text-primary`)}>
                                        a las primeras 200 compras
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className='mb-2 font-semibold text-center'>
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
                                Crea hasta 50 post y carrusels por mes
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
