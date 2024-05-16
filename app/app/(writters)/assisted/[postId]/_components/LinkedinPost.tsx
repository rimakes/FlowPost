'use client';

import {
    Cross,
    Globe,
    Globe2,
    ImageIcon,
    LinkedinIcon,
    MessageSquareText,
    MoreHorizontal,
    Plus,
    Repeat2,
    Send,
    Smile,
    ThumbsUp,
    WholeWord,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { PostWritterContext } from '../../../from-scratch/_components/PostWritterProvider';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, fromPdfUrlToThumnailUrl } from '@/lib/utils';
import { TCarousel, TLinkedinPost } from '@/types/types';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import { appConfig } from '@/config/shipper.appconfig';

type LinkedinPostProps = { className?: string; carousel: TCarousel };

export function LinkedinPost({ className, carousel }: LinkedinPostProps) {
    const { post } = useContext(PostWritterContext);
    const thumbnailUrl = carousel.publicId
        ? fromPdfUrlToThumnailUrl(carousel.publicId!, 1)
        : undefined;

    return (
        <div
            className={cn(
                `flex max-w-[555px] flex-col gap-2 rounded-md border border-border p-2
                `,
                className
            )}
        >
            <EngagementBar />
            <Separator />
            <PostHeader post={post} />
            <PostContent post={post} />
            <PostImage imageUrl={thumbnailUrl!} carouselId={carousel.id} />
            <StatsBar />
            <Separator />
            <PostActionsBar />
            <AddCommentBar />
            <Comments />
        </div>
    );
}

const Comments = () => {
    return (
        <>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-1'>
                    <div className='relative h-10 w-10 rounded-full'>
                        <Image
                            src='/images/placeholders/user.png'
                            fill
                            alt='profile'
                            sizes='(max-width: 640px) 10vw, 100px'
                        />
                    </div>
                    <div className='flex grow flex-col rounded-md rounded-tl-none bg-primary/5 p-2'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <p className='font-semibold'>Ricardo Sala</p>
                                <p className='text-primary/50 '> · Following</p>
                            </div>
                            <div className='flex gap-1 text-sm text-primary/50'>
                                <p>7h</p>
                                <MoreHorizontal size={20} />
                            </div>
                        </div>
                        <p className='text-sm text-primary/50'>
                            {`Maker at ${appConfig.general.appName}`}
                        </p>
                        <p className='mt-2 text-sm'>Nice one Ricardo!</p>
                    </div>
                </div>
            </div>
            <p className='font-semibold text-primary/50'>Load more comments</p>
        </>
    );
};

const AddCommentBar = () => {
    return (
        <div className='flex items-center gap-2'>
            <div className='relative h-12 w-12 rounded-full bg-muted'>
                <Image
                    src='/images/placeholders/user.png'
                    fill
                    alt='profile'
                    sizes='(max-width: 640px) 10vw, 100px'
                    className='object-cover'
                />
            </div>
            <div className='flex w-full items-center justify-between gap-2 rounded-full border border-inherit p-3 text-sm text-primary/50'>
                <p>Add a comment...</p>
                <div className='flex gap-6'>
                    <Smile />
                    <ImageIcon />
                </div>
            </div>
        </div>
    );
};

const PostActionsBar = () => {
    return (
        <div className='flex items-center justify-between p-2'>
            <div className='h-10 w-10 rounded-full bg-muted' />
            <Button
                variant='ghost'
                className='flex gap-1 text-primary/60'
                size='sm'
            >
                <ThumbsUp size={20} />
                <p>Like</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1 text-primary/60'
                size='sm'
            >
                <MessageSquareText size={20} />
                <p>Comment</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1 text-primary/60'
                size='sm'
            >
                <Repeat2 size={20} />
                <p>Share</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1 text-primary/60'
                size='sm'
            >
                <Send size={20} />
                <p>Send</p>
            </Button>
        </div>
    );
};

const StatsBar = () => {
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-1'>
                <div
                    className={`flex [&_>_*]:border-8 [&_>_*]:border-transparent [&_>_*_+_*]:-ml-6`}
                >
                    <div className='relative h-10 w-10 border border-black'>
                        <Image
                            src={'/icons/1.svg'}
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='relative h-10 w-10 border border-black'>
                        <Image
                            src={'/icons/2.svg'}
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='relative h-10 w-10 border border-black'>
                        <Image
                            src={'/icons/3.svg'}
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <p className='text-xs text-primary/50'>357</p>
            </div>
            <div className='flex items-center gap-2 text-xs text-primary/50'>
                <p>209 comments · 23 reposts</p>
            </div>
        </div>
    );
};

