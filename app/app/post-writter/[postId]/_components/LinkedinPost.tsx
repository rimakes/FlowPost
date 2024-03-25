'use client';

import { fakeSlides } from '@/app/app/carrousel/_components/const';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { TLinkedinPost } from '@/types/types';
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
import { PostWritterContext } from '../../_components/PostWritterProvider';

type LinkedinPostProps = { className?: string };
export function LinkedinPost({ className }: LinkedinPostProps) {
    const { post } = useContext(PostWritterContext);
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
            <PostImage post={post} />
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
                            layout='fill'
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
                            Founder & CEO at PerBrand
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
                <Image
                    src='/images/placeholders/user.png'
                    layout='fill'
                    alt='profile'
                />
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
        <div className='flex gap-2 justify-between items-center p-2'>
            <div className='h-10 w-10 bg-muted rounded-full' />
            <Button
                variant='ghost'
                className='flex gap-1.5 text-primary/60'
                size='sm'
            >
                <ThumbsUp size={20} />
                <p>Like</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1.5 text-primary/60'
                size='sm'
            >
                <MessageSquareText size={20} />
                <p>Comment</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1.5 text-primary/60'
                size='sm'
            >
                <Repeat2 size={20} />
                <p>Share</p>
            </Button>
            <Button
                variant='ghost'
                className='flex gap-1.5 text-primary/60'
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

const PostImage = ({ post }: { post: TLinkedinPost }) => {
    return (
        <div className='aspect-[1080/1350] w-[calc(100%+1rem)] -ml-2 bg-muted'></div>
    );
};

const PostContent = ({ post }: { post: TLinkedinPost }) => {
    const [open, setOpen] = useState(false);
    const contentOpen = (
        <>
            <p className='text-primary whitespace-pre-wrap'>{post.content}</p>
        </>
    );
    const ContentClosed = (
        <>
            <p className='text-primary line-clamp-3 whitespace-pre-wrap'>
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
                <div className=' relative h-20 w-20 bg-muted rounded-full'>
                    <Image
                        src={post.author.pictureUrl}
                        layout='fill'
                        alt='profile'
                    />
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
                        layout='fill'
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
