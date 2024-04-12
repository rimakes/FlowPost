import { cn } from '@/lib/utils';
import { appConfig } from '@/config/shipper.appconfig';
// import Highlight from '../utils/highlight';
import { getStripeInstance } from '@/lib/stripe';
import FeaturedLogo from '../icons/featured-logo';
import { CheckoutButton } from './CheckoutButton';
import Stripe from 'stripe';
import { secondaryFont } from '@/config/fonts';
import Highlight from '../utils/Hightlight';
import { GetAccessButton } from './GetAccessButton';
import { Check, GiftIcon, Shield, ShieldCheck } from 'lucide-react';
import CtaWithSocial from './cta-with-social';

export const Pricing2 = async () => {
    const stripe = await getStripeInstance();
    const productList = await stripe.products.list({
        expand: ['data.default_price'],
    });

    const plans = productList.data.filter((product) =>
        appConfig.productIds.includes(product.id)
    );

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
                        Crea carrusels y post de Linkedin{' '}
                        <Highlight>en segundos</Highlight>
                    </p>
                </div>{' '}
            </div>
            {/*TODO: With grid -> <div className="mx-auto grid max-w-sm grid-cols-[repeat(auto-fit,_minmax(min(250px,_100%),_1fr))] justify-center gap-5 sm:max-w-none"> */}

            <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
                <div className='flex flex-col items-center gap-12 p-8 shadow-[0_3px_8px_rgba(0,0,0,.24)] bg-background rounded-lg'>
                    <div className='flex flex-col gap-4 items-center'>
                        <p className='text-6xl font-bold'>
                            87€{' '}
                            <span className='text-2xl text-primary/50 font-semibold line-through relative -top-8'>
                                348€
                            </span>
                        </p>
                        <p>Acceso durante un año</p>
                        <div>
                            <GetAccessButton className='w-[300px] mb-1 mx-auto' />
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
                                <Check size={20} />s asdfasdfa asdf asdf else
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} /> Something else
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} /> asdf Something else
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} /> asdfasdfa asdf asdf else
                            </li>
                            <li className='flex items-center gap-1'>
                                <Check size={20} /> asdfasdfa asdf asdf else
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
