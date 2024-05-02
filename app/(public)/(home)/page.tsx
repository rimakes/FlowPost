import Image from 'next/image';
import { Faq } from '@/components/marketing/faq';
import CtaWithSocial from '@/components/marketing/cta-with-social';
import Hero from '@/components/marketing/hero';
import { CTABanner } from '@/components/marketing/CTABanner';
import { Testimonials } from '@/components/marketing/Testimonials';
import { Pricing2 } from '@/components/marketing/Pricing2';
import { VideoSteps } from '@/components/marketing/VideoSteps';

// TODO: This should be rendered statically, but then I cannot use the session provider in the layout...?

export default async function Home() {
    // const session = await auth();

    return (
        <div className={`gap flex flex-col items-center justify-between`}>
            <Hero />
            <VideoSteps />
            <Pricing2 />
            {/* <DemoVideo
                title={
                    <h2
                        className={`${secondaryFont.className} text-center text-6xl font-semibold`}
                    >
                        Vídeo Demo
                    </h2>
                }
                subtitle={
                    <div className='flex flex-col items-center'>
                        <p>{`¿Necesitas ver ${appConfig.general.appName} en acción?`}</p>
                        <p>
                            ¡No hay problema! Aquí te dejo un vídeo enseñando
                            cómo crear tu primer post y carrusel para Linkedin
                            😊
                        </p>
                    </div>
                }
                cta={
                    <CtaWithSocial
                        accentText={'60% de descuento'}
                        buttonLabel={'Comprar'}
                        primaryText={'a las primeras 20 compras'}
                    />
                }
                videoPosterUrl='asdf'
                videoUrl='https://www.youtube.com/watch?v=MGjCIQh5Pkw&ab_channel=Joshtriedcoding'
            /> */}
            <Testimonials />
            <Faq />
            <CTABanner
                title='Crea carrusels y post de Linkedin en segundos'
                description={
                    <>
                        <p className='mb-8 opacity-50'>
                            Escribe y graba tu idea, elige un formato y tono y
                            crea un carrusel en{' '}
                            <span className='line-through'> minutos</span>{' '}
                            segundos. <br />
                            Carruseles y post únicos, adaptados a tu estilo y
                            marca
                        </p>
                        <CtaWithSocial
                            accentText={'60% de descuento'}
                            buttonLabel={'Comprar'}
                            primaryText={'a las primeras 20 compras'}
                            buttonProps={{
                                variant: 'secondary',
                            }}
                            spanClasses='text-primary-foreground'
                        />
                    </>
                }
                media={
                    <div className='relative h-full w-80'>
                        <Image
                            fill
                            alt='banner image'
                            src={'/images/banner-image.png'}
                            className='object-contain'
                        />
                    </div>
                }
            />
        </div>
    );
}
