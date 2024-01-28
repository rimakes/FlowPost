'use client';

// import Sidebar from '@/components/ui/sidebar';
// import Header from '@/components/ui/header';

import Container from '@/components/shared/container';
import Header from '@/components/shared/header/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
    BrainCog,
    CalendarCheck,
    Clock,
    Feather,
    GalleryHorizontal,
    GitPullRequest,
    HandIcon,
    Lightbulb,
    LucideIcon,
    PanelTopCloseIcon,
    Paperclip,
    Settings,
    Sparkles,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-[100dvh] overflow-hidden border-0 border-green-500'>
            {/* Sidebar */}
            {/* <Sidebar /> */}

            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-x-hidden border-0 border-blue-500'>
                {/*  Site header */}
                <Header />
                <div
                    className='flex flex-col-reverse lg:flex-row border-0 border-dotted border-red-500 min-h-[calc(100%-6rem)] h-full
                '
                >
                    <div
                        className='sidebar border border-border
                        lg:border-t-0
                           flex gap-2 lg:flex-col lg:p-2 lg:w-[256px]
                    sticky bottom-0 lg:z-2 isolate bg-background border-r border-r-muted
                    border-t
                    '
                    >
                        <Button className='rounded-full gap-2 hidden lg:flex'>
                            <Feather />
                            Escribe tu post
                        </Button>
                        <div
                            className='mb-auto flex lg:block border-0 border-pink-600
                        lg:ml-0 lg:mr-0
                        overflow-x-auto
                        lg:overflow-x-hidden
                        w-full
                        relative
                        -right-2
                        '
                        >
                            {MAIN_MENU_ITEMS.map((item) => (
                                <MenuItem key={item.href} {...item} />
                            ))}
                        </div>
                        <div className='hidden lg:block'>
                            {SECONDAARY_MENU_ITEMS.map((item) => (
                                <MenuItem key={item.href} {...item} />
                            ))}
                            <WordsUsedWidget />
                        </div>
                        {/* REVIEW: How to "stack to the right" in flex container*/}
                        {/* LEARNING: Apparently, negative margins can only pull elements when that element is "anchored" from that side. AKA: in order to pull the element to the border of the parent, we need to do justify end (so it's anchored to the end) and THEN use a negative margin */}
                        {/* <div className='border border-border p-2 flex justify-end'>
                            <div className='h-20 border border-border border-r-8 w-full -mr-2'></div>
                        </div> */}
                    </div>
                    {/* <main className='gap flex flex-1 flex-col py-12 [&>*:first-child]:scroll-mt-16'> */}
                    <main className='border-0 border-indigo-600 flex-1 overflow-auto flex flex-col'>
                        <div className='gap-2 bg-muted p-2 flex justify-center items-center text-sm'>
                            <Clock className='w-5 h-5 mr-2' />
                            Estás en un Free trial
                            <Button
                                variant={'default'}
                                size={'sm'}
                                className='rounded-full
                                text-xs
                                '
                            >
                                <Zap className='w-4 h-4 mr-2 fill-primary-foreground' />
                                Elige plan
                            </Button>
                        </div>
                        <Container
                            className={
                                'flex flex-col border-0 border-red-400 border-dashed grow'
                            }
                        >
                            {children}
                        </Container>
                    </main>
                </div>
            </div>
        </div>
    );
}

type MenuItem = {
    icon: LucideIcon;
    label: string;
    shortLabel?: string;
    href: string;
    className?: string;
};

export const MenuItem = ({
    href,
    icon: Icon,
    label,
    shortLabel,
    className,
}: MenuItem) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
                `flex flex-1 p-3  flex-col  lg:flex-row gap-2 items-center h-fit
            rounded-none
            lg:w-full
            transition-all
            min-w-[6rem]
            lg:border-r-4
            border-t-4
            border-transparent
            lg:hover:bg-muted
            `,
                className,
                pathname === href
                    ? 'lg:border-r-4 lg:border-t-0  border-primary bg-primary/5'
                    : ''
            )}
        >
            <Icon className='w-5 h-5' />
            <span className='hidden lg:inline'>{label}</span>
            <span className='lg:hidden'>{shortLabel ? shortLabel : label}</span>
        </Link>
    );
};

export const WordsUsedWidget = () => {
    return (
        <div className='bg-primary/5 text-xs p-2 rounded-md space-y-2 border border-primary/10'>
            <div className='flex justify-between font-semibold'>
                <p>Palabras usadas</p>
                <p>0 / 1000</p>
            </div>
            <Progress
                value={50}
                max={100}
                className='h-2 border border-primary/10 rounded-full'
            />
            <p className='opacity-75'>Estas usando un free trial</p>
        </div>
    );
};

const MAIN_MENU_ITEMS: MenuItem[] = [
    {
        icon: Sparkles,
        label: 'Post Generator',
        href: '/app/post-writter',
        shortLabel: 'Posts',
    },
    {
        icon: Lightbulb,
        label: 'Ideas para post',
        href: '/app/ideas',
        shortLabel: 'Ideas',
    },
    {
        icon: GalleryHorizontal,
        label: 'Crea un carrusel',
        href: '/app/carrousel',
        shortLabel: 'Carrusel',
    },
    {
        icon: Paperclip,
        label: 'Posts guardados',
        href: '/app/saved',
        shortLabel: 'Guardados',
    },
    {
        icon: BrainCog,
        label: 'Inspiración',
        href: '/app/inspo',
        shortLabel: 'Inspo',
    },
    {
        icon: CalendarCheck,
        label: 'Programa tus posts',
        href: '/app/schedule',
        shortLabel: 'Posts',
    },
];

const SECONDAARY_MENU_ITEMS: MenuItem[] = [
    {
        icon: Settings,
        label: 'Ajustes',
        href: '/app/settings',
        shortLabel: 'Ajustes',
    },
    {
        icon: PanelTopCloseIcon,
        label: 'Pide herramientas',
        href: '/app/feature-request',
        shortLabel: 'Peticiones',
    },
];
// BOILER: Para roadmap, usar canny.io
