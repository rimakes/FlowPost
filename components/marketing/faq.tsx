import Link from 'next/link';
import Container from '../shared/container';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { secondaryFont } from '@/config/fonts';
import { appConfig } from '@/config/shipper.appconfig';

export function Faq() {
    return (
        <section
            className='relative w-full
        '
        >
            <Container className='max-w-4xl'>
                <div className='anchor absolute -top-24 lg:-top-32' id='faq' />

                <div>
                    <h2
                        className={`${secondaryFont.className} mb-2 border-0 text-3xl`}
                    >
                        Preguntas frecuentes
                    </h2>
                    <p>¿Tienes una pregunta que no está respondida aquí?</p>
                    <p>
                        Escríbenos a{' '}
                        <Link
                            href={`mailto:hello@${appConfig.general.appDomain}`}
                        >
                            {`hello@${appConfig.general.appDomain}`}
                        </Link>
                    </p>
                </div>
                <div className='flex w-full flex-col items-baseline gap-5'>
                    <Accordion
                        type='single'
                        collapsible
                        className='w-full flex-1'
                    >
                        <AccordionItem value='item-1'>
                            <AccordionTrigger className='text-left'>
                                ¿Cuántos formatos de publicación tenéis?
                            </AccordionTrigger>
                            <AccordionContent>
                                Hemos recopilado más de 30 plantillas que han
                                probado ser virales para cada caso. <br />
                                <br />
                                También puedes optar por no utilizar plantillas
                                y pedirle a {appConfig.general.appName} que te
                                genere una publicación desde cero, aplicando las
                                mejores estrategias de copywriting.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-2'>
                            <AccordionTrigger className='text-left'>
                                ¿Necesito conexión a internet?
                            </AccordionTrigger>
                            <AccordionContent>
                                Sí! {appConfig.general.appName} es una
                                aplicación web, por lo que necesitas conexión a
                                internet para poder utilizarla. <br />
                                <br /> Además utilizamos las últimas apis de
                                inteligencia artificial de OpenAI, por lo que
                                necesitas una conexión estable para poder
                                utilizar la aplicación.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-3'>
                            <AccordionTrigger className='text-left'>
                                ¿Qué pasa con mis grabaciones?
                            </AccordionTrigger>
                            <AccordionContent>
                                Se borran en cuanto se han procesado.
                                <br />
                                <br />
                                No guardamos ningún tipo de grabación, solo se
                                usa para la generación de tu post e
                                inmediatamente se borra.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-4'>
                            <AccordionTrigger className='text-left'>
                                ¿Cómo puedo contactar a soporte?
                            </AccordionTrigger>
                            <AccordionContent>
                                Nos puedes escribir a nuestro correo de soporte:
                                hello@{appConfig.general.appDomain}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-5'>
                            <AccordionTrigger className='text-left'>
                                {`¿Por qué usar ${appConfig.general.appName} en lugar de ChatGPT?`}
                            </AccordionTrigger>
                            <AccordionContent>
                                ¡Buena pregunta! {appConfig.general.appName} es
                                una herramienta construido sobre la base de
                                ChatGPT, pero con funcionalidades adicionales
                                que no te ofrece chatGPT: generación de
                                carrusels en segundos, post optimizados para
                                linkedin, programación de tus publicaciones, y
                                mucho más.
                                <br />
                                <br />
                                Además, usamos las últimas versiones de las apis
                                de OpenAI, por lo que siempre tendrás la mejor
                                calidad en tus publicaciones (cosa que no ocurre
                                con ChatGPT - sin pago -, que usa el modelo más
                                barato!)
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='item-7'>
                            <AccordionTrigger className='text-left'>
                                No encuentro mi duda, ¿Cómo os contacto?
                            </AccordionTrigger>
                            <AccordionContent>
                                Nos puedes escribir a nuestro correo de soporte:
                                hello@{appConfig.general.appDomain}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Container>
        </section>
    );
}
