'use client';
import { Separator } from '@/components/ui/separator';
import { handwritten, secondaryFont } from '@/config/fonts';
import { cn, range } from '@/lib/utils';
import { ArrowDown, ArrowUp, Asterisk, Smile } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Grid } from './grid';
import {
    InfiniteCarrousel2,
    Item,
} from './_infinite-carousel/InfiniteCarrousel';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Placeholder = ({
    children,
    className,
}: {
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`border border-border rounded-md p-2`, className)}>
            Placeholder
            {children}
        </div>
    );
};

export default function IdeasPage() {
    const [rotate, setRotate] = useState<number>(1);
    const [speed, setSpeed] = useState<number>(10);
    return (
        <div className='grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 grid-cols-1 gap-16 p-8'>
            <PrimitiveLayout name='The Frame'>
                <div className='h-[300px]'></div>
            </PrimitiveLayout>
            <PrimitiveLayout name='The infinite carrousel relative'>
                <InfiniteCarrousel2
                    inset={2}
                    outset={3}
                    className='h-[40vh]'
                    rotate={rotate}
                    speed={speed}
                >
                    {range(0, 12).map((id) => (
                        <Item key={id} id={id} className='h-24'>
                            <div className='flex w-full items-center'>
                                <Smile size={32} className='text-indigo-400' />
                                <h2 className='grow text-center'>
                                    Something coll
                                </h2>
                            </div>
                        </Item>
                    ))}
                </InfiniteCarrousel2>
                <div className='absolute h-10 w-10 top-10 right-2'>
                    <Popover>
                        <PopoverTrigger>
                            <Asterisk className='h-full w-full text-indigo-600 z-10' />
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-col gap-4'>
                            <div className='flex gap-2'>
                                <Label>Rotate</Label>
                                <Slider
                                    min={0}
                                    max={9}
                                    value={[rotate]}
                                    onValueChange={(value) => {
                                        setRotate(value[0]);
                                    }}
                                />
                            </div>
                            <div className='flex gap-2'>
                                <Label>Speed</Label>
                                <Slider
                                    min={0}
                                    max={50}
                                    step={1}
                                    value={[speed]}
                                    onValueChange={(value) => {
                                        setSpeed(value[0]);
                                    }}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='Two Scrollables' className='h-[300px]'>
                <TwoScrollables />
            </PrimitiveLayout>
            <PrimitiveLayout name='The Cover'>
                <p></p>
                <div className='h-[400px] border-indigo-500 border overflow-y-auto'>
                    <Cover className='border' />
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Real Grid' className=''>
                <div className='relative'>
                    <Grid
                        gridClassName='grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]'
                        className='gap-2 [align-items:start] bg-muted '
                    >
                        <Placeholder className='border-indigo-600 border-dashed bg-background' />
                        <Placeholder className='bg-background'>
                            <p>Bigger one!</p>
                        </Placeholder>
                        <Placeholder className='bg-background h-full' />
                        <Placeholder className='bg-background' />
                    </Grid>
                    <Grid
                        gridClassName='grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]'
                        className='gap-2 bg-[rgba(0,0,0,0.05)] [background-opacity:40%] absolute z-10 w-full top-0'
                    >
                        <Placeholder className=' bg-[rgba(254,254,254,0.53)] rounded-none border-pink-600 border-dotted relative'>
                            <div
                                className={`absolute ${handwritten.className} text-indigo-600 text-sm -bottom-4 z-10`}
                            >
                                <p>
                                    <ArrowUp className='h-4 w-4 animate-bounce' />
                                    Smaller one!
                                </p>
                            </div>
                        </Placeholder>
                        <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted'>
                            <p>Bigger one!</p>
                        </Placeholder>
                        <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted' />
                        <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted' />
                    </Grid>
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Switcher' className=''>
                <div className='rounded-sm bg-yellow-600 bg-opacity-40 text-secondary absolute inset-0 m-auto z-30 w-fit h-fit text-1xl -rotate-12 p-2'>
                    <p>TO BE CONTINUED!</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='border-indigo-500 border border-dashed p-2 rounded-sm relative'>
                        <Switcher />
                        <div
                            className={`${handwritten.className} text-indigo-600 absolute -top-10 right-3 rotate-12`}
                        >
                            <p>We can go from this...</p>
                        </div>
                    </div>
                    <div className='max-w-md border-indigo-500 border border-dashed p-2 rounded-sm relative'>
                        <div
                            className={`${handwritten.className} text-indigo-600 absolute bottom-10 -left-32 -rotate-12 z-30`}
                        >
                            <p>...to this, without using meadia queries!</p>
                        </div>
                        <Switcher />
                    </div>
                </div>
            </PrimitiveLayout>

            <PrimitiveLayout name='The Box'>
                <Box className='border'>
                    <p>This is a box</p>
                    <p>and inside</p>
                    <p>there is something super cool</p>
                </Box>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Cluster'>
                <Stack gap={2}>
                    <p className='text-primary/70'>
                        No need to create a primitive for this...
                    </p>
                    <div className='flex flex-wrap gap-2 border border-dotted p-2 relative'>
                        <div className='absolute -top-8 -right-8 rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This is one cluster
                            </p>
                        </div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2 mb-auto'>
                            hello
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 border border-dotted p-2 relative w-1/2'>
                        <div className='absolute -top-8 -right-8 rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This one needed to wrap!
                            </p>
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2 mb-auto'>
                            hello world
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2 mb-auto'>
                            hello world
                        </div>
                    </div>
                    <div className='relative flex flex-col flex-wrap gap-2 border p-2 border-dotted'>
                        <div className='absolute -top-8 -left-8 -rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This is another cluster
                            </p>
                        </div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2 mb-auto'>
                            hello
                        </div>
                    </div>
                </Stack>
            </PrimitiveLayout>

            <PrimitiveLayout name='The Stack'>
                <Stack
                    gap={4}
                    //  REVIEW: This is how you can add border to the top of the elements in the stack
                    className='border border-border p-2 h-72 [&_>_*_+_*]:border-t'
                >
                    <div className='border border-black px-2'>Hello</div>
                    <div className='relative px-2'>
                        happy
                        <div className='absolute translate-y-0.5 left-0'>
                            <div className='text-xs flex items-center'>
                                <div>
                                    <ArrowUp />
                                    <ArrowDown />
                                </div>
                                <div>!mt-auto</div>
                            </div>
                        </div>
                    </div>
                    <div className='border border-black px-2 !mt-auto relative'>
                        <Stack gap={2} className='border border-indigo-600 p-2'>
                            <p>Split child</p>
                            <div className='border border-black  px-2'>
                                Hello
                            </div>
                            <div className='border border-black  px-2'>
                                happy
                            </div>
                        </Stack>
                    </div>
                    <div className='border border-black px-2'>World</div>
                </Stack>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Sidebar'>
                <WithSidebar className='h-72'>This is not used</WithSidebar>
            </PrimitiveLayout>
            {/* <PrimitiveLayout
                name='The "Framed" App'
                className='relative flex flex-col flex-1 overflow-x-hidden border-8 border-blue-500 p-0'
            >
                <p className={`${handwritten.className} text-indigo-600`}>
                    This is not exactly a primitive...
                </p>

                <div
                    className={cn(
                        `flex flex-col border border-red-400 justify-between`,
                        ''
                    )}
                >
                    <div className='bg-background z-10'>
                        The could be the header
                    </div>
                    <div className='border my-auto overflow-y-auto grow max-h-none'>
                        <p className={`${handwritten.className}`}>
                            This is the content to be centered
                        </p>
                        <h2 className='font-semibold'>Something cool</h2>
                        <p>That takes the main space of the screen</p>
                        <p>That takes the space of the screen</p>
                        <p>That takes the main space of screen</p>
                        <p>That takes the main space the screen</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                        <p>That takes the main space of the</p>
                    </div>
                    <div className='sticky bottom-0 bg-background z-10'>
                        This could be something in the footer
                    </div>
                </div>
            </PrimitiveLayout> */}
        </div>
    );
}

