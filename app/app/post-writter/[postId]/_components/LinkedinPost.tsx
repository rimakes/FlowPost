'use client';

import { fakeSlides } from '@/app/app/carrousel/_components/const';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, fromPdfUrlToThumnailUrl } from '@/lib/utils';
import { TCarousel, TLinkedinPost } from '@/types/types';
import {
    Cross,
    GalleryHorizontal,
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
import { PostWritterContext } from '../../_components/PostWritterProvider';
import { CreateCarouselButton } from '@/components/shared/CreateCarouselButton';
import Link from 'next/link';
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
                `border border-border rounded-md p-2 flex flex-col gap-2 max-w-[555px]
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
                    <div className='relative rounded-full h-10 w-10'>
                        <Image
                            src='/images/placeholders/user.png'
                            fill
                            alt='profile'
                        />
                    </div>
                    <div className='grow flex flex-col bg-primary/5 p-2 rounded-md rounded-tl-none'>
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
                        <p className='text-sm mt-2'>Nice one Ricardo!</p>
                    </div>
                </div>
            </div>
            <p className='text-primary/50 font-semibold'>Load more comments</p>
        </>
    );
};

const AddCommentBar = () => {
    return (
        <div className='flex gap-2 items-center'>
            <div className='relative rounded-full h-12 w-12 bg-muted'>
                <Image src='/images/placeholders/user.png' fill alt='profile' />
            </div>
            <div className='flex gap-2 items-center justify-between w-full border border-inherit text-primary/50 text-sm rounded-full p-3'>
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
        <div className='flex justify-between items-center p-2'>
            <div className='h-10 w-10 bg-muted rounded-full' />
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
                    className={`flex [&_>_*_+_*]:-ml-6 [&_>_*]:border-transparent [&_>_*]:border-8`}
                >
                    <div className='relative border h-10 w-10 border-black'>
                        <Image
                            src={'/icons/1.svg'}
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='relative border h-10 w-10 border-black'>
                        <Image
                            src={'/icons/2.svg'}
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='relative border h-10 w-10 border-black'>
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
            <div className='flex gap-2 text-xs text-primary/50 items-center'>
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
            className={`!aspect-[1080/1350]  w-[calc(100%+1rem)] -ml-2 bg-muted relative shrink-0`}
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
                <div className='flex flex-col justify-center items-center h-full'>
                    <p>Crea un carrusel</p>
                    <p>👇</p>
                    <CreateCarouselButton post={post} className='flex-none' />
                </div>
            )}

            {isCarouselCreated && !isCarouselProcessed && (
                <div className='flex flex-col justify-center items-center h-full'>
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
            <p className='text-primary whitespace-pre-wrap'>{post.content}</p>
            <span
                className='text-primary/50 absolute bottom-0 right-0 cursor-pointer'
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
            <p className='text-primary line-clamp-3 whitespace-pre-wrap mb-6'>
                {post.content}
            </p>
            <span
                className='text-primary/50 absolute bottom-0 right-0 cursor-pointer'
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
                <div className='flex gap-1 items-center'>
                    <WholeWord size={20} />
                    <p className='text-primary/50'>Write a comment...</p>
                </div>
                <div className='flex gap-2 items-center'>
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
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2'>
                <div className=' relative h-20 w-20 bg-muted rounded-full overflow-hidden'>
                    <Image src={post.author.pictureUrl} fill alt='profile' />
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 items-center'>
                        <p>{post.author.name}</p>
                        <LinkedinIcon size={15} />
                        <span className='text-primary/50'>· 2nd</span>
                    </div>
                    <p className='text-primary/50 text-sm'>
                        Vendiendo un producto que...
                    </p>
                    <p className='text-primary/50 text-xs'>
                        13h · <Globe2 className='inline' size={13} />
                    </p>
                </div>
            </div>
            <div className='flex gap-1 text-blue-600 font-semibold items-center'>
                <Plus size={20} />
                <p>Follow</p>
            </div>
        </div>
    );
};

const EngagementBar = () => {
    return (
        <div className='flex gap-2 justify-between items-center'>
            <div className='flex items-center gap-2'>
                <div className='relative rounded-full h-7 w-7 bg-muted'>
                    <Image
                        src='/images/placeholders/user.png'
                        fill
                        alt='profile'
                    />
                </div>
                <div className='flex items-baseline gap-2'>
                    <div className='text font-semibold'>Ricardo Sala</div>
                    <div className='text-primary/50 text-xs'>
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
