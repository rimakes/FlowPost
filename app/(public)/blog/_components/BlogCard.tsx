import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';
import { AuthorCard } from '@/app/(public)/blog/_components/AuthorCard';

type BlogCardProps = {
    title: string;
    abstract: string;
    date: string;
    image: string;
    url: string;
    topic: string;
};
export function BlogCard({
    title,
    abstract,
    date,
    image,
    url,
    topic = '',
}: BlogCardProps) {
    return (
        <Link
            className='group space-y-6 transition-transform hover:-translate-y-1'
            href={url as Route}
        >
            <div className='space-y-6'>
                <div className='relative aspect-[384/240] overflow-clip rounded-3xl border'>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className='object-cover'
                    />
                </div>
                <div className='space-y-2'>
                    <p className='font-semibold text-indigo-500'>{topic}</p>
                    <h2 className='flex justify-between text-xl font-semibold'>
                        {title}
                        <ArrowRight className='inline-block h-6 w-6 -rotate-45 transition-transform group-hover:rotate-0' />
                    </h2>
                    <p className='line-clamp-2 text-primary/60'>{abstract}</p>
                </div>
            </div>
            <AuthorCard date={date} />
        </Link>
    );
}
