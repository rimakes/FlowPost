'use client';

import { useRef, useEffect } from 'react';

//

type VideoClientProps = {
    videoUrl: string;
    className?: string;
};

export const VideoClient = (props: VideoClientProps) => {
    const videoRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        if (videoRef.current) videoRef.current.defaultMuted = true;
    });

    return (
        <video
            className={props.className}
            // @ts-ignore
            ref={videoRef}
            loop
            autoPlay
            muted
            playsInline
        >
            <source src={props.videoUrl} type='video/mp4' />
        </video>
    );
};