// Two scrollable areas, side by side, whose height is the same as the parent
export const TwoScrollables = () => {
    return (
        <div className='flex flex-col grow border-0 border-red-500 min-h-0'>
            <div className='border p-2'>header</div>
            <div className='flex w-full grow border h-[85%]'>
                <div className='border overflow-auto flex-1 flex flex-col gap-4'>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                </div>
                <div className='border overflow-auto flex-1 flex flex-col gap-4'>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                </div>
            </div>
        </div>
    );
};

type CoverProps = {
    className?: string;
};

const Cover = ({ className }: CoverProps) => {
    return (
        <div
            className={cn(
                `flex flex-col h-full border border-red-400`,
                className
            )}
        >
            <div className='border mb-2'>The could be the header</div>
            <div className='border my-auto'>
                <p className={`${handwritten.className}`}>
                    This is the content to be centered
                </p>
                <h2 className='font-semibold'>Something cool</h2>
                <p>That takes the main space of the screen</p>
                <p>That takes the space of the screen</p>
                <p>That takes the main space of screen</p>
                <p>That takes the main space the screen</p>
                <p>That takes the main space of the</p>
            </div>
            <div className='border mt-2'>
                This could be something in the footer
            </div>
        </div>
    );
};

type BoxProps = {
    children: React.ReactNode;
    className?: string;
};

