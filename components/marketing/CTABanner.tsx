import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

type CTABannerProps = {
    title: ReactNode;
    description: ReactNode;
    media: ReactNode;
};
export function CTABanner({ title, description, media }: CTABannerProps) {
    return (
        <div className='m-auto flex w-full max-w-[900px] overflow-hidden rounded-md bg-primary text-primary-foreground mt-10'>
            <div className='flex flex-1 flex-col justify-start gap-3 p-6'>
                <div className='text-xl font-semibold text-primary-foreground'>
                    {title}
                </div>
                <div className=''>{description}</div>
            </div>
            <div className='hidden flex-1 items-center md:flex relative'>
                {media}
            </div>
        </div>
    );
}
