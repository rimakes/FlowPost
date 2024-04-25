'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';
import { Button } from '../ui/button';

type DemoVideoProps = {
    videoUrl: string;
    title: ReactNode;
    subtitle: ReactNode;
    cta: ReactNode;
    videoPosterUrl: string;
};
export function DemoVideo({
    videoUrl,
    title,
    subtitle,
    cta,
    videoPosterUrl,
}: DemoVideoProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <section
            id='video'
            className='relative m-auto flex w-[960px] max-w-full flex-col gap-4'
        >
            <div className='anchor absolute -top-32' id='demo' />

            {title}
            {subtitle}
            <div className='aspect-[1280/720] cursor-pointer overflow-auto rounded-lg'>
                {!hasMounted ? null : (
                    <ReactPlayer
                        url={videoUrl}
                        width={'100%'}
                        height={'100%'}
                    />
                )}
            </div>
            {cta}
        </section>
    );
}