const Box = ({ children, className }: BoxProps) => {
    const boxClasses = 'p-2 [&_*]:text-[inherit]';

    return <div className={cn(``, boxClasses, className)}>{children}</div>;
};

type SwitcherProps = {};

const Switcher = () => {
    const childClasses = 'basis-[calc((var(--threshold)-100%)*999)]';

    return (
        <div className='flex flex-wrap gap-1 [--threshold:600px] relative'>
            {/* flex -> all horizontal | wrap -> allow wrapping */}
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div
                className={cn(
                    `grow  border`,
                    childClasses,
                    'grow-[2] relative after:absolute after:-top-4 after:-right-2 after:rotate-12 after:text-sm after:text-indigo-600 after:content-["Its_bigger_!!"]'
                )}
            >
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
        </div>
    );
};

type PrimitiveLayoutProps = {
    name: string;
    children: React.ReactNode;
    className?: string;
};

export const PrimitiveLayout = ({
    name,
    children,
    className,
}: PrimitiveLayoutProps) => {
    return (
        <div
            className={cn(
                `border border-primary bg-background p-2 relative before:-z-10 before:absolute before:h-full before:w-full before:border-0 before:border-current flex flex-col`,
                className
            )}
        >
            <h2 className={`${secondaryFont.className} text-2xl font-bold`}>
                {name}
            </h2>
            <Separator className='mb-2' />
            {children}
        </div>
    );
};

type StackProps = {
    children: React.ReactNode;
    className?: string;
    gap?: number;
};

const Stack = ({ children, className, gap }: StackProps) => {
    const gapClass = `[&_>_*_+_*]:mt-${gap}`;

    return (
        <div className={cn(`flex flex-col ${gapClass}`, className)}>
            {children}
        </div>
    );
};

type WithSidebarProps = {
    children: React.ReactNode;
    className?: string;
};

const WithSidebar = ({ children, className }: WithSidebarProps) => {
    const sidebarClasses = 'basis-40 grow-[1]';
    const exampleClasses = 'border flex flex-col p-2';

    const noSidebarClasses = 'basis-0 grow-[999] border-2  min-w-[60%]';

    return (
        <div className={cn(`flex flex-wrap`, className)}>
            <div
                className={cn(
                    sidebarClasses,
                    exampleClasses,
                    'border-green-600 border-dotted'
                )}
            >
                Sidebar
            </div>
            <div
                className={cn(
                    noSidebarClasses,
                    exampleClasses,
                    'border-indigo-600'
                )}
            >
                Main Content
            </div>
        </div>
    );
};

// TODO: Learn to whitelist classes. Until then...
const whitelist = [
    '[&_>_*_+_*]:mt-1',
    '[&_>_*_+_*]:mt-2',
    '[&_>_*_+_*]:mt-3',
    '[&_>_*_+_*]:mt-4',
    '[&_>_*_+_*]:mt-5',
    '[&_>_*_+_*]:mt-6',
    '[&_>_*_+_*]:mt-7',
    '[&_>_*_+_*]:mt-8',
    '[&_>_*_+_*]:mt-9',
    '[&_>_*_+_*]:mt-10',
    '[&_>_*_+_*]:mt-12',
    '[&_>_*_+_*]:mt-13',
    '[&_>_*_+_*]:mt-14',
    '[&_>_*_+_*]:mt-16',
    '[&_>_*_+_*]:mt-20',
    '[&_>_*_+_*]:mt-24',
    '[&_>_*_+_*]:mt-28',
    '[&_>_*_+_*]:mt-32',
    '[&_>_*_+_*]:mt-36',
    '[&_>_*_+_*]:mt-40',
    '[&_>_*_+_*]:mt-44',
    '[&_>_*_+_*]:mt-48',
    '[&_>_*_+_*]:mt-52',
    '[&_>_*_+_*]:mt-56',
    '[&_>_*_+_*]:mt-60',
    '[&_>_*_+_*]:mt-64',
    '[&_>_*_+_*]:mt-72',
    '[&_>_*_+_*]:mt-80',
    '[&_>_*_+_*]:mt-96',
];