const PostImage = ({
    imageUrl,
    carouselId,
}: {
    imageUrl: string;
    carouselId: string;
}) => {
    const { post } = useContext(PostWritterContext);

    const isCarouselCreated = !!carouselId;
    const isCarouselProcessed = isCarouselCreated && imageUrl;

    console.log({ isCarouselCreated, isCarouselProcessed });

    return (
        <div
            className={`relative  -ml-2 !aspect-[1080/1350] w-[calc(100%+1rem)] shrink-0 bg-muted`}
        >
            {isCarouselProcessed && (
                <Image
                    src={imageUrl}
                    fill
                    alt='post image'
                    className='object-fill'
                />
            )}

            {!isCarouselCreated && (
                <div className='flex h-full flex-col items-center justify-center'>
                    <p>Crea un carrusel</p>
                    <p>👇</p>
                    <CreateCarouselButton post={post} className='flex-none' />
                </div>
            )}

            {isCarouselCreated && !isCarouselProcessed && (
                <div className='flex h-full flex-col items-center justify-center'>
                    <p>Procesa el carrusel para poder publicarlo</p>
                    <p>👇</p>
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href={`/app/carrousel/${carouselId}`}
                    >
                        Ir al carrusel
                    </Link>
                </div>
            )}
        </div>
    );
};

const PostContent = ({ post }: { post: TLinkedinPost }) => {
    const [open, setOpen] = useState(false);
    const contentOpen = (
        <>
            <p className='whitespace-pre-wrap text-primary'>{post.content}</p>
            <span
                className='absolute bottom-0 right-0 cursor-pointer text-primary/50'
                onClick={() => {
                    setOpen(!open);
                }}
            >
                ...see less
            </span>
        </>
    );
    const ContentClosed = (
        <>
            <p className='mb-6 line-clamp-3 whitespace-pre-wrap text-primary'>
                {post.content}
            </p>
            <span
                className='absolute bottom-0 right-0 cursor-pointer text-primary/50'
                onClick={() => {
                    setOpen(!open);
                }}
            >
                ...see more
            </span>
        </>
    );
    return (
        <div className='flex flex-col gap-2'>
            <div className='relative'>{open ? contentOpen : ContentClosed}</div>
            <div className='flex gap-2'>
                <div className='flex items-center gap-1'>
                    <WholeWord size={20} />
                    <p className='text-primary/50'>Write a comment...</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Globe size={20} />
                    <p className='text-primary/50'>Anyone</p>
                    <Cross size={20} />
                </div>
            </div>
        </div>
    );
};

const PostHeader = ({ post }: { post: TLinkedinPost }) => {
    return (
        <div className='flex items-center justify-between gap-2'>
            <div className='flex gap-2'>
                <div className=' relative h-20 w-20 overflow-hidden rounded-full bg-muted'>
                    <Image src={post.author.pictureUrl} fill alt='profile' />
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-1'>
                        <p>{post.author.name}</p>
                        <LinkedinIcon size={15} />
                        <span className='text-primary/50'>· 2nd</span>
                    </div>
                    <p className='text-sm text-primary/50'>
                        Vendiendo un producto que...
                    </p>
                    <p className='text-xs text-primary/50'>
                        13h · <Globe2 className='inline' size={13} />
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-1 font-semibold text-blue-600'>
                <Plus size={20} />
                <p>Follow</p>
            </div>
        </div>
    );
};

const EngagementBar = () => {
    return (
        <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
                <div className='relative h-7 w-7 rounded-full bg-muted'>
                    <Image
                        src='/images/placeholders/user.png'
                        fill
                        alt='profile'
                        sizes='(max-width: 640px) 10vw, 100px'
                    />
                </div>
                <div className='flex items-baseline gap-2'>
                    <div className='text font-semibold'>Ricardo Sala</div>
                    <div className='text-xs text-primary/50'>
                        commented on this
                    </div>
                </div>
            </div>
            <div className='flex gap-2 text-primary/50'>
                <MoreHorizontal />
                <X />
            </div>
        </div>
    );
};
