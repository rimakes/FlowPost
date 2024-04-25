import { ReactNode } from 'react';

type SlideBannerProps = {
    content: ReactNode;
};
export function SlideBanner({ content }: SlideBannerProps) {
    return (
        <div
            className='
                        absolute left-0
                        top-0
                        w-full
                        bg-primary
                        text-center
                        text-primary-foreground
    '
        >
            {content}
        </div>
    );
}
