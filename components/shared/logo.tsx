import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { appConfig } from '@/config/shipper.appconfig';
import { Badge } from '@ui/badge';

export default function Logo<T extends string>({
    linkUrl = '/',
}: {
    linkUrl?: Route<T>;
}) {
    return (
        <Link
            className='relative mr-16 inline-block h-8 w-40 shrink-0 '
            href={linkUrl}
        >
            <Image
                alt={`${appConfig.general.appName}`}
                src={'/images/logo.png'}
                className='object-contain'
                fill
                sizes='(max-width: 640px) 50vw, 640px'
                quality={100}
            />
            <Badge className='absolute -right-[35%] -top-2 border-success bg-success-background text-xs text-success-foreground'>
                Beta
            </Badge>
        </Link>
    );
}
