import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Route } from 'next';
import { buttonVariants } from '@ui/button';
import NotFoundImage from '@/public/images/decoration/404/404-illustration.svg';
import NotFoundImageDark from '@/public/images/decoration/404/404-illustration-dark.svg';

type NotFoundProps = {
    url: string;
    label: string;
    children?: ReactNode;
};
export function NotFoundComp({ url, label, children }: NotFoundProps) {
    return (
        <div className='flex flex-col items-center overflow-hidden'>
            <div className='mb-8 inline-flex'>
                <Image
                    className='dark:hidden'
                    src={NotFoundImage}
                    width={176}
                    height={176}
                    alt='404 illustration'
                />
                <Image
                    className='hidden dark:block'
                    src={NotFoundImageDark}
                    width={176}
                    height={176}
                    alt='404 illustration dark'
                />
            </div>
            <div className='mb-6'>{children}</div>
            <Link href={url as Route} className={buttonVariants()}>
                {label}
            </Link>
        </div>
    );
}
