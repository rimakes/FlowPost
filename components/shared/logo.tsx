import { appConfig } from '@/config/shipper.appconfig';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ linkUrl = '/' }) {
    return (
        <Link
            className='relative h-8 w-40 shrink-0 inline-block'
            href={linkUrl}
        >
            <Image
                alt={`${appConfig.general.appName}`}
                src={'/images/logo.png'}
                className='object-contain'
                fill
                sizes='(max-width: 640px) 50vw, 640px'
            />
        </Link>
    );
}
