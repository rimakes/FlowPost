'use client';

import { secondaryFont } from '@/config/fonts';
import { Calendar, Languages, Rocket, Sparkles } from 'lucide-react';
import { GetAccessButton, ModalItem } from './GetAccessButton';
import { TextWithMedia } from './TextWithMedia';
import { VideoClient } from './VideoClient';
import { useContext } from 'react';
import { AppContext } from '@/providers/AppProvider';
import { Button } from '../ui/button';

type VideoStepsProps = {};
export function VideoSteps({}: VideoStepsProps) {
    return (
        <section className='flex flex-col gap-8 relative max-w-full '>
            <div className='anchor -top-32 absolute' id='how-it-works' />
            <h2
                className={`text-6xl font-extrabold  relative ${secondaryFont.className} text-center`}
            >
                ¿Cómo funciona?
            </h2>
            <div className='flex flex-col gap-12'>
                <TextWithMedia
                    title={'1. Elige el tema, tono y formato'}
                    description={
                        <>
                            Dile a nuestra IA sobre qué quieres hablar, en que
                            tono y elige uno de los formatos virales que hemos
                            recopilado para ti 🚀
                        </>
                    }
                    side='left'
                    className=''
                >
                    <VideoClient
                        videoUrl='/videos/viral-templates.mp4'
                        className='max-h-64'
                    />
                </TextWithMedia>
                <TextWithMedia
                    title={'2. Crea tu post personalizado'}
                    description={
                        <>
                            Deja que hagamos el trabajo pesado, y edítalo
                            después como tú quieras (o no, si te gusta tal cual
                            😊)
                        </>
                    }
                    side='left'
                    className=''
                >
                    <VideoClient
                        videoUrl='/videos/create-viral.mp4'
                        className='max-h-64'
                    />
                </TextWithMedia>
                <TextWithMedia
                    title={'3. Conviértelo en un carrusel'}
                    description={
                        <>
                            Crea un carrusel con tu post en segundos y aplica
                            los ajustes de tu marca
                            <br />
                            <br />
                            ¡EMPIEZA A RECIBIR INTERACCIONES! .
                        </>
                    }
                    side='left'
                    className=''
                >
                    <VideoClient
                        videoUrl='/videos/create-carousel.mp4'
                        className='max-h-64'
                    />
                </TextWithMedia>
            </div>
            <h3
                className={`text-3xl font-semibold  ${secondaryFont.className} text-center`}
            >
                Y además...
            </h3>
            <div className='flex flex-col gap-4 mx-auto'>
                <ModalItem
                    icon={Languages}
                    title='Traduce tu contenido'
                    description='con tan solo un click, multiplica tu audiencia'
                />
                <ModalItem
                    icon={Sparkles}
                    title='Crea resúmenes de tus posts'
                    description='para esos seguidores que prefieren el contenido corto'
                />
                <ModalItem
                    icon={Calendar}
                    title='Programa tus publicaciones'
                    description='y olvídate de estar pendiente de publicar cada día'
                />
                <ModalItem
                    icon={Rocket}
                    title='Nuevas funcionalidades cada semana'
                    description='basadas en tus necesidades y feedback'
                />
            </div>
            <GetAccessButton
                className='mb-1 mx-auto shadow-none text-primary
                            bg-gradient-to-tr  from-pink-400 to-indigo-500 text-pink-50 text-lg 
                            w-full
                            '
            />
        </section>
    );
}
