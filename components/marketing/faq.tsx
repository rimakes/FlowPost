import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { secondaryFont } from '@/config/fonts';
import Link from 'next/link';

export function Faq() {
    return (
        <section
            className='relative w-full
        '
        >
            <div className='anchor -top-32 absolute' id='faq' />

            <div>
                <h2 className={`${secondaryFont.className} border-0 text-3xl`}>
                    Preguntas frecuentes
                </h2>
                <p>¿Tienes una pregunta que no está respondida aquí?</p>
                <p>
                    Escríbenos a{' '}
                    <Link href='mailto:hello@perbrand.com'>
                        {' '}
                        hello@perbrand.com
                    </Link>
                </p>
            </div>
            <div className='flex flex-col items-baseline gap-5 w-full'>
                <Accordion type='single' collapsible className='w-full flex-1'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>
                            ¿Cuántos formatos de publicación tenéis?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>
                            ¿Necesito conexión a internet?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the
                            other components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                        <AccordionTrigger>
                            ¿Qué pasa con mis grabaciones?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                        <AccordionTrigger>
                            ¿Cómo puedo contactar a soporte?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-5'>
                        <AccordionTrigger>
                            ¿Por qué usar PerBrand en lugar de ChatGPT?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-6'>
                        <AccordionTrigger>
                            ¿Qué más funcionalidades tiene PerBrand?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-7'>
                        <AccordionTrigger>
                            No encuentro mi duda, ¿Cómo os contacto?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can
                            disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}
