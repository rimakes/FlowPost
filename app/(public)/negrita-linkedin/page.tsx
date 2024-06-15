import Image from 'next/image';
import Link from 'next/link';
import { TextFormatter } from '@/app/(public)/negrita-linkedin/TextFormatter';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import Container from '@/components/shared/container';
import Feedback from '@/components/shared/feedback';
import { secondaryFont } from '@/config/fonts';
import { Separator } from '@ui/separator';

const breadcrumbs = [
    {
        path: '/',
        label: 'Inicio',
    },
    {
        path: '/negrita-linkedin',
        label: 'Negrita en LinkedIn',
    },
];

export default function Page({}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    return (
        <Container className='max-w-4xl'>
            <div className='space-y-12' id='top'>
                <div className='space-y-2'>
                    <p className='text-center text-sm font-semibold text-indigo-400'>
                        Formateador tu post de LinkedIn
                    </p>
                    <h1
                        className={`text-2xl font-bold ${secondaryFont.className} text-center`}
                    >
                        Negrita en LinkedIn
                    </h1>
                    <p className='text-center text-sm text-primary/60'>
                        Formatea tu post de LinkedIn y destaca tu contenido en
                        el feed!
                    </p>
                </div>
                <TextFormatter />
                <Breadcrumbs items={breadcrumbs} />
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>
                            ¿Cómo poner negrita en Linkedin?
                        </h2>
                        <p className='text-primary/70'>
                            Para poner <strong>negrita en LinkedIn</strong>,
                            simplemente copia y pega el texto que quieras
                            destacar en el recuadro de arriba y automáticamente
                            te devolveremos el texto con negritas.
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>
                            ¿Esta herramienta es gratis?
                        </h2>
                        <p className='text-primary/70'>
                            ¡Sí! <br />
                            La hemos creado para ti, para que puedas{' '}
                            <strong>destacar tu contenido en LinkedIn</strong>,
                            y si algún día quieres de verdad hacer crecer tu
                            LinkedIn, te acuerdes de FlowPost! 😊
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>
                            Pero...¿Por qué poner negrita en LinkedIn?
                        </h2>
                        <p className='text-primary/70'>
                            Poner negrita en LinkedIn es una forma de destacar
                            tu contenido frente a otros posts en el feed.
                            Linkedin es una red social profesional y{' '}
                            <strong>
                                la negrita es una forma de llamar la atención
                            </strong>{' '}
                            de tus contactos y de destacar partes de tu
                            contenido.
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>
                            ¿Es el texto en negrita en LinkedIn suficiente para
                            crear un contenido que destaque?
                        </h2>
                        <p className='text-primary/70'>
                            <strong>No</strong>, el texto en negrita es una
                            forma de destacar tu contenido, pero no es
                            suficiente para crear un contenido que destaque! Es
                            importante que el contenido en sí sea relevante y
                            aporte valor a tus contactos.
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-semibold'>
                            ¿No se puede hacer de forma nativa en LinkedIn?
                        </h2>
                        <p className='text-primary/70'>
                            <strong>No</strong>, en LinkedIn no se puede aún
                            poner negrita en los posts de forma nativa. Por eso
                            hemos creado esta herramienta para que puedas
                            destacar tu contenido!
                        </p>
                    </div>
                </div>
            </div>
            <Separator className='mb-6 mt-6' />
            <div className='-ml-[12rem] -mr-[12rem] flex w-[calc(100%+24rem)] flex-wrap justify-center'>
                <div className='flex-1'>
                    <h2>¿Necesitas algo más que negrita?</h2>
                </div>
                <Link href='#top'>
                    <Image
                        className='flex-1 cursor-pointer rounded-lg border-2 border-border p-2 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl'
                        src={'/images/negrita-linkedin.jpg'}
                        alt='negrita en linkedin'
                        width={600}
                        height={500}
                    />
                </Link>
            </div>
            <Feedback label='¿Sugerencias?' />
        </Container>
    );
}
