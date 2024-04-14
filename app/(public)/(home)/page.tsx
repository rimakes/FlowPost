import { Faq } from '@/components/marketing/faq';
import CtaWithSocial from '@/components/marketing/cta-with-social';
import { secondaryFont } from '@/config/fonts';
import Hero from '@/components/marketing/hero';
import { TextWithMedia } from '@/components/marketing/TextWithMedia';
import { CTABanner } from '@/components/marketing/CTABanner';
import { Testimonials } from '@/components/marketing/Testimonials';
import { DemoVideo } from '@/components/marketing/DemoVideo';
import { VideoClient } from '@/components/marketing/VideoClient';
import { Pricing2 } from '@/components/marketing/Pricing2';
import Image from 'next/image';
import { Message } from '@/components/auth/message';
import { appConfig } from '@/config/shipper.appconfig';

export default async function Home() {
    // const session = await auth();

    return (
        <div className={`gap flex flex-col items-center justify-between`}>
            {/* TODO:
            NextAuth is adding the callback to the url instead of redirecting to the callbackUrl on signup
            Not ideal, but for now, we are using this to redirect to the callbackUrl manually
            */}
            {/* <RedirectTweak /> */}
            <Hero />

            <section className='flex flex-col gap-8 relative'>
                <div className='anchor -top-32 absolute' id='how-it-works' />

                <h2
                    className={`text-6xl font-extrabold font-grotesqu relative ${secondaryFont.className} text-center`}
                >
                    ¿Cómo funciona?
                </h2>
                <div className='flex flex-col gap-12'>
                    <TextWithMedia
                        title={'1. Cuéntale qué estás pensando'}
                        description={
                            <>
                                Elige la forma que más cómoda te resulte:{' '}
                                escríbelo o cuéntalo hablado tal cuál te salga,
                                la IA se encarga de darle forma 👌
                            </>
                        }
                        side='left'
                        className=''
                    >
                        <VideoClient
                            videoUrl='https://www.youtube.com/watch?v=MGjCIQh5Pkw&ab_channel=Joshtriedcoding'
                            className='h-52'
                        />
                    </TextWithMedia>
                    <TextWithMedia
                        title={'2. Selecciona tono y formato'}
                        description={
                            <>
                                Elige entre las decenas de formatos probados que
                                la IA personalizará para ti y un tono que se
                                adapte a tu estilo 🪡
                            </>
                        }
                        side='left'
                        className=''
                    >
                        <VideoClient
                            videoUrl='https://www.youtube.com/watch?v=MGjCIQh5Pkw&ab_channel=Joshtriedcoding'
                            className='h-52'
                        />
                    </TextWithMedia>
                    <TextWithMedia
                        title={'3. Genera tu Post Optimizado'}
                        description={
                            <>
                                En segundos, un post de Linkedin estructurado
                                aplicando las mejores técnicas de copywriting.{' '}
                                <br />
                                <br />
                                ¡EMPIEZA A RECIBIR INTERACCIONES! .
                            </>
                        }
                        side='left'
                        className=''
                    >
                        <VideoClient
                            videoUrl='https://www.youtube.com/watch?v=MGjCIQh5Pkw&ab_channel=Joshtriedcoding'
                            className='h-52'
                        />
                    </TextWithMedia>
                </div>
            </section>

            <Pricing2 />
            <DemoVideo
                title={
                    <h2
                        className={`${secondaryFont.className} text-6xl font-semibold text-center`}
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
                        accentText={'30% de descuento'}
                        buttonLabel={'Comprar'}
                        primaryText={'a las primeras 200 compras'}
                    />
                }
                videoPosterUrl='asdf'
                videoUrl='https://www.youtube.com/watch?v=MGjCIQh5Pkw&ab_channel=Joshtriedcoding'
            />
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
                            accentText={'30% de descuento'}
                            buttonLabel={'Comprar'}
                            primaryText={'a las primeras 200 compras'}
                            buttonProps={{
                                variant: 'secondary',
                            }}
                            spanClasses='text-primary-foreground'
                        />
                    </>
                }
                media={
                    <div className='h-full w-80 relative'>
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
