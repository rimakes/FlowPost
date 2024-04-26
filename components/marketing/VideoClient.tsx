'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { cn } from '@/lib/utils';

type VideoClientProps = {
    videoUrl: string;
    playing?: boolean;
    className?: string;
};
export function VideoClient({
    videoUrl,
    playing = true,
    className,
}: VideoClientProps) {
    const [hasMouted, setHasMouted] = useState(false);
    useEffect(() => {
        setHasMouted(true);
    }, []);

    if (!hasMouted) return null;

    return (
        <div className={cn(`aspect-[1158/720]`, className)}>
            <ReactPlayer
                url={videoUrl}
                width={'100%'}
                height={'100%'}
                playing
                loop
                muted
            />
        </div>
    );
}
